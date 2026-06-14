import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FileText, TrendingUp, Users, MousePointerClick, RefreshCw, BarChart3, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for analytics
const trafficData = [
  { name: 'Lun', visites: 400, unique: 240 },
  { name: 'Mar', visites: 300, unique: 139 },
  { name: 'Mer', visites: 550, unique: 380 },
  { name: 'Jeu', visites: 470, unique: 290 },
  { name: 'Ven', visites: 690, unique: 480 },
  { name: 'Sam', visites: 120, unique: 80 },
  { name: 'Dim', visites: 250, unique: 150 },
];

const pageData = [
  { name: 'Accueil', vues: 3500 },
  { name: 'Annuaire', vues: 2100 },
  { name: 'Emploi', vues: 1850 },
  { name: 'Adhésion', vues: 900 },
  { name: 'Actions', vues: 750 },
];

export const AdminAnalytics: React.FC = () => {
  const [generatingReport, setGeneratingReport] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    // Simulate AI generation time
    setTimeout(() => {
      setGeneratingReport(false);
      setReport(`Rapport Analytique Généré le ${new Date().toLocaleDateString('fr-FR')}

TENDANCE GLOBALE
Le trafic global du site est en hausse de +15% cette semaine. Les visiteurs s'intéressent particulièrement à la section "Emploi & Alternance", confirmant l'attrait de vos actions en faveur de l'insertion professionnelle.

SUGGESTIONS D'AMÉLIORATION
1. Annuaire : La page "Annuaire" génère 2100 vues. Envisagez de mettre en avant les offres "Premium" sur cette page.
2. Adhésion : Le taux de conversion actuel (visiteurs -> clics sur adhésion) est de 4.2%. Ajoutez des appels à l'action plus visibles dans vos "Vidéos Matinales".
3. Mobile : 68% de votre trafic provient de smartphones. L'ajout récent de l'application PWA va considérablement augmenter la fidélité de cette audience.

ACTION RECOMMANDÉE
Publiez une nouvelle bannière d'actualité pour annoncer le prochain Forum de l'Emploi, car c'est la thématique la plus recherchée actuellement.`);
    }, 2500);
  };

  return (
    <div className="admin-grid" style={{ gap: '2rem' }}>
      <div className="admin-field-group full">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="admin-tab-title" style={{ margin: 0 }}>
            <BarChart3 size={32} /> Statistiques & Rapports
          </h3>
          <button 
            onClick={handleGenerateReport} 
            className="admin-btn admin-btn-primary" 
            disabled={generatingReport}
            style={{ background: 'linear-gradient(135deg, #005578, #003a5c)' }}
          >
            {generatingReport ? (
              <><RefreshCw size={18} className="spin" /> Génération IA en cours...</>
            ) : (
              <><Sparkles size={18} /> Générer un rapport IA</>
            )}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="admin-field-group full" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1rem' }}>
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.2rem', border: '1px solid #e2e8f0', borderLeft: '4px solid var(--atp-blue)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', marginBottom: '10px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <Users size={16} /> Visiteurs Uniques
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>1,759</div>
          <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <TrendingUp size={14} /> +12.5% vs semaine dernière
          </div>
        </div>
        
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.2rem', border: '1px solid #e2e8f0', borderLeft: '4px solid var(--atp-red)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', marginBottom: '10px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <FileText size={16} /> Pages Vues
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>9,100</div>
          <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <TrendingUp size={14} /> +8.2% vs semaine dernière
          </div>
        </div>

        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.2rem', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', marginBottom: '10px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <MousePointerClick size={16} /> Taux de Clic (Adhésion)
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>4.2%</div>
          <div style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 700, marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} /> -1.1% vs semaine dernière
          </div>
        </div>
      </div>

      {/* Traffic Evolution Chart */}
      <div className="admin-field-group full" style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
        <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Évolution du Trafic (7 derniers jours)</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisites" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--atp-blue)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--atp-blue)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--atp-red)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--atp-red)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 700 }}
                itemStyle={{ fontWeight: 800 }}
              />
              <Area type="monotone" dataKey="visites" stroke="var(--atp-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorVisites)" name="Visites Totales" />
              <Area type="monotone" dataKey="unique" stroke="var(--atp-red)" strokeWidth={3} fillOpacity={1} fill="url(#colorUnique)" name="Visiteurs Uniques" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages Chart */}
      <div className="admin-field-group full" style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
        <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Pages les plus consultées</h4>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={pageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} layout="vertical">
              <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#1e293b" fontSize={13} fontWeight={700} tickLine={false} axisLine={false} width={100} />
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 700 }}
              />
              <Bar dataKey="vues" fill="var(--atp-blue)" radius={[0, 6, 6, 0]} barSize={24} name="Vues" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Report Section */}
      {report && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }} 
          className="admin-field-group full"
          style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #bbf7d0', marginTop: '1rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#166534', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={24} /> Rapport d'Intelligence Artificielle
            </h4>
            <button className="admin-btn" style={{ background: 'white', color: '#166534', fontWeight: 800 }}>
              <Download size={16} /> Exporter PDF
            </button>
          </div>
          <div style={{ whiteSpace: 'pre-wrap', color: '#15803d', fontSize: '1.05rem', lineHeight: '1.7', fontWeight: 500 }}>
            {report}
          </div>
        </motion.div>
      )}

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
