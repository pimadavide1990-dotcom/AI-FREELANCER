// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);

// Configurazione Socket.io con CORS per il frontend React
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'chiave_segreta_super_sicura_skillsync';

// DATI IN MEMORIA
let usersDatabase = [];
let messagesDatabase = []; // Memoria messaggi chat

let jobsDatabase = [
  {
    id: "job_1",
    company_name: "TechStart Italia",
    title: "Sviluppatore React & Node.js",
    description: "Cerchiamo un freelancer per creare il frontend di una piattaforma SaaS.",
    budget: 1500,
    required_skills: ["React", "JavaScript", "Node.js"]
  }
];

let freelancersDatabase = [
  {
    id: "free_1",
    name: "Marco Rossi",
    title: "Senior Full Stack Developer",
    skills: ["React", "Node.js", "Python"],
    bio: "Esperto nello sviluppo di applicazioni web veloci e moderne."
  }
];

// --- LOGICA SOCKET.IO PER CHAT IN TEMPO REALE ---
io.on('connection', (socket) => {
  console.log(`⚡ Utente connesso alla Chat: ${socket.id}`);

  // Entra in una stanza di chat specifica per un progetto o trattativa
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    // Invia i messaggi precedenti della stanza
    const roomMessages = messagesDatabase.filter(m => m.roomId === roomId);
    socket.emit('load_messages', roomMessages);
  });

  // Ricezione e invio nuovo messaggio
  socket.on('send_message', (data) => {
    const { roomId, sender, text } = data;

    // MODERAZIONE AUTOMATICA: Filtra condivisione contatti esterni (Email, Telefono)
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

    // Invia il messaggio a tutti i partecipanti della stanza
    io.to(roomId).emit('receive_message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Utente disconnesso: ${socket.id}`);
  });
});

// --- API REGISTRAZIONE & LOGIN ---
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = usersDatabase.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ success: false, error: "Email già registrata." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { id: `user_${usersDatabase.length + 1}`, name, email, password: hashedPassword, role: role || 'freelancer' };
    usersDatabase.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Errore interno del server" });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = usersDatabase.find(u => u.email === email);
    if (!user) return res.status(400).json({ success: false, error: "Credenziali non valide." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: "Credenziali non valide." });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Errore interno del server" });
  }
});

// --- API LAVORI E MATCHING ---
app.get('/api/jobs', (req, res) => res.json({ success: true, jobs: jobsDatabase }));
app.post('/api/jobs', (req, res) => {
  const { company_name, title, description, budget } = req.body;
  const newJob = { id: `job_${jobsDatabase.length + 1}`, company_name, title, description, budget };
  jobsDatabase.push(newJob);
  res.json({ success: true, job: newJob });
});

app.get('/api/freelancers', (req, res) => res.json({ success: true, freelancers: freelancersDatabase }));
app.post('/api/match-job', async (req, res) => {
  try {
    const { job_description } = req.body;
    const response = await axios.post('http://127.0.0.1:5001/match', {
      job_description,
      freelancers: freelancersDatabase
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: "Servizio IA non raggiungibile" });
  }
});

// AVVIO SERVER CON HTTP + SOCKET.IO
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server Backend + Chat Socket.io attivo su http://localhost:${PORT}`);
});