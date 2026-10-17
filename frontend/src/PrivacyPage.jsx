import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Torna alla Home
      </Link>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 text-slate-300">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Informativa sulla Privacy (Privacy Policy)</h1>
            <p className="text-xs text-slate-400">Conforme al Regolamento UE 2016/679 (GDPR)</p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <h3 className="text-white font-bold text-base">1. Titolare del Trattamento</h3>
          <p>Il titolare del trattamento dei dati è il gestore della piattaforma SkillSync AI.</p>

          <h3 className="text-white font-bold text-base">2. Quali Dati Raccogliamo</h3>
          <p>Raccogliamo i dati forniti volontariamente in fase di registrazione (Nome, Email, Password protetta tramite hashing sicuro con bcrypt) e i dati relativi ai progetti pubblicati o alle competenze professionali.</p>

          <h3 className="text-white font-bold text-base">3. Finalità del Trattamento</h3>
          <p>I dati personali sono trattati esclusivamente per il funzionamento della piattaforma, il matching intelligente tramite IA e la gestione sicura dei pagamenti tramite intermediari finanziari autorizzati.</p>

          <h3 className="text-white font-bold text-base">4. Sicurezza dei Dati</h3>
          <p>I dati finanziari e le carte di credito non vengono mai memorizzati sui nostri server, ma gestiti direttamente dai circuiti di pagamento certificati (es. Stripe).</p>
        </div>
      </div>
    </div>
  );
}