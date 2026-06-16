import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Lightbulb, Star } from 'lucide-react';
import { useContent } from '../cms/ContentContext';

export const AgendaPage = () => {
  const { content } = useContent();
  const events = content.agenda?.events || [];
  return (
    <div className="page-root">
      <div style={{ background: 'var(--light-gray)', padding: '120px 0 60px', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small">RENDEZ-VOUS STRATÉGIQUES 2026</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--atp-blue)', marginTop: '8px', marginBottom: '16px' }}>Agenda de l'ATP Porte Nord</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '44rem', lineHeight: 1.7 }}>Restez informé de tous nos événements, matinales, forums et rencontres. Une année 2026 sous le signe du jubilé et de l'excellence collective.</p>
        </div>
      </div>
      <div className="container" style={{ padding: '60px 40px' }}>
        {events.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px', margin: '0 auto' }}>
            {events.map((ev: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ background: ev.featured ? 'linear-gradient(135deg, var(--atp-blue) 0%, #1a5276 100%)' : 'white', borderRadius: '20px', boxShadow: ev.featured ? '0 8px 32px rgba(0,58,92,0.25)' : '0 2px 12px rgba(0,0,0,0.05)', border: ev.featured ? 'none' : '1px solid #e5e7eb', overflow: 'hidden', display: 'flex' }}>
                {ev.image && (
                  <div style={{ width: '160px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                    <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e: any) => { e.target.style.display = 'none'; }} />
                    {ev.featured && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,58,92,0.45)' }} />}
                  </div>
                )}
                <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '24px', flex: 1, flexWrap: 'wrap' }}>
                  <div style={{ background: ev.featured ? 'rgba(255,255,255,0.18)' : (i === 0 ? 'var(--atp-red)' : 'var(--atp-blue)'), color: 'white', padding: '14px 20px', borderRadius: '14px', textAlign: 'center', minWidth: '100px', flexShrink: 0 }}>
                    <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 900, lineHeight: 1.2 }}>{ev.date}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.12em', color: ev.featured ? 'rgba(255,255,255,0.7)' : 'var(--atp-blue)', background: ev.featured ? 'rgba(255,255,255,0.15)' : 'rgba(0,58,92,0.07)', padding: '4px 12px', borderRadius: '999px', display: 'inline-block', marginBottom: '8px' }}>{ev.type}</span>
                    <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: ev.featured ? 'white' : 'var(--charcoal-gray)', marginBottom: '6px' }}>{ev.title}</h3>
                    <p style={{ color: ev.featured ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{ev.description}</p>
                    {ev.featured && (
                      <a href="https://my.weezevent.com/les-20-ans-de-latp-nancy-porte-nord" target="_blank" rel="noopener noreferrer" className="btn" style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', color: 'var(--atp-blue)', fontWeight: 800, fontSize: '0.82rem', padding: '10px 20px' }}><Star size={14}/> S'inscrire en priorité</a>
                    )}
                  </div>
                  {!ev.featured && <ArrowRight style={{ color: 'var(--atp-red)', flexShrink: 0 }} size={20} />}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <Calendar size={48} style={{ margin: '0 auto 16px', color: 'var(--atp-red)', opacity: 0.4, display: 'block' }} />
            <h3 style={{ fontWeight: 800 }}>Aucun événement pour le moment</h3>
            <p style={{ marginTop: '8px' }}>Revenez bientôt pour découvrir notre programmation 2026.</p>
          </div>
        )}
        <div style={{ marginTop: '60px', background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', borderRadius: '24px', padding: '40px', textAlign: 'center', color: 'white' }}>
          <Lightbulb size={40} style={{ margin: '0 auto 12px' }} />
          <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '10px' }}>Vous avez une idée d'événement ?</h3>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>La Boîte à Idées ATP est réservée aux adhérents. Proposez vos événements, actions collectives et suggestions directement à l'équipe.</p>
          <Link to="/adherent/dashboard" className="btn" style={{ background: 'white', color: '#7c3aed', fontWeight: 800 }}>Accéder à la Boîte à Idées</Link>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
