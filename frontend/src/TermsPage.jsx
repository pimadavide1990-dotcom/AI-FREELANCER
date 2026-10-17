import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Torna alla Home
      </Link>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 text-slate-300">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Termini e Condizioni d'Uso</h1>
            <p className="text-xs text-slate-400">Ultimo aggiornamento: Ottobre 2026</p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <h3 className="text-white font-bold text-base">1. Accettazione dei Termini</h3>
          <p>Registrandosi e utilizzando la piattaforma SkillSync AI, l'utente accetta integralmente i presenti Termini di Servizio. Se non si accettano tali termini, si prega di non utilizzare il servizio.</p>

          <h3 className="text-white font-bold text-base">2. Natura del Servizio (Intermediario Tecnologico)</h3>
          <p>SkillSync AI è una piattaforma tecnologica che facilita l'incontro tra Aziende (Clienti) e Professionisti (Freelancer).</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>SkillSync AI <strong>non è</strong> il datore di lavoro dei freelancer né la controparte dei contratti di servizio stipulati tra gli utenti.</li>
            <li>Ciascun contratto di lavoro o prestazione professionale si intende stipulato direttamente ed esclusivamente tra l'Azienda e il Freelancer.</li>
          </ul>

          <h3 className="text-white font-bold text-base">3. Esclusione di Responsabilità</h3>
          <p>SkillSync AI declina ogni responsabilità in merito a:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>La qualità, la precisione o la puntualità dei servizi erogati dai freelancer.</li>
            <li>Eventuali controversie o contenziosi legali insorti tra Aziende e Freelancer.</li>
          </ul>

          <h3 className="text-white font-bold text-base">4. Commissioni e Pagamenti</h3>
          <p>Le transazioni avvengono tramite sistemi di pagamento terzi protetti (es. Stripe). La piattaforma trattiene automaticamente la percentuale di commissione concordata sul totale della transazione a titolo di corrispettivo per i servizi tecnologici offerti.</p>
        </div>
      </div>
    </div>
  );
}