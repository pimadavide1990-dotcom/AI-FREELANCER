import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Briefcase, Users, ShieldCheck, ArrowRight, CheckCircle2, 
  User, Building2, PlusCircle, Search, Zap, DollarSign, Shield, 
  Lock, MessageSquare, LayoutDashboard, Star, ChevronRight, Upload,
  Palette, Code2, PenTool, Megaphone, Video, BriefcaseIcon, Layers
} from 'lucide-react';
import axios from 'axios';

import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import ChatPage from './ChatPage';
import DashboardPage from './DashboardPage';

// --- LISTA CATEGORIE GLOBALI ---
const CATEGORIES = [
  { id: 'all', label: 'Tutte le Categorie', icon: Layers },
  { id: 'design', label: 'Design & Creatività', icon: Palette },
  { id: 'dev', label: 'Sviluppo & IT', icon: Code2 },
  { id: 'writing', label: 'Scrittura & Traduzioni', icon: PenTool },
  { id: 'marketing', label: 'Marketing & Sales', icon: Megaphone },
  { id: 'media', label: 'Video, Audio & Musica', icon: Video },
  { id: 'consulting', label: 'Business & Consulenza', icon: BriefcaseIcon },
];

// --- NAVBAR GRANDE E BEN LEGGIBILE ---
function Navbar({ user, setUser }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
        {/* LOGO GRANDE */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 opacity-80 blur-md group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <Sparkles className="w-7 h-7 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white via-slate-100 to-blue-400 bg-clip-text text-transparent tracking-tight">
              SkillSync <span className="text-blue-500">AI</span>
            </h1>
            <span className="text-xs text-emerald-400 font-bold tracking-widest block -mt-0.5">GLOBAL FREELANCE MARKETPLACE</span>
          </div>
        </Link>

        {/* VOCI DI MENU */}
        <div className="hidden lg:flex items-center gap-8 text-base font-semibold text-slate-200">
          <Link to="/jobs" className="hover:text-blue-400 transition-colors py-2">Esplora Lavori</Link>
          <Link to="/freelancers" className="hover:text-blue-400 transition-colors flex items-center gap-2 py-2">
            <Sparkles className="w-5 h-5 text-blue-400" /> Cerca Freelancer
          </Link>
          <Link to="/post-job" className="hover:text-blue-400 transition-colors py-2">Pubblica Progetto</Link>
          <Link to="/chat" className="hover:text-blue-400 transition-colors flex items-center gap-2 py-2">
            <MessageSquare className="w-5 h-5 text-slate-400" /> Chat Direct
          </Link>
          <Link to="/dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-2 font-bold text-white bg-slate-900 border border-slate-700 px-5 py-2.5 rounded-2xl shadow-lg">
            <LayoutDashboard className="w-5 h-5 text-emerald-400" /> Dashboard
          </Link>
        </div>

        {/* ACCEDI / REGISTRATI */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-2xl">
              <span className="text-sm text-slate-300">Ciao, <strong className="text-white">{user.name}</strong></span>
              <button onClick={() => setUser(null)} className="text-sm text-red-400 hover:text-red-300 font-bold">Esci</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-200 hover:text-white px-4 py-2.5 transition-colors">Accedi</Link>
              <Link to="/register" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <span className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-6 py-3 rounded-2xl block shadow-xl">
                  Registrati Gratis
                </span>
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
    <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-xl py-12 mt-28">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>© 2026 SkillSync AI Inc. Piattaforma Globale di Intermediazione Tecnologica Autonoma.</span>
        </div>
        <div className="flex gap-8 font-medium">
          <Link to="/terms" className="hover:text-slate-300 transition-colors">Termini di Servizio</Link>
          <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy (GDPR)</Link>
        </div>
      </div>
    </footer>
  );
}

// --- HOMEPAGE UNIVERSELE ---
function HomePage() {
  return (
    <div className="space-y-24 py-12 relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-80 right-10 w-[400px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* HERO SECTION AGGIORNATA PER TUTTI I FREELANCER */}
      <section className="text-center max-w-4xl mx-auto space-y-8 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/5 backdrop-blur-md animate-pulse">
          <Sparkles className="w-4 h-4" /> 🌐 MARKETPLACE GLOBALE: Per ogni Talento e Azienda nel Mondo
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
          Il Marketplace Globale per ogni <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">Talento Freelance</span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
          Dal Design allo Sviluppo, dal Marketing alla Scrittura. Connetti la tua azienda ai migliori professionisti del pianeta in pochi secondi grazie al matching vettoriale IA e ai pagamenti protetti in Escrow.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link to="/register" className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <span className="relative bg-slate-950 text-white font-bold px-8 py-4 rounded-2xl block text-sm flex items-center justify-center gap-2 border border-slate-800">
              Inizia Gratis Ora <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link to="/jobs" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-200 font-bold px-8 py-4 rounded-2xl text-sm transition-all text-center backdrop-blur-xl">
            Esplora Bacheca Lavori
          </Link>
        </div>
      </section>

      {/* GRIGLIA MACRO-CATEGORIE VISIVE */}
      <section className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Esplora i Settori Professionali</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link 
                key={cat.id} 
                to="/jobs" 
                className="bg-slate-900/40 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/40 p-5 rounded-2xl flex flex-col items-center gap-3 text-center transition-all group backdrop-blur-xl"
              >
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl group-hover:border-blue-500/50 group-hover:scale-110 transition-all">
                  <IconComponent className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto bg-slate-900/40 border border-slate-800/80 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl relative">
        <div className="text-center space-y-1 border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0">
          <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">+5.000 Progetti</span>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Completati da creativi e sviluppatori</p>
        </div>

        <div className="text-center space-y-1 border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0">
          <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">100.000 €+</span>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">In compensi protetti in Escrow</p>
        </div>

        <div className="text-center space-y-1">
          <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">0% Commissioni</span>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Sulla registrazione e pubblicazione</p>
        </div>
      </section>
    </div>
  );
}

// --- BACHECA LAVORI CON FILTRI PER CATEGORIA VELOCI ---
function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => { if (res.data.success) setJobs(res.data.jobs); })
      .catch(err => console.error(err));
  }, []);

  // Filtra i lavori in base alla categoria selezionata
  const filteredJobs = selectedCategory === 'all' 
    ? jobs 
    : jobs.filter(j => j.category === selectedCategory);

  return (
    <div className="py-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Bacheca Lavori Globale</h2>
          <p className="text-xs text-slate-400 mt-1">Sfoglia i progetti attivi pubblicati dalle aziende di tutto il mondo</p>
        </div>
        <Link to="/post-job" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all">
          + Pubblica un Nuovo Lavoro
        </Link>
      </div>

      {/* BADGES FILTRI CATEGORIE VELOCI */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                isActive 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* GRIGLIA SCHEDE LAVORI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((j, idx) => (
            <div key={idx} className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 p-7 rounded-3xl flex flex-col justify-between space-y-6 backdrop-blur-xl transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={j.company_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"} 
                      alt="Referente" 
                      className="w-12 h-12 rounded-2xl border border-slate-700/80 object-cover shadow-md"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">
                        {j.poster_name || "Davide Pima"}
                      </h4>
                      <span className="text-[11px] text-blue-400 font-medium block">
                        {j.poster_title || "CTO"} @ <strong className="text-slate-200">{j.company_name}</strong>
                      </span>
                    </div>
                  </div>

                  {/* BADGE CATEGORIA SULLA SCHEDA */}
                  <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400">
                    {CATEGORIES.find(c => c.id === j.category)?.label || 'Generale'}
                  </span>
                </div>

                <div className="space-y-2 pt-1 border-t border-slate-800/60">
                  <h3 className="font-bold text-white text-xl pt-2">{j.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{j.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Budget Progetto</span>
                  <span className="text-emerald-400 font-black text-xl flex items-center gap-1">
                    {j.budget} €
                  </span>
                </div>
                <button onClick={() => alert('Candidatura inviata con successo!')} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                  Candidati Ora
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-500 space-y-2 bg-slate-900/30 rounded-3xl border border-slate-800/50">
            <Layers className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm font-semibold">Nessun progetto trovato per questa categoria.</p>
          </div>
        )}
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
          <Sparkles className="text-blue-400" /> Ricerca Intelligente Candidati
        </h2>
        <p className="text-xs text-slate-400">Descrivi le esigenze del tuo progetto in linguaggio naturale per calcolare la percentuale di affinità IA.</p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-7 rounded-3xl space-y-4 shadow-2xl backdrop-blur-xl">
        <textarea 
          rows="4" 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder="Es: Cerco un graphic designer esperto in brand identity o uno sviluppatore React e Python..." 
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" 
        />
        <button onClick={handleSearch} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/20 text-sm flex items-center justify-center gap-2 transition-all">
          <Zap className="w-4 h-4" /> {loading ? 'Calcolo vettoriale in corso...' : 'Calcola Match IA'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risultati Classificati dall'IA</h3>
          {results.map((f, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl flex justify-between items-center backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <img 
                  src={f.avatar || `https://i.pravatar.cc/100?img=${idx + 10}`} 
                  alt={f.name} 
                  className="w-12 h-12 rounded-2xl border border-slate-700 object-cover" 
                />
                <div>
                  <h4 className="font-bold text-white text-base">{f.name}</h4>
                  <p className="text-xs text-blue-400 font-medium">{f.title || "Freelancer Senior"}</p>
                </div>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black px-4 py-2 rounded-xl">
                {f.match_score}% Match
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- PUBBLICAZIONE LAVORO CON SELETTORE CATEGORIA ---
function PostJobPage() {
  const [job, setJob] = useState({ 
    company_name: '', 
    poster_name: '', 
    poster_title: '', 
    company_avatar: '',
    category: 'dev',
    title: '', 
    description: '', 
    budget: '' 
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setJob({ ...job, company_avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', job);
      alert('Offerta pubblicata con successo!');
      navigate('/jobs');
    } catch (e) {
      alert('Errore durante la pubblicazione del lavoro');
    }
  };

  return (
    <div className="py-12 max-w-lg mx-auto">
      <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl shadow-2xl backdrop-blur-2xl space-y-6">
        <h2 className="text-2xl font-black text-white">Pubblica una Nuova Offerta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">NOME REFERENTE</label>
              <input type="text" required value={job.poster_name} onChange={e => setJob({...job, poster_name: e.target.value})} placeholder="Davide Pima" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">RUOLO / TITOLO</label>
              <input type="text" required value={job.poster_title} onChange={e => setJob({...job, poster_title: e.target.value})} placeholder="CTO / Founder" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* SELETTORE CATEGORIA AGGIUNTO */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">CATEGORIA PROGETTO</label>
            <select 
              value={job.category} 
              onChange={e => setJob({...job, category: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* CARICAMENTO FILE IMMAGINE DAL PC */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">CARICA FOTO PROFILO / LOGO (DAL PC)</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-700 hover:border-blue-500 rounded-xl px-4 py-3 cursor-pointer transition-colors text-slate-300 text-xs font-semibold">
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Sfoglia e carica file...</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>

              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="Anteprima" 
                  className="w-12 h-12 rounded-2xl border border-blue-500 object-cover shadow-md" 
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">NOME AZIENDA</label>
            <input type="text" required value={job.company_name} onChange={e => setJob({...job, company_name: e.target.value})} placeholder="Tech Corp" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">TITOLO DEL LAVORO</label>
            <input type="text" required value={job.title} onChange={e => setJob({...job, title: e.target.value})} placeholder="Es: Video Editor per Canale YouTube" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">DESCRIZIONE</label>
            <textarea required rows="3" value={job.description} onChange={e => setJob({...job, description: e.target.value})} placeholder="Descrivi il lavoro in modo chiaro..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">BUDGET (€)</label>
            <input type="number" required value={job.budget} onChange={e => setJob({...job, budget: e.target.value})} placeholder="1500" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-all">
            Pubblica Ora Gratis
          </button>
        </form>
      </div>
    </div>
  );
}

// --- REGISTRAZIONE ---
function RegisterPage({ setUser }) {
  const [role, setRole] = useState('freelancer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Devi accettare i Termini di Servizio e la Privacy Policy.');
      return;
    }
    setUser({ ...formData, role });
    alert(`Account creato con successo! Benvenuto in SkillSync AI.`);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl shadow-2xl backdrop-blur-2xl space-y-6">
        <h2 className="text-2xl font-black text-white text-center">Crea il tuo Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">NOME COMPLETO</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">EMAIL</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">PASSWORD</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white" />
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input 
              type="checkbox" 
              required 
              checked={acceptedTerms} 
              onChange={e => setAcceptedTerms(e.target.checked)} 
              id="terms" 
              className="mt-1 w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500" 
            />
            <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
              Accetto i <Link to="/terms" target="_blank" className="text-blue-400 underline">Termini di Servizio</Link> e la <Link to="/privacy" target="_blank" className="text-blue-400 underline">Privacy Policy (GDPR)</Link>
            </label>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-blue-600/20 transition-all">
            Completa Registrazione
          </button>
        </form>
      </div>
    </div>
  );
}

// --- MAIN APP ROUTER ---
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-blue-500 selection:text-white">
        <div>
          <Navbar user={user} setUser={setUser} />
          <main className="max-w-7xl mx-auto px-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
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