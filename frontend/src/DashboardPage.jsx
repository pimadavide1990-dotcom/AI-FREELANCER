import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, DollarSign, ShieldCheck, Clock, CheckCircle, ArrowUpRight, MessageSquare, PlusCircle } from 'lucide-react';

export default function DashboardPage({ user }) {
  // Se l'utente non è ancora loggato, mostriamo un mock di prova o il tipo di account scelto
  const currentUser = user || { name: "Mario Rossi", role: "company" };
  const isCompany = currentUser.role === "company";

  // DATI SIMULATI PER DATORI E FREELANCER (MOCK DATA)
  const [companyProjects] = useState([
    { id: "p1", title: "Redesign App Mobile E-Commerce", freelancer: "Elena Bianchi", budget: 2000, escrowStatus: "FUNDED", progress: 65 },
    { id: "p2", title: "Integrazione Modello NLP Python", freelancer: "Luca Verdi", budget: 3500, escrowStatus: "PENDING", progress: 10 }
  ]);

  const [freelanceProjects] = useState([
    { id: "fp1", title: "Sviluppo Frontend React", company: "TechStart Italia", payoutNet: 1380, deadline: "25 Ottobre 2026", status: "IN_PROGRESS" }
  ]);

  return (
    <div className="py-10 max-w-6xl mx-auto space-y-8">
      {/* HEADER BENVENUTO DASHBOARD */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-wider">
            {isCompany ? "Dashboard Azienda" : "Dashboard Freelancer"}
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Pannello di Controllo</h1>
          <p className="text-xs text-slate-400 mt-1">Gestisci i tuoi progetti attivi e controlli i pagamenti protetti in Escrow.</p>
        </div>

        {isCompany ? (
          <Link to="/post-job" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> Pubblica Nuovo Progetto
          </Link>
        ) : (
          <Link to="/jobs" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Cerca Nuovi Lavori
          </Link>
        )}
      </div>

      {/* STATISTICHE RAPIDE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>{isCompany ? "FONDI IN ESCROW" : "GUADAGNI MATURATI"}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {isCompany ? "5.500 €" : "1.380 €"}
          </div>
          <p className="text-[10px] text-emerald-400 font-medium">100% Garantiti e Bloccati tramite Stripe</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>PROGETTI ATTIVI</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {isCompany ? companyProjects.length : freelanceProjects.length}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">In corso di svolgimento</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>MESSAGGI NON LETTI</span>
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">2</div>
          <Link to="/chat" className="text-[10px] text-blue-400 hover:underline font-medium block">
            Apri Chat Direct →
          </Link>
        </div>
      </div>

      {/* SEZIONE TABELLA / LISTA PROGETTI */}
      <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-400" /> 
          {isCompany ? "Progetti Commissionati e Stato Escrow" : "I Miei Incarichi Attivi"}
        </h2>

        {isCompany ? (
          <div className="space-y-4">
            {companyProjects.map((p) => (
              <div key={p.id} className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">{p.title}</h3>
                  <p className="text-xs text-slate-400">Freelancer Incaricato: <strong className="text-slate-200">{p.freelancer}</strong></p>
                  <div className="w-48 bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400 block">{p.budget} €</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md inline-block">
                      {p.escrowStatus === "FUNDED" ? "Escrow Finanziato" : "In attesa"}
                    </span>
                  </div>
                  <button onClick={() => alert("Fondi rilasciati al freelancer con successo!")} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md">
                    Rilascia Pagamento
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {freelanceProjects.map((fp) => (
              <div key={fp.id} className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white text-sm">{fp.title}</h3>
                  <p className="text-xs text-slate-400">Cliente: <strong className="text-slate-200">{fp.company}</strong> • Scadenza: {fp.deadline}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-400 block">{fp.payoutNet} € (Netto)</span>
                  <button onClick={() => alert("Notifica di consegna inviata al cliente!")} className="mt-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">
                    Invia Consegna
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}