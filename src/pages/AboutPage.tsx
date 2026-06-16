import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useContent } from '../cms/ContentContext';

export const AboutPage = () => {
  const { content } = useContent();
  const { about } = content;
  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '100px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>NOTRE HISTOIRE</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginTop: '8px' }}>{about.heroTitle}</h2>
        </div>
      </div>
      <div className="container" style={{ padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'center', marginBottom: '70px' }}>
          <div style={{ position: 'relative' }}>
            <img src={about.statsImage} alt="Zone Porte Nord" style={{ borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', width: '100%' }} />
            <div style={{ position: 'absolute', bottom: '-28px', right: '-24px', background: 'white', padding: '28px 32px', borderRadius: '18px', boxShadow: '0 15px 40px rgba(0,0,0,0.12)', border: '1px solid #f0f0f0' }}>
              <strong style={{ fontSize: '2.4rem', color: 'var(--atp-red)', display: 'block', lineHeight: 1 }}>{about.statNumber}</strong>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{about.statText}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.9rem', color: 'var(--atp-blue)', fontWeight: 800 }}>20 Ans d'Engagement Territorial</h3>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>{about.paragraph1}</p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>{about.paragraph2}</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
              <Link to="/president" className="btn btn-primary">Lire la vision du Président</Link>
              <Link to="/directory" className="btn btn-blue">Voir les adhérents</Link>
              <div style={{ marginTop: '0px' }}>
                <a href={about.pactePdf || '#'} target={about.pactePdf ? "_blank" : undefined} rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { if (!about.pactePdf) { e.preventDefault(); alert('Document en cours de préparation.'); } }}>
                  <FileText size={18} />
                  Télécharger le Pacte Métropolitain
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--light-gray)', borderRadius: '28px', padding: '60px 50px', marginBottom: '50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">NOTRE RAISON D'ÊTRE</span>
            <h2 style={{ marginTop: '8px' }}>Nos Valeurs Fondamentales</h2>
          </div>
          <p style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 40px', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>"{about.quote}"</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'left' }}>
            <div style={{ background: 'white', padding: '32px', borderRadius: '18px', borderLeft: '4px solid var(--atp-blue)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--atp-blue)' }}>Proximité</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Au plus près des réalités terrain de chaque entreprise</p>
            </div>
            <div style={{ background: 'white', padding: '32px', borderRadius: '18px', borderLeft: '4px solid var(--atp-red)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--atp-red)' }}>Synergie</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Les entreprises sont plus fortes quand elles agissent ensemble</p>
            </div>
            <div style={{ background: 'white', padding: '32px', borderRadius: '18px', borderLeft: '4px solid var(--atp-blue)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--atp-blue)' }}>Défense</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Porte-parole des entrepreneurs face aux décideurs publics</p>
            </div>
            <div style={{ background: 'white', padding: '32px', borderRadius: '18px', borderLeft: '4px solid var(--atp-red)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--atp-red)' }}>Solidarité</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Engagement social local et international au cœur de notre ADN</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', textAlign: 'center' }}>
          {[
            { label: '178 hectares', desc: 'de zones d\'activités', color: 'var(--atp-blue)' },
            { label: '1 300+', desc: 'emplois directs sur la zone', color: 'var(--atp-red)' },
            { label: '3 zones', desc: 'Lafayette, Prouvé & Fruchard', color: 'var(--atp-blue)' },
            { label: '2006', desc: 'Année de création de l\'ATP', color: 'var(--atp-red)' }
          ].map((stat, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', padding: '28px 20px', borderRadius: '16px' }}>
              <strong style={{ fontSize: '2rem', color: stat.color, display: 'block' }}>{stat.label}</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
