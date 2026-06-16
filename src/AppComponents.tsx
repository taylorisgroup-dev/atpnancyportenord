"use client";
import React, { useState, useEffect } from 'react';
import {
  Building2, Users, Calendar, Mail, ArrowRight, CheckCircle2, Menu, X, Award,
  MapPin, ChevronDown, Shield, Search, Zap, Globe, ArrowUpRight, Play,
  Heart, TrendingUp, Handshake, Star, ChevronRight, FileText, Lightbulb,
  UserCheck, Briefcase, Clock, Quote, Target, AlertCircle, Lock, Phone,
  ExternalLink, Video, Sparkles, Filter, BookOpen, GraduationCap,
  Eye, Download, ChevronUp, LayoutGrid, List
} from 'lucide-react';
import { PWAPrompt } from './components/PWAPrompt';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContent } from './cms/ContentContext';
import { defaultContent } from './cms/defaultContent';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdherentLogin } from './views/AdherentLogin';
import { AdherentDashboard } from './views/AdherentDashboard';
import { Footer } from './components/layout/Footer';
import { NotFoundPage } from './views/NotFoundPage';
import { VideoFrame } from './components/ui/VideoFrame';
import { LegalPage } from './views/LegalPage';
import { OrgChartPage } from './views/OrgChartPage';
import { HomePage } from './views/HomePage';
import { DirectoryPage } from './views/DirectoryPage';
import { AgendaPage } from './views/AgendaPage';
import { AppLayout } from './components/layout/AppLayout';
import { ActionMatinalesPage, ActionForumPage, ActionInsertionPage, ActionLabelPage } from './views/ActionsPage';

// --- Shared Components ---




// --- Pages ---





const PresidentPage = () => {
  const { content } = useContent();
  const { president } = content;
  return (
    <div className="page-root">
      <div className="container" style={{ padding: '120px 40px 80px', display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 320px' }}>
          <img
            src={president.image}
            alt={president.name}
            style={{ width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow-premium)' }}
            onError={(e: any) => { e.target.src = '/saber_bouzaza_visionary.png'; }}
          />
          <div style={{ marginTop: '20px', textAlign: 'center', background: 'var(--light-gray)', padding: '20px', borderRadius: '14px' }}>
            <strong style={{ fontSize: '1.15rem', color: 'var(--atp-blue)', display: 'block' }}>{president.name}</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--atp-red)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{president.role}</span>
          </div>
        </div>
        <div style={{ flex: '1 1 480px' }}>
          <span className="section-subtitle-small">GOUVERNANCE & VISION</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--atp-blue)', marginBottom: '30px', lineHeight: 1.2, marginTop: '8px' }}>{president.title}</h2>
          <div style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--charcoal-gray)' }}>
            <blockquote style={{ color: 'var(--atp-blue)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '28px', borderLeft: '4px solid var(--atp-red)', paddingLeft: '20px', fontStyle: 'italic' }}>
              "{president.quote1}"
            </blockquote>
            <p style={{ marginBottom: '18px' }}>{president.paragraph1}</p>
            <p style={{ marginBottom: '28px' }}>{president.paragraph2}</p>
            <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--atp-red)', fontWeight: 700 }}>
              "{president.quote2}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};




// --- 20 ANS --- MYSTERIOUS TEASER ---

const AnniversaryAgendaPage = () => {
  const { content } = useContent();
  const { anniversary } = content;

  return (
    <div className="page-root">
      {/* Cinematic mysterious hero */}
      <div style={{ background: 'var(--anthracite)', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,43,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
              {['2', '0', 'A', 'N', 'S'].map((char, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                  style={{ width: char === 'A' || char === 'N' || char === 'S' ? '80px' : '70px', height: '90px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: char >= '0' && char <= '9' ? 'var(--atp-red)' : 'white', fontSize: char >= '0' && char <= '9' ? '3.2rem' : '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', backdropFilter: 'blur(10px)' }}
                >{char}</motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px' }}>Association Territoire Projet — Nancy Porte Nord</p>
            <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, lineHeight: 1.15, maxWidth: '700px', margin: '0 auto 20px' }}>
              Quelque chose d'<span style={{ color: 'var(--atp-red)' }}>historique</span><br />se prépare.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 36px' }}>
              En 2026, l'ATP Nancy Porte Nord célèbre vingt ans d'engagement territorial. Un événement sans précédent est en préparation. La date ? Elle sera révélée très prochainement.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 20px 6px 6px', borderRadius: '999px', marginBottom: '40px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--atp-red)', animation: 'pulse 2s infinite' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontWeight: 600 }}>La date arrive bientôt — 2026</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://my.weezevent.com/les-20-ans-de-latp-nancy-porte-nord" target="_blank" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                Être informé en priorité
              </a>
              <Link href="/anniversary/timeline" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 28px' }}>
                Voir notre histoire →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Program teaser */}
      <div className="container" style={{ padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-subtitle-small">PROGRAMME DU JUBILÉ 2026</span>
          <h2 style={{ marginTop: '8px' }}>Une année placée sous le signe de l'excellence</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '44rem', margin: '12px auto 0', lineHeight: 1.7 }}>
            Tout au long de 2026, l'ATP organise une série d'événements pour célébrer ses 20 ans et construire ensemble les bases de la prochaine décennie.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', margin: '0 auto 60px' }}>
          {anniversary.events.map((event: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'white', border: '1px solid', borderColor: event.type === '★ Gala' ? 'var(--atp-red)' : '#e5e7eb', padding: '24px 28px', borderRadius: '18px', transition: 'box-shadow 0.2s', position: 'relative', overflow: 'hidden' }}>
              {event.type === '★ Gala' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--atp-red)' }} />}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: event.type === '★ Gala' ? 'var(--atp-red)' : 'var(--atp-blue)', background: event.type === '★ Gala' ? 'rgba(196,43,46,0.08)' : 'rgba(0,58,92,0.07)', padding: '3px 10px', borderRadius: '999px', display: 'inline-block', marginBottom: '8px' }}>
                  {event.month} {event.type !== '★ Gala' ? `— ${event.type}` : ''}
                </span>
                <h4 style={{ fontWeight: 800, color: event.type === '★ Gala' ? 'var(--charcoal-gray)' : 'var(--atp-blue)', fontSize: event.type === '★ Gala' ? '1.05rem' : '0.98rem', marginBottom: '6px' }}>{event.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{event.description}</p>
              </div>
              {event.type === '★ Gala' && <Award style={{ color: 'var(--atp-red)', flexShrink: 0 }} size={28} />}
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/anniversary/timeline" className="btn btn-blue" style={{ padding: '14px 36px', fontSize: '0.95rem' }}>Découvrir toute l'histoire de l'ATP →</Link>
        </div>
      </div>
    </div>
  );
};

// --- TIMELINE: enriched ---

const TimelinePage = () => {
  const { content } = useContent();
  const { anniversary } = content;

  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-blue)', padding: '120px 0 80px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div className="container" style={{ padding: '0 40px', position: 'relative' }}>
          <Award style={{ margin: '0 auto 20px', color: 'var(--atp-red)', display: 'block' }} size={52} />
          <h1 style={{ color: 'white', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '14px' }}>20 ANS D'EXCELLENCE</h1>
          <p style={{ fontSize: '1rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>L'ATP Porte Nord — Mai 2006 / 2026</p>
        </div>
      </div>

      <div className="container" style={{ padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-subtitle-small">RÉTROSPECTIVE HISTORIQUE</span>
          <h2 style={{ marginTop: '8px' }}>Une trajectoire au service du territoire</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '44rem', margin: '12px auto 0', lineHeight: 1.7 }}>
            De sa fondation en mai 2006 à aujourd'hui, l'ATP Nancy Porte Nord a traversé deux décennies de transformations économiques, sociales et institutionnelles — toujours ancrée dans la réalité de son territoire.
          </p>
        </div>

        {/* Horizontal scrollable timeline */}
        <div className="timeline-horizontal" style={{ marginBottom: '90px' }}>
          <div className="timeline-line"></div>
          {anniversary.timeline.map((item: any, i: number) => (
            <div key={i} className="timeline-item-h">
              <div className="timeline-dot"></div>
              <h4 style={{ color: 'var(--atp-blue)', fontSize: '1.05rem', fontWeight: 900 }}>{item.year}</h4>
              <p style={{ fontWeight: 800, fontSize: '0.72rem', color: 'var(--atp-red)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.title}</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Key stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '80px' }}>
          {[
            { val: '2006', label: 'Fondée en mai 2006', color: 'var(--atp-blue)' },
            { val: '178 ha', label: 'De zones d\'activités', color: 'var(--atp-red)' },
            { val: '1 300+', label: 'Emplois directs', color: 'var(--atp-blue)' },
            { val: '3 zones', label: 'Lafayette, Prouvé, Fruchard', color: 'var(--atp-red)' },
            { val: '20 ans', label: 'D\'engagement en 2026', color: 'var(--atp-blue)' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--light-gray)', padding: '24px', borderRadius: '16px', textAlign: 'center', borderBottom: '4px solid ' + s.color }}>
              <strong style={{ fontSize: '1.8rem', color: s.color, display: 'block' }}>{s.val}</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.4, display: 'block', marginTop: '4px' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Celebration events */}
        <div style={{ background: 'var(--light-gray)', borderRadius: '28px', padding: '60px 50px' }}>
          <h3 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '48px', color: 'var(--atp-blue)', fontWeight: 900 }}>Programme du Jubilé 2026</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {anniversary.events.map((ev: any, i: number) => (
              <div key={i} style={{ background: 'white', padding: '28px', borderRadius: '18px', border: '1px solid #e5e7eb', boxShadow: ev.type === '★ Gala' ? '0 4px 20px rgba(196,43,46,0.1)' : 'none', borderTop: ev.type === '★ Gala' ? '3px solid var(--atp-red)' : '1px solid #e5e7eb' }}>
                <span style={{ color: 'var(--atp-red)', fontWeight: 900, fontSize: '1rem', display: 'block', marginBottom: '10px' }}>{ev.month}</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '10px', color: 'var(--charcoal-gray)' }}>{ev.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>{ev.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ORG CHART ---



const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error));
  };

  return (
    <div className="page-root container" style={{ paddingTop: '130px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', flexWrap: 'wrap' }}>
        <div>
          <span className="section-subtitle-small">NOUS JOINDRE</span>
          <h2 style={{ marginTop: '8px', marginBottom: '28px' }}>Contactez l'ATP</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
              <Mail style={{ color: 'var(--atp-red)', flexShrink: 0 }} size={20} aria-hidden="true" />
              <a href="mailto:nancyportenord@gmail.com" style={{ color: 'var(--atp-blue)', fontWeight: 700, textDecoration: 'none' }}>nancyportenord@gmail.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
              <Phone style={{ color: 'var(--atp-red)', flexShrink: 0 }} size={20} aria-hidden="true" />
              <a href="tel:0622387700" style={{ color: 'var(--charcoal-gray)', fontWeight: 600, textDecoration: 'none' }}>06 22 38 77 00</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.9rem' }}>
              <MapPin style={{ color: 'var(--atp-red)', flexShrink: 0, marginTop: '2px' }} size={20} aria-hidden="true" />
              <span>Zone d'Activités Porte Nord<br />Maxéville — 54320 Nancy Métropole</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
              <Calendar style={{ color: 'var(--atp-red)', flexShrink: 0 }} size={20} aria-hidden="true" />
              <span>Ouvert du lundi au vendredi</span>
            </div>
          </div>
          
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '32px', height: '250px' }}>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10526.46788425232!2d6.155554605051939!3d48.71881677320092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4794981881a2da35%3A0x6b771e8df1c3f8f1!2sZone%20d'Activit%C3%A9s%20Porte%20Nord%2C%2054320%20Max%C3%A9ville!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte de la zone Porte Nord"
             ></iframe>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Adhésion HelloAsso 2026</a>
            <a href="https://www.linkedin.com/company/nancy-porte-nord/" target="_blank" rel="noopener noreferrer" className="btn btn-blue">Nous suivre sur LinkedIn</a>
          </div>
        </div>
        <div style={{ background: 'var(--light-gray)', padding: '40px', borderRadius: '24px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.4rem', color: 'var(--atp-blue)' }}>Envoyer un message</h3>
          
          {submitted ? (
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#d1fae5', color: '#065f46', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto 16px' }} />
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Message envoyé avec succès !</h4>
                <p style={{ fontSize: '0.9rem' }}>Nous vous recontacterons dans les plus brefs délais.</p>
                <button onClick={() => setSubmitted(false)} className="btn" style={{ marginTop: '20px', background: 'white', color: '#065f46', border: '1px solid #10b981' }}>Nouveau message</button>
             </motion.div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              
              // 1. Send to Supabase
              try {
                const { supabase } = await import('./lib/supabase');
                await supabase.from('contact_requests').insert({
                  company_name: formData.get('company'),
                  contact_name: formData.get('name'),
                  email: formData.get('email'),
                  subject: formData.get('subject'),
                  message: formData.get('message')
                });
              } catch (err) {
                console.error("Failed to save to Supabase", err);
              }

              // 2. Also trigger Netlify forms via standard fetch
              fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString()
              })
              .then(() => setSubmitted(true))
              .catch(() => setSubmitted(true)); // Even if Netlify fails, Supabase worked
            }} name="contact-atp" method="POST" data-netlify="true" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="hidden" name="form-name" value="contact-atp" />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label htmlFor="company" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal-gray)' }}>Votre entreprise</label>
                 <input id="company" name="company" type="text" placeholder="Ex: Acieries de Lorraine..." required style={{ padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '0.95rem', background: 'white', outline: 'none', transition: 'border-color 0.2s' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal-gray)' }}>Votre nom & prénom</label>
                 <input id="name" name="name" type="text" placeholder="Jean Dupont" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '0.95rem', background: 'white', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal-gray)' }}>Votre email</label>
                 <input id="email" name="email" type="email" placeholder="jean.dupont@email.com" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '0.95rem', background: 'white', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label htmlFor="subject" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal-gray)' }}>Objet de votre demande</label>
                 <select id="subject" name="subject" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '0.95rem', background: 'white', outline: 'none', color: '#334155', cursor: 'pointer' }}>
                   <option value="">Sélectionnez un sujet...</option>
                   <option value="Adhésion">Adhésion à l'ATP</option>
                   <option value="Partenariat">Partenariat institutionnel</option>
                   <option value="Emploi">Forum Emploi / Recrutement</option>
                   <option value="Matinale">Matinale Économique</option>
                   <option value="Insertion">Projet RSA / Insertion</option>
                   <option value="Autre">Autre demande</option>
                 </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal-gray)' }}>Votre message</label>
                 <textarea id="message" name="message" placeholder="Comment pouvons-nous vous aider ?" required rows={5} style={{ padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '0.95rem', background: 'white', resize: 'vertical', outline: 'none' }}></textarea>
              </div>

              <button type="submit" className="btn btn-blue" style={{ padding: '14px', fontSize: '1rem', marginTop: '8px', display: 'flex', justifyContent: 'center' }}>Envoyer le message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// NOUVELLES PAGES : OFFRES EMPLOI + CVTHÈQUE
// ============================================================

const AllJobOffersPage = () => {
  const { content } = useContent();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('Tous les types');
  const [selectedSector, setSelectedSector] = useState('Tous les secteurs');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const types = ['Tous les types', 'CDI', 'CDD', 'Alternance', 'Stage'];
  const sectors = ['Tous les secteurs', 'Industrie', 'BTP', 'Services Pro', 'Formation / RH', 'Commerce / Logistique'];

  const allOffers = (content.directory?.companies || []).flatMap((c: any) =>
    (c.jobOffers || []).map((j: any) => ({ ...j, companyName: c.name, companySlug: c.slug, companyEmail: c.email }))
  );

  const filtered = allOffers.filter((j: any) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.companyName.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'Tous les types' || j.type === selectedType;
    const matchSector = selectedSector === 'Tous les secteurs' || j.sector === selectedSector;
    return matchSearch && matchType && matchSector;
  });

  const typeColors: Record<string, { bg: string, text: string }> = {
    'CDI': { bg: 'rgba(0,58,92,0.08)', text: 'var(--atp-blue)' },
    'CDD': { bg: 'rgba(251,191,36,0.1)', text: '#d97706' },
    'Alternance': { bg: 'rgba(196,43,46,0.08)', text: 'var(--atp-red)' },
    'Stage': { bg: 'rgba(5,150,105,0.08)', text: '#059669' },
  };

  return (
    <div className="page-root">
      <div style={{ background: 'linear-gradient(135deg, var(--atp-blue) 0%, var(--atp-blue-light) 100%)', color: 'white', padding: '120px 0 70px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>ESPACE EMPLOI & ALTERNANCE</span>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, marginTop: '8px', marginBottom: '16px' }}>Offres d'Emploi<br />des Entreprises Adhérentes</h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '520px', lineHeight: 1.75, fontSize: '1rem' }}>
            Toutes les offres d'emploi, alternances et stages proposés par les entreprises membres de l'ATP Nancy Porte Nord.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
            {types.slice(1).map(t => (
              <div key={t} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '999px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>
                  {allOffers.filter((j: any) => j.type === t).length} {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '50px 40px 80px' }}>
        {/* Search & filters */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px', background: 'rgba(255,255,255,0.9)' }}>
          <div style={{ display: 'flex', gap: '14px', padding: '12px 18px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', alignItems: 'center', marginBottom: '16px' }}>
            <Search style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={20} />
            <input type="text" placeholder="Rechercher par titre de poste ou entreprise..." style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontWeight: 600, color: 'var(--charcoal-gray)', fontSize: '0.92rem' }} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select style={{ padding: '9px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.85rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
            <select style={{ padding: '9px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.85rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
              {sectors.map(s => <option key={s}>{s}</option>)}
            </select>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>{filtered.length} offre{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((j: any, i: number) => (
              <motion.div key={`${j.companySlug}-${j.id}`} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }} onClick={() => setExpandedId(expandedId === `${j.companySlug}-${j.id}` ? null : `${j.companySlug}-${j.id}`)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--atp-blue)', margin: 0 }}>{j.title}</h4>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '999px', background: typeColors[j.type]?.bg || 'rgba(0,0,0,0.05)', color: typeColors[j.type]?.text || 'var(--text-muted)' }}>{j.type}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Building2 size={13} style={{ color: 'var(--atp-blue)' }} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--atp-blue)' }}>{j.companyName}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} />{j.location}</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12} />{j.salary}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Publié le {new Date(j.published).toLocaleDateString('fr-FR')}</span>
                    <ChevronDown size={18} style={{ color: 'var(--text-muted)', transform: expandedId === `${j.companySlug}-${j.id}` ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedId === `${j.companySlug}-${j.id}` && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden', borderTop: '1px solid #e5e7eb', padding: '24px', background: 'var(--light-gray)' }}>
                      <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '16px' }}>{j.description}</p>
                      <h5 style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--charcoal-gray)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Profil recherché :</h5>
                      <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                        {j.requirements.map((r: string, ri: number) => (
                          <li key={ri} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                            <CheckCircle2 size={14} style={{ color: 'var(--atp-blue)', flexShrink: 0, marginTop: '2px' }} /> {r}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <a href={`mailto:${j.companyEmail || 'nancyportenord@gmail.com'}?subject=Candidature : ${j.title} chez ${j.companyName}`} className="btn btn-primary" style={{ fontSize: '0.82rem' }}>Postuler par email →</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px', background: 'var(--light-gray)', borderRadius: '24px', border: '2px dashed #d1d5db' }}>
            <Briefcase size={48} style={{ margin: '0 auto 16px', color: 'var(--text-muted)', opacity: 0.2, display: 'block' }} />
            <h3 style={{ fontWeight: 800, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Aucune offre ne correspond</h3>
            <p style={{ color: 'var(--text-muted)' }}>Modifiez vos filtres de recherche.</p>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: '60px', background: 'var(--atp-blue)', borderRadius: '24px', padding: '40px 48px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '8px' }}>Vous êtes une entreprise ?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>Publiez vos offres d'emploi gratuitement en devenant membre Premium ATP.</p>
          </div>
          <a href="mailto:nancyportenord@gmail.com?subject=Je souhaite publier une offre d'emploi" className="btn" style={{ background: '#fbbf24', color: '#1a0a00', fontWeight: 900 }}>Contactez-nous →</a>
        </div>
      </div>
    </div>
  );
};

const CVthequePage = () => {
  const { content } = useContent();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tous les secteurs');
  const [selectedContract, setSelectedContract] = useState('Tous les contrats');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Demo access code for testing
  const DEMO_CODE = 'ATP2026';

  const handleUnlock = () => {
    if (accessCode.toUpperCase() === DEMO_CODE) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Code d\'accès incorrect. Contactez l\'ATP pour obtenir votre accès.');
    }
  };

  const profiles = content.cvtheque?.profiles || [];
  const sectors = ['Tous les secteurs', ...Array.from(new Set(profiles.map((p: any) => p.sector)))];
  const contracts = ['Tous les contrats', 'CDI', 'CDD', 'Alternance', 'Stage', 'Temps partiel', 'Mission intérim'];

  const filtered = profiles.filter((p: any) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.sector.toLowerCase().includes(search.toLowerCase()) || p.skills.some((s: string) => s.toLowerCase().includes(search.toLowerCase()));
    const matchSector = selectedSector === 'Tous les secteurs' || p.sector === selectedSector;
    const matchContract = selectedContract === 'Tous les contrats' || p.contractTypes.includes(selectedContract);
    return matchSearch && matchSector && matchContract;
  });

  const getInitials = (firstName: string, lastName: string) => `${firstName[0]}${lastName[0]}`;
  const avatarColors = ['#003a5c', '#c42b2e', '#059669', '#d97706', '#7c3aed', '#0891b2'];

  if (!isUnlocked) {
    return (
      <div className="page-root">
        <div style={{ background: 'linear-gradient(135deg, var(--anthracite) 0%, #1a1a2e 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,58,92,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 10, maxWidth: '500px', width: '100%' }}>
            {/* Lock icon */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', backdropFilter: 'blur(10px)' }}>
                <Lock size={32} style={{ color: 'rgba(255,255,255,0.7)' }} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--atp-red)', display: 'block', marginBottom: '10px' }}>ACCÈS RÉSERVÉ AUX ADHÉRENTS</span>
              <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '14px' }}>
                CVthèque<br /><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65em' }}>ATP Nancy Porte Nord</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto' }}>
                La CVthèque ATP vous donne accès à des profils de candidats triés et anonymisés — pour vos recrutements CDI, CDD, alternances et stages.
              </p>
            </div>

            {/* Access form */}
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '36px', backdropFilter: 'blur(20px)' }}>
              <h3 style={{ color: 'white', fontSize: '1.05rem', fontWeight: 800, textAlign: 'center', marginBottom: '24px' }}>Entrez votre code d'accès</h3>
              <input
                type="password"
                placeholder="Code d'accès adhérent..."
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.08)', border: `1px solid ${error ? 'rgba(196,43,46,0.6)' : 'rgba(255,255,255,0.15)'}`, borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', textAlign: 'center', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '12px' }}
              />
              {error && (
                <p style={{ color: 'rgba(196,43,46,0.9)', fontSize: '0.8rem', textAlign: 'center', marginBottom: '12px' }}>{error}</p>
              )}
              <button onClick={handleUnlock} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.92rem', fontWeight: 800, borderRadius: '12px' }}>
                Accéder à la CVthèque →
              </button>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', textAlign: 'center', marginTop: '16px', lineHeight: 1.5 }}>
                L'accès à la CVthèque est un service payant réservé aux adhérents Premium ATP.<br />
                Contactez-nous : nancyportenord@gmail.com
              </p>
            </div>

            {/* What you'll get */}
            <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: <Users size={18} />, text: 'Profils qualifiés & vérifiés' },
                { icon: <Shield size={18} />, text: 'Anonymat RGPD respecté' },
                { icon: <Search size={18} />, text: 'Filtres secteur & contrat' },
                { icon: <Mail size={18} />, text: 'Contact via l\'ATP' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Unlocked view
  return (
    <div className="page-root">
      <div style={{ background: 'linear-gradient(135deg, var(--atp-blue) 0%, var(--atp-blue-light) 100%)', color: 'white', padding: '100px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '999px', marginBottom: '16px' }}>
                <CheckCircle2 size={14} style={{ color: '#4ade80' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Accès Adhérent Actif</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '12px', lineHeight: 1.1 }}>CVthèque ATP Porte Nord</h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7 }}>
                {profiles.length} profils disponibles — Candidats qualifiés du territoire Grand Nancy
              </p>
            </div>
            <button onClick={() => setIsUnlocked(false)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '9px 18px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>
              Se déconnecter
            </button>
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {[
              { label: 'Profils totaux', val: profiles.length },
              { label: 'Disponibles immédiatement', val: profiles.filter((p: any) => p.availability === 'Immédiate').length },
              { label: 'En recherche d\'alternance', val: profiles.filter((p: any) => p.contractTypes.includes('Alternance')).length },
              { label: 'Profils mis en avant', val: profiles.filter((p: any) => p.featured).length },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px 20px', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.4rem', color: 'white', display: 'block' }}>{s.val}</strong>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '50px 40px 80px' }}>
        {/* Filters */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '36px', background: 'rgba(255,255,255,0.9)' }}>
          <div style={{ display: 'flex', gap: '14px', padding: '11px 16px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', alignItems: 'center', marginBottom: '14px' }}>
            <Search style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={18} />
            <input type="text" placeholder="Rechercher par titre, secteur, compétence..." style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontWeight: 600, color: 'var(--charcoal-gray)', fontSize: '0.9rem' }} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select style={{ padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.84rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
              {sectors.map((s: any) => <option key={s}>{s}</option>)}
            </select>
            <select style={{ padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.84rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedContract} onChange={(e) => setSelectedContract(e.target.value)}>
              {contracts.map(c => <option key={c}>{c}</option>)}
            </select>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{filtered.length} profil{filtered.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* RGPD notice */}
        <div style={{ background: 'rgba(0,58,92,0.04)', border: '1px solid rgba(0,58,92,0.12)', borderRadius: '12px', padding: '14px 18px', marginBottom: '28px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Shield size={16} style={{ color: 'var(--atp-blue)', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: 'var(--atp-blue)' }}>Confidentialité RGPD :</strong> Les profils sont anonymisés (prénom + initiale du nom). Pour contacter un candidat, transmettez votre demande à l'ATP qui jouera le rôle d'intermédiaire. L'utilisation de ces données est strictement réservée aux recruteurs adhérents.
          </p>
        </div>

        {/* Featured profiles */}
        {filtered.some((p: any) => p.featured) && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Sparkles size={18} style={{ color: '#d97706' }} />
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--atp-blue)', fontWeight: 800 }}>Profils recommandés</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {filtered.filter((p: any) => p.featured).map((p: any, i: number) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fff 100%)', border: '2px solid #fcd34d', borderRadius: '18px', padding: '22px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(251,191,36,0.12)' }}
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: avatarColors[i % avatarColors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1rem', flexShrink: 0 }}>
                      {getInitials(p.firstName, p.lastName)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--atp-blue)', margin: 0, marginBottom: '2px' }}>{p.firstName} {p.lastName}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--atp-red)', fontWeight: 700, margin: 0 }}>{p.title}</p>
                        </div>
                        <Sparkles size={16} style={{ color: '#d97706' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', background: 'rgba(5,150,105,0.08)', padding: '2px 8px', borderRadius: '6px' }}>Dispo : {p.availability}</span>
                        {p.contractTypes.slice(0, 2).map((ct: string) => (
                          <span key={ct} style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--atp-blue)', background: 'rgba(0,58,92,0.07)', padding: '2px 8px', borderRadius: '6px' }}>{ct}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedId === p.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #fde68a' }}>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '12px' }}>{p.summary}</p>
                          <div style={{ marginBottom: '12px' }}>
                            <p style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--charcoal-gray)', marginBottom: '6px' }}>Compétences clés</p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {p.skills.map((sk: string) => <span key={sk} style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--atp-blue)', background: 'rgba(0,58,92,0.07)', padding: '3px 8px', borderRadius: '6px' }}>{sk}</span>)}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <GraduationCap size={13} style={{ color: 'var(--text-muted)' }} />
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.diploma}</span>
                          </div>
                          <a href={`mailto:nancyportenord@gmail.com?subject=CVthèque - Contact candidat ${p.id}&body=Bonjour, je souhaite contacter le candidat ref. ${p.id} (${p.title}).`} className="btn btn-primary" style={{ marginTop: '14px', fontSize: '0.78rem', padding: '9px 18px', width: '100%', justifyContent: 'center' }}>
                            Demander à être mis en contact →
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All profiles */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '20px' }}>Tous les profils disponibles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((p: any, i: number) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', cursor: 'pointer' }}
                onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: avatarColors[i % avatarColors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.88rem', flexShrink: 0 }}>
                    {getInitials(p.firstName, p.lastName)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--atp-blue)', margin: 0 }}>{p.firstName} {p.lastName}</h4>
                      {p.featured && <Sparkles size={13} style={{ color: '#d97706' }} />}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--atp-red)', margin: 0, fontWeight: 700 }}>{p.title}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', background: 'rgba(5,150,105,0.07)', padding: '3px 9px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{p.availability}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', background: 'var(--light-gray)', padding: '3px 9px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{p.experience}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--atp-blue)', background: 'rgba(0,58,92,0.07)', padding: '3px 9px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{p.sector}</span>
                    <ChevronDown size={16} style={{ color: 'var(--text-muted)', transform: expandedId === p.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>
                </div>
                <AnimatePresence>
                  {expandedId === p.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '20px 22px', borderTop: '1px solid #e5e7eb', background: 'var(--light-gray)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px' }}>{p.summary}</p>
                          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>🎯 Recherche : {p.seeking}</p>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {p.contractTypes.map((ct: string) => <span key={ct} style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--atp-blue)', background: 'rgba(0,58,92,0.08)', padding: '3px 9px', borderRadius: '6px' }}>{ct}</span>)}
                          </div>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Compétences</p>
                          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {p.skills.map((sk: string) => <span key={sk} style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--atp-blue)', background: 'rgba(0,58,92,0.07)', padding: '2px 7px', borderRadius: '6px' }}>{sk}</span>)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><GraduationCap size={12} /> {p.diploma}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={12} /> {p.location}</span>
                          </div>
                          <a href={`mailto:nancyportenord@gmail.com?subject=CVthèque - Contact candidat ${p.id}&body=Bonjour, je souhaite être mis en contact avec le candidat réf. ${p.id} - ${p.title}.`} className="btn btn-blue" style={{ marginTop: '14px', fontSize: '0.75rem', padding: '8px 16px', width: '100%', justifyContent: 'center' }}>
                            Demander la mise en contact →
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '60px', background: 'var(--anthracite)', borderRadius: '24px', padding: '44px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(0,58,92,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <Lock size={28} style={{ margin: '0 auto 12px', color: 'rgba(255,255,255,0.3)', display: 'block' }} />
            <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '10px' }}>Vous n'avez pas encore accès à la CVthèque ?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.7 }}>
              L'accès à la CVthèque est un service premium réservé aux entreprises adhérentes. Contactez l'ATP pour obtenir votre code d'accès.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:nancyportenord@gmail.com" className="btn btn-primary" style={{ padding: '12px 28px' }}>Contacter l'ATP</a>
              <Link href="/entreprises-premium" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 28px' }}>En savoir plus sur le Premium</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APPEL A PROJET PAGE ---

const AppelAProjetPage = () => {
  const { content } = useContent();
  const categories = (content as any).appelAProjet?.categories || [];
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [form, setForm] = useState({ title: '', description: '', contact: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleUnlock = () => {
    if (code === 'ATP2026') { setIsUnlocked(true); setError(''); }
    else setError('Code incorrect. Contactez l\'ATP pour obtenir votre accès adhérent.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCat) { setError('Veuillez sélectionner une catégorie.'); return; }
    if (!form.title.trim() || !form.description.trim()) { setError('Veuillez remplir le titre et la description.'); return; }
    setSubmitted(true);
  };

  if (!isUnlocked) return (
    <div className="page-root" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '440px', width: '100%', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(124,58,237,0.2)', border: '2px solid rgba(124,58,237,0.4)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Lightbulb size={36} style={{ color: '#a78bfa' }} />
        </div>
        <span style={{ color: '#a78bfa', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Espace Adhérents</span>
        <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 900, margin: '12px 0 8px', lineHeight: 1.1 }}>Boîte à Idées ATP</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '32px', fontSize: '0.95rem' }}>Proposez vos idées, demandes d'événements, actions collectives et suggestions directement à l'équipe de l'ATP. Réservé aux adhérents.</p>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', marginBottom: '16px', fontWeight: 600 }}>Code d'accès adhérent</p>
          <input
            type="password" value={code}
            onChange={e => { setCode(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
            placeholder="••••••••"
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: error ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '1rem', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#f87171', fontSize: '0.82rem', marginBottom: '12px' }}>⚠️ {error}</p>}
          <button onClick={handleUnlock} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>Accéder à ma Boîte à Idées</button>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '16px' }}>Code fourni lors de votre adhésion ATP 2026</p>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: '20px' }}>Code perdu ? Contactez : <a href="mailto:nancyportenord@gmail.com" style={{ color: '#a78bfa' }}>nancyportenord@gmail.com</a></p>
      </motion.div>
    </div>
  );

  if (submitted) return (
    <div className="page-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--light-gray)' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: '480px', textAlign: 'center', padding: '60px 40px', background: 'white', borderRadius: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
        <h2 style={{ color: 'var(--atp-blue)', marginBottom: '12px' }}>Votre idée a été transmise !</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px' }}>Merci pour votre contribution. L'équipe de l'ATP examinera votre proposition et vous contactera prochainement.</p>
        <button onClick={() => { setSubmitted(false); setForm({ title: '', description: '', contact: '', company: '' }); setSelectedCat(''); }} className="btn btn-blue">Soumettre une nouvelle idée</button>
      </motion.div>
    </div>
  );

  return (
    <div className="page-root">
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', padding: '120px 0 70px' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span style={{ color: '#a78bfa', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Espace Réservé Adhérents</span>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, margin: '12px 0 16px' }}>💡 Boîte à Idées ATP</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '560px', lineHeight: 1.7, fontSize: '1.02rem' }}>Votre outil de co-construction du réseau ATP. Proposez, suggérez, demandez — ensemble nous construisons le territoire de demain.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '60px', alignItems: 'start' }}>
          {/* Categories panel */}
          <div>
            <h3 style={{ marginBottom: '20px', color: 'var(--atp-blue)' }}>Type de proposition</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categories.map((cat: any) => (
                <button key={cat.id} onClick={() => { setSelectedCat(cat.id); setError(''); }}
                  style={{ textAlign: 'left', padding: '16px 20px', borderRadius: '14px', border: `2px solid ${selectedCat === cat.id ? cat.color : '#e5e7eb'}`, background: selectedCat === cat.id ? `${cat.color}12` : 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: selectedCat === cat.id ? cat.color : 'var(--charcoal-gray)', marginBottom: '4px' }}>{cat.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{cat.description}</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: '28px', background: 'var(--light-gray)', borderRadius: '16px', padding: '20px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--atp-blue)', display: 'block', marginBottom: '6px' }}>Comment ça marche ?</strong>
              1. Choisissez une catégorie<br />
              2. Remplissez le formulaire<br />
              3. L'équipe ATP examine et vous répond<br />
              4. Les meilleures idées sont présentées en AG
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
            <h3 style={{ marginBottom: '8px', color: 'var(--atp-blue)' }}>Votre proposition</h3>
            {selectedCat && (
              <span style={{ fontSize: '0.78rem', background: '#f5f0ff', color: '#7c3aed', fontWeight: 700, padding: '4px 14px', borderRadius: '999px', display: 'inline-block', marginBottom: '20px' }}>
                {categories.find((c: any) => c.id === selectedCat)?.label}
              </span>
            )}
            {!selectedCat && <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>← Sélectionnez d'abord une catégorie</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--atp-blue)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Votre entreprise</label>
                  <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Nom de votre entreprise" style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--atp-blue)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Votre contact</label>
                  <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} placeholder="Email ou téléphone" style={{ width: '100%', padding: '11px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--atp-blue)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Titre de votre proposition *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Ex: Organiser une matinale sur l'IA" style={{ width: '100%', padding: '12px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--atp-blue)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Description détaillée *</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={5} placeholder="Décrivez votre idée, son intérêt pour les adhérents, les ressources nécessaires..." style={{ width: '100%', padding: '12px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '0.9rem', resize: 'vertical', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box' }} />
              </div>
              {error && <p style={{ color: '#ef4444', fontSize: '0.82rem' }}>⚠️ {error}</p>}
              <button type="submit" className="btn btn-blue" style={{ padding: '14px', fontSize: '1rem', marginTop: '4px' }}>Envoyer ma proposition à l'ATP</button>
            </form>
          </div>
        </div>

        {/* Previously submitted ideas - decoration */}
        <div style={{ marginTop: '70px', background: 'linear-gradient(135deg, #f5f0ff 0%, #ede9fe 100%)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(124,58,237,0.15)' }}>
          <h3 style={{ color: '#7c3aed', marginBottom: '20px', fontSize: '1.3rem' }}>💡 Idées récemment transmises par les adhérents</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { cat: '🎉 Événement', title: 'Visite d\'une entreprise industrielle', author: 'Un adhérent — Zone Fruchard', status: 'En étude' },
              { cat: '💡 Idée', title: 'Formation cybersécurité pour dirigeants', author: 'Un adhérent — Zone Lafayette', status: 'Planifié' },
              { cat: '🤝 Action Collective', title: 'Groupement d\'achats énergie verte', author: 'Plusieurs adhérents', status: 'En étude' },
              { cat: '🏛️ Territoire', title: 'Amélioration signalétique Zone Prouvé', author: 'Un adhérent — Zone Prouvé', status: 'Transmis élus' },
            ].map((idea, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{idea.cat}</span>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--charcoal-gray)', margin: '8px 0 6px' }}>{idea.title}</h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{idea.author}</p>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: idea.status === 'Planifié' ? '#059669' : idea.status === 'Transmis élus' ? 'var(--atp-blue)' : '#d97706', background: idea.status === 'Planifié' ? '#d1fae5' : idea.status === 'Transmis élus' ? '#e0f2fe' : '#fef3c7', padding: '3px 10px', borderRadius: '999px' }}>{idea.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export { PresidentPage, AnniversaryAgendaPage, TimelinePage, ContactPage, AllJobOffersPage, CVthequePage, AppelAProjetPage };
