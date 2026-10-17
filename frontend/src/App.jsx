import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Briefcase, Users, ShieldCheck, ArrowRight, CheckCircle2, 
  User, Building2, PlusCircle, Search, Zap, DollarSign, Shield, 
  Lock, MessageSquare, LayoutDashboard, Star, ChevronRight, CreditCard,
  Radar, ArrowDown
} from 'lucide-react';
import axios from 'axios';

import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import ChatPage from './ChatPage';
import DashboardPage from './DashboardPage';

// --- NAVBAR ---
function Navbar({ user, setUser, mode, setMode }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/30 border border-indigo-400/30">
            <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white tracking-tight">GhostMatch</h1>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">AI 2.0</span>
            </div>
            <span className="text-[10px] text-purple-400 font-bold tracking-wider block -mt-0.5">ISCRIZIONE & ANNUNCI 100% GRATIS</span>
          </div>
        </Link>

        {/* TOGGLE MODALITÀ FREELANCER / AZIENDA */}
        <div className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
          <button 
            onClick={() => setMode('freelancer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
              mode === 'freelancer' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Sono Freelancer <span className="text-[9px] opacity-75 bg-black/20 px-1.5 py-0.5 rounded">Cerco Clienti</span>
          </button>
          <button 
            onClick={() => setMode('company')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
              mode === 'company' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Sono un'Azienda <span className="text-[9px] opacity-75 bg-black/20 px-1.5 py-0.5 rounded">Cerco Talenti</span>
          </button>
        </div>

        {/* LINK NAVIGAZIONE */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <Link to="/jobs" className="hover:text-purple-400 transition-colors">Esplora Lavori</Link>
          <Link to="/freelancers" className="hover:text-purple-400 transition-colors">Cerca Freelancer</Link>
          <Link to="/post-job" className="hover:text-purple-400 transition-colors">Pubblica Progetto (€0)</Link>
          <Link to="/chat" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Chat
          </Link>
          <Link to="/dashboard" className="bg-slate-900 border border-slate-800 text-white px-3.5 py-2 rounded-xl hover:border-purple-500/50 transition-all flex items-center gap-1.5">
            <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" /> Dashboard
          </Link>
        </div>

        {/* UTENTE / REGISTRAZIONE */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs">
              <span className="text-slate-300">Ciao, <strong className="text-white">{user.name}</strong> ({user.role === 'company' ? 'Azienda' : 'Freelancer'})</span>
              <button onClick={() => setUser(null)} className="text-red-400 hover:text-red-300 font-bold">Esci</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2">Accedi</Link>
              <Link to="/register" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 hover:opacity-90 transition-all">
                Registrati Gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-28">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>© 2026 GhostMatch AI 2.0 Inc. Iscrizione e pubblicazione gratis. Commissione 20% trattenuta solo a consegna completata.</span>
        </div>
        <div className="flex gap-6 font-medium">
          <Link to="/terms" className="hover:text-slate-300 transition-colors">Termini di Servizio</Link>
          <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy (GDPR)</Link>
        </div>
      </div>
    </footer>
  );
}

// --- HOMEPAGE ---
function HomePage({ mode }) {
  return (
    <div className="py-12 space-y-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10"></div>

      {/* BADGE DI STATO */}
      <div className="flex flex-wrap justify-center gap-3">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Smart Escrow Liquidity: €2.48M
        </div>
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-4 py-1.5 rounded-full text-purple-300 text-xs font-bold shadow-lg shadow-purple-500/10 backdrop-blur-md">
          <Radar className="w-3.5 h-3.5 text-purple-400 animate-spin" />
          Radar Scanner Attivo
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="text-center max-w-5xl mx-auto space-y-6 pt-4">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
          {mode === 'freelancer' ? (
            <>
              Trova le migliori <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">Aziende con Budget Escrow</span> senza intermediari.
            </>
          ) : (
            <>
              Ingaggia i migliori <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">Talenti Top 1% Verificati dall'IA</span> senza rischi.
            </>
          )}
        </h1>

        <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          L'algoritmo di matching analizza DNA professionale, sovrapposizione fuso orario, compatibilità culturale e budget garantito. Zero perdite di tempo, 100% tutele[cite: 3].
        </p>

        {/* METRICHE CHIAVE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl text-center space-y-1 hover:border-purple-500/40 transition-all">
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">99.2%</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuratezza AI Match</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl text-center space-y-1 hover:border-purple-500/40 transition-all">
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">100%</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Budget Deposito Escrow</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl text-center space-y-1 hover:border-purple-500/40 transition-all">
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">0%</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ghosting Garantito</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl text-center space-y-1 hover:border-purple-500/40 transition-all">
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">&lt; 15 min</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tempo Medio Risposta</p>
          </div>
        </div>

        <div className="pt-8 flex justify-center">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 animate-bounce">
            <ArrowDown className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </section>

      {/* BOTTONI D'AZIONE */}
      <section className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto pt-2">
        <Link to="/register" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-4 rounded-2xl text-xs text-center shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all">
          Inizia Subito Gratis (€0)
        </Link>
        <Link to="/jobs" className="bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-200 font-bold px-8 py-4 rounded-2xl text-xs text-center transition-all">
          Esplora Progetti
        </Link>
      </section>
    </div>
  );
}

// --- BACHECA LAVORI ---
function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => { if (res.data.success) setJobs(res.data.jobs); })
      .catch(err => console.error(err));
  }, []);

  const handleApply = (job) => {
    const gross = parseFloat(job.budget) || 1000;
    const fee = gross * 0.20;
    const net = gross - fee;
    alert(`Candidatura inviata per "${job.title}"!\n\nImporto Progetto: €${gross}\nCommissione GhostMatch AI (20%): €${fee.toFixed(2)}\nIl tuo netto sarà: €${net.toFixed(2)}`);
  };

  return (
    <div className="py-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Bacheca Lavori</h2>
          <p className="text-xs text-slate-400 mt-1">Pubblicazione e candidature 100% gratuite. Trattenuta del 20% solo ad approvazione lavoro.</p>
        </div>
        <Link to="/post-job" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-purple-600/20 transition-all">
          + Pubblica Nuovo Lavoro (€0)
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((j, idx) => (
          <div key={idx} className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-purple-500/40 p-7 rounded-3xl flex flex-col justify-between space-y-6 backdrop-blur-xl transition-all duration-200">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-wider">
                {j.company_name}
              </span>
              <h3 className="font-bold text-white text-xl">{j.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{j.description}</p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
              <div>
                <span className="text-purple-400 font-black text-lg block">
                  {j.budget} €
                </span>
                <span className="text-[10px] text-slate-500">
                  (Netto Freelance: €{(j.budget * 0.8).toFixed(0)})
                </span>
              </div>
              <button onClick={() => handleApply(j)} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all">
                Candidati Gratis
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- RICERCA IA FREELANCER ---
function AIconsultanPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/match-job', { job_description: query });
      if (res.data.success) setResults(res.data.results);
    } catch (e) {
      alert('Errore di connessione al motore IA (verifica che Python sia attivo sulla porta 5001)');
    }
    setLoading(false);
  };

  return (
    <div className="py-12 max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-white flex items-center justify-center gap-2">
          <Sparkles className="text-purple-400" /> GhostMatch AI Radar
        </h2>
        <p className="text-xs text-slate-400">Descrivi il progetto per calcolare l'affinità vettoriale in tempo reale.</p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-7 rounded-3xl space-y-4 shadow-2xl backdrop-blur-xl">
        <textarea 
          rows="4" 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder="Es: Cerco uno sviluppatore esperto in React, Node e Python per un'app B2B..." 
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" 
        />
        <button onClick={handleSearch} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-600/20 text-sm flex items-center justify-center gap-2 transition-all">
          <Zap className="w-4 h-4" /> {loading ? 'Elaborazione DNA Vettoriale...' : 'Avvia AI Matchmaking'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidati Corrispondenti dall'IA</h3>
          {results.map((f, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl flex justify-between items-center backdrop-blur-xl">
              <div>
                <h4 className="font-bold text-white text-base">{f.name}</h4>
                <p className="text-xs text-slate-400">{f.title}</p>
              </div>
              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-black px-4 py-2 rounded-xl">
                {f.match_score}% Match Score
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- PUBBLICAZIONE LAVORO ---
function PostJobPage() {
  const [job, setJob] = useState({ company_name: '', title: '', description: '', budget: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', job);
      alert('Progetto pubblicato gratis con successo!');
      navigate('/jobs');
    } catch (e) {
      alert('Errore durante la pubblicazione del lavoro');
    }
  };

  return (
    <div className="py-12 max-w-lg mx-auto">
      <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl shadow-2xl backdrop-blur-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-white">Pubblica Progetto</h2>
          <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
            Gratis (€0)
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">NOME AZIENDA</label>
            <input type="text" required value={job.company_name} onChange={e => setJob({...job, company_name: e.target.value})} placeholder="Tech Corp" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">TITOLO DEL LAVORO</label>
            <input type="text" required value={job.title} onChange={e => setJob({...job, title: e.target.value})} placeholder="Frontend Developer" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">DESCRIZIONE</label>
            <textarea required rows="3" value={job.description} onChange={e => setJob({...job, description: e.target.value})} placeholder="Descrivi il lavoro..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 resize-none" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">BUDGET ESCROW (€)</label>
            <input type="number" required value={job.budget} onChange={e => setJob({...job, budget: e.target.value})} placeholder="1500" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-600/20 text-sm transition-all">
            Pubblica Ora Gratis (€0)
          </button>
        </form>
      </div>
    </div>
  );
}

// --- REGISTRAZIONE CON SELEZIONE RUOLO ---
function RegisterPage({ setUser }) {
  const [role, setRole] = useState('freelancer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', companyName: '', skills: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Devi accettare i Termini di Servizio e la Privacy Policy.');
      return;
    }
    setUser({ ...formData, role });
    alert(`Account ${role === 'freelancer' ? 'Freelancer' : 'Azienda'} creato con successo a costo zero!`);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl shadow-2xl backdrop-blur-2xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white">Crea Account Gratis</h2>
          <p className="text-xs text-purple-400 font-bold">Nessun costo iniziale o canone mensile (€0)</p>
        </div>

        {/* SELETTORE RUOLO */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setRole('freelancer')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              role === 'freelancer'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            Sono Freelancer
          </button>

          <button
            type="button"
            onClick={() => setRole('company')}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              role === 'company'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Sono un'Azienda
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">NOME E COGNOME</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Mario Rossi" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500" />
          </div>

          {role === 'company' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">NOME AZIENDA</label>
              <input type="text" required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="Tech Corp S.r.l." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500" />
            </div>
          )}

          {role === 'freelancer' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">COMPETENZE PRINCIPALI</label>
              <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="React, Python, Node.js" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500" />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">EMAIL</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="mario@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500" />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">PASSWORD</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500" />
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input 
              type="checkbox" 
              required 
              checked={acceptedTerms} 
              onChange={e => setAcceptedTerms(e.target.checked)} 
              id="terms" 
              className="mt-1 w-4 h-4 rounded border-slate-800 bg-slate-950 text-purple-600 focus:ring-purple-500" 
            />
            <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
              Accetto i <Link to="/terms" target="_blank" className="text-purple-400 underline">Termini di Servizio</Link> e la <Link to="/privacy" target="_blank" className="text-purple-400 underline">Privacy Policy (GDPR)</Link>
            </label>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-purple-600/20 transition-all">
            Registrati come {role === 'freelancer' ? 'Freelancer' : 'Azienda'} (€0)
          </button>
        </form>
      </div>
    </div>
  );
}

// --- MAIN APP ROUTER ---
export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('freelancer');

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-purple-500 selection:text-white">
        <div>
          <Navbar user={user} setUser={setUser} mode={mode} setMode={setMode} />
          <main className="max-w-7xl mx-auto px-6">
            <Routes>
              <Route path="/" element={<HomePage mode={mode} />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/freelancers" element={<AIconsultanPage />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/chat" element={<ChatPage user={user} />} />
              <Route path="/dashboard" element={<DashboardPage user={user} />} />
              <Route path="/register" element={<RegisterPage setUser={setUser} />} />
              <Route path="/login" element={<RegisterPage setUser={setUser} />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}