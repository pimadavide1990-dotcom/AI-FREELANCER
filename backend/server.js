// backend/server.js
require('dotenv').config(); // ✅ DEVE ESSERE LA PRIMA RIGA ASSOLUTA

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');

const app = express();
const server = http.createServer(app);

// --- MISURE DI SICUREZZA ---
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Troppe richieste effettuate da questo IP, riprova più tardi." }
});
app.use('/api/', limiter);

// ✅ Stripe inizializzato correttamente
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: CLIENT_URL }));

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_only_for_dev';

// --- CONNESSIONE A MONGODB ATLAS ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connesso con Successo!'))
  .catch(err => console.error('Errore di connessione a MongoDB:', err));

// --- MODELLI MONGOOSE ---
const jobSchema = new mongoose.Schema({
  company_name: String,
  poster_name: String,
  poster_title: String,
  company_avatar: String,
  category: { type: String, default: 'dev' },
  title: String,
  description: String,
  budget: Number,
  status: { type: String, default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['freelancer', 'company'], default: 'freelancer' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// --- MIDDLEWARE JWT ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ success: false, error: "Accesso negato. Token mancante." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, error: "Token non valido o scaduto." });
    req.user = user;
    next();
  });
};

// --- SCHEMI ZOD ---
const RegisterSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['freelancer', 'company']).optional()
});

const JobSchema = z.object({
  company_name: z.string().min(1),
  poster_name: z.string().min(1),
  poster_title: z.string().optional(),
  company_avatar: z.string().optional(),
  category: z.string().default('dev'),
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  budget: z.number().positive()
});

let messagesDatabase = [];

// --- LOGICA SOCKET.IO ---
io.on('connection', (socket) => {
  console.log(`⚡ Utente connesso alla Chat: ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    const roomMessages = messagesDatabase.filter(m => m.roomId === roomId);
    socket.emit('load_messages', roomMessages);
  });

  socket.on('send_message', (data) => {
    const { roomId, sender, text } = data;
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    let processedText = text;
    let warning = null;

    if (phoneRegex.test(text) || emailRegex.test(text)) {
      processedText = "[MESSAGGIO MODERATO DALL'IA: Non è consentito scambiare contatti esterni diretti per la sicurezza dei pagamenti]";
      warning = true;
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      roomId,
      sender,
      text: processedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      warning
    };

    messagesDatabase.push(newMessage);
    io.to(roomId).emit('receive_message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Utente disconnesso: ${socket.id}`);
  });
});

// --- API REGISTRAZIONE & LOGIN ---
app.post('/api/register', async (req, res) => {
  try {
    const validation = RegisterSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, error: "Dati non validi", details: validation.error.format() });
    }

    const { name, email, password, role } = validation.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, error: "Email già registrata." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, role: role || 'freelancer' });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Errore interno del server" });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: "Email e password richieste." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: "Credenziali non valide." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: "Credenziali non valide." });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Errore interno del server" });
  }
});

// --- API LAVORI ---
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, error: "Errore nel recupero dei lavori" });
  }
});

app.post('/api/jobs', authenticateToken, async (req, res) => {
  try {
    const validation = JobSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, error: "Dati lavoro non validi", details: validation.error.format() });
    }

    const newJob = new Job(validation.data);
    await newJob.save();
    res.json({ success: true, job: newJob });
  } catch (error) {
    res.status(500).json({ success: false, error: "Errore durante il salvataggio del lavoro" });
  }
});

// --- API PAGAMENTI STRIPE ESCROW ---
app.post('/api/create-checkout-session', authenticateToken, async (req, res) => {
  try {
    const { jobId } = req.body;
    
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, error: "Progetto non trovato." });

    const totalAmount = job.budget;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Escrow Progetto: ${job.title}`,
              description: `Fondi protetti in cassaforte digitale`,
            },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${CLIENT_URL}/dashboard?payment=success&jobId=${jobId}`,
      cancel_url: `${CLIENT_URL}/jobs`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Errore Stripe:', error);
    res.status(500).json({ success: false, error: "Errore durante la creazione della sessione di pagamento" });
  }
});

// --- API MATCHING IA ---
app.post('/api/match-job', authenticateToken, async (req, res) => {
  try {
    const { job_description } = req.body;
    const response = await axios.post('http://127.0.0.1:5001/match', {
      job_description,
      freelancers: []
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: "Servizio IA non raggiungibile" });
  }
});

// AVVIO SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server Backend blindato e attivo su http://localhost:${PORT}`);
});