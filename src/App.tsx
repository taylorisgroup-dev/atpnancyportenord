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
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { useContent } from './cms/ContentContext';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdherentLogin } from './pages/AdherentLogin';
import { AdherentDashboard } from './pages/AdherentDashboard';

// --- Shared Components ---

const NavItem = ({ title, href, subItems }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="nav-item-wrapper" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Link to={href} className="nav-link">{title} {subItems && <ChevronDown size={12} />}</Link>
      <AnimatePresence>
        {isOpen && subItems && (
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="submenu" transition={{ duration: 0.2 }}>
            {subItems.map((item: any, i: number) => (
              <Link key={i} to={item.href} className="submenu-link" onClick={() => setIsOpen(false)}>{item.title}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const isHome = pathname === '/';

  const menuItems = [
    {
      title: "L'ATP Porte Nord", href: "/about",
      subItems: [
        { title: "Qui sommes-nous ?", href: "/about" },
        { title: "Le mot du Président", href: "/president" },
        { title: "Organigramme", href: "/organigramme" },
        { title: "Annuaire Entreprises", href: "/directory" }
      ]
    },
    {
      title: "Nos Actions", href: "/actions",
      subItems: [
        { title: "Matinales Éco", href: "/actions/matinales" },
        { title: "Forum Emploi / Alternance", href: "/actions/forum" },
        { title: "Insertion Professionnelle", href: "/actions/insertion" },
        { title: "Label Entreprise Engagée", href: "/actions/label" }
      ]
    },
    {
      title: "Espace Emploi", href: "/offres-emploi",
      subItems: [
        { title: "Offres d'Emploi", href: "/offres-emploi" },
        { title: "Espace Adhérent", href: "/adherent-login" }
      ]
    },
    { title: "Agenda", href: "/agenda" },
    { title: "Contact", href: "/contact" }
  ];

  return (
    <nav className={`fixed-navbar ${scrolled || !isHome ? 'nav-scrolled' : 'nav-transparent'}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img src="/atp_logo_transparent.png" alt="ATP Nancy Porte Nord" className="logo-img" />
        </Link>
        <div className="desktop-menu">
          {menuItems.map((item, i) => (<NavItem key={i} title={item.title} href={item.href} subItems={item.subItems} />))}
          <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" className="btn btn-primary btn-sm" style={{ marginLeft: '10px' }}>ADHÉRER 2026</a>
        </div>
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={32} style={{ color: scrolled || !isHome ? 'var(--charcoal-gray)' : 'white' }} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="mobile-menu-overlay">
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            <div className="mobile-nav-content">
              {menuItems.map((item, i) => (
                <div key={i} className="mobile-nav-item">
                  <h4>{item.title}</h4>
                  <div className="mobile-nav-links">
                    {item.subItems?.map((s, si) => (
                      <Link key={si} to={s.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{s.title}</Link>
                    ))}
                  </div>
                </div>
              ))}
              <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setMobileMenuOpen(false)}>ADHÉRER 2026</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer style={{ background: 'var(--anthracite)', color: 'white', padding: '60px 0 30px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <img src="/atp_logo_transparent.png" alt="Logo" style={{ height: '48px', marginBottom: '15px' }} />
          <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: '1.8' }}>
            Association Territoire Projet — Nancy Porte Nord.<br />
            Zone d'Activités Porte Nord, Maxéville — 54320.<br />
            Fondée en mai 2006.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a href="mailto:nancyportenord@gmail.com" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14}/> nancyportenord@gmail.com</a>
            <a href="tel:0622387700" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14}/> 06 22 38 77 00</a>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--atp-red)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 800 }}>Navigation</h4>
          <Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Qui sommes-nous ?</Link>
          <Link to="/president" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Le mot du Président</Link>
          <Link to="/directory" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Annuaire Entreprises</Link>
          <Link to="/organigramme" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Organigramme</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--atp-red)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 800 }}>Ressources</h4>
          <Link to="/offres-emploi" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Offres d'Emploi</Link>
          <Link to="/adherent-login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Espace Adhérent</Link>
          <Link to="/actions" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Nos Actions</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--atp-red)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 800 }}>Partenaires</h4>
          <img src="/region-grand-est-transparent.png" alt="Région Grand Est" style={{ height: '30px', opacity: 0.8, maxWidth: '120px', objectFit: 'contain' }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Métropole du Grand Nancy<br />Ville de Maxéville<br />France Travail<br />Conseil Départemental 54</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
        <div style={{ opacity: 0.4, fontSize: '0.7rem' }}>
          © 2026 ATP Nancy Porte Nord — Association loi 1901
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/cgu" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textDecoration: 'none' }}>CGU</Link>
          <Link to="/cgv" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textDecoration: 'none' }}>CGV</Link>
          <Link to="/mentions-legales" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textDecoration: 'none' }}>Mentions légales</Link>
        </div>
      </div>
    </div>
  </footer>
);

// --- Video Frame Component ---
const VideoFrame = ({ url }: { url?: string }) => {
  let displayUrl = url;
  if (url) {
    const watchMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) displayUrl = `https://www.youtube.com/embed/${watchMatch[1]}`;
    else {
      const shortMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (shortMatch) displayUrl = `https://www.youtube.com/embed/${shortMatch[1]}`;
      else {
        const shortsMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) displayUrl = `https://www.youtube.com/embed/${shortsMatch[1]}`;
      }
    }
  }

  return (
    <div className="hero-video-frame">
      {displayUrl ? (
        <iframe
          src={displayUrl}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ border: 'none', width: '100%', height: '100%', aspectRatio: '16/9' }}
        />
      ) : (
        <div className="video-placeholder-inner">
          <div className="video-play-btn">
            <Play size={40} style={{ color: 'white', marginLeft: '4px' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '20px', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Vidéo de présentation
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '6px' }}>Configurable depuis l'espace administrateur</p>
        </div>
      )}
    </div>
  );
};

// --- Pages ---

const HomePage = () => {
  const { content } = useContent();
  const { hero, banner } = content.home;

  return (
    <>
      <section className="hero-section">
        <div className="digital-waves">
          <svg className="wave-svg" viewBox="0 0 1440 320"><path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        <div className="container hero-content">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hero-text-side">
            <span className="section-subtitle-small"><strong style={{ color: 'white', opacity: 0.9 }}>{hero.subtitle}</strong></span>
            <h1 className="hero-title" style={{ color: 'white', marginBottom: '25px', lineHeight: 1.15 }}>
              <span className="text-gradient" style={{ filter: 'brightness(1.5)', display: 'block' }}>{hero.titleHighlight}</span>
              <span style={{ display: 'block' }}>{hero.titleText}</span>
            </h1>
            <p className="hero-intro-text">{hero.intro}</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href={hero.primaryButtonLink} target="_blank" className="btn btn-primary">{hero.primaryButtonText}</a>
              <Link to="/actions" className="btn btn-blue">{hero.secondaryButtonText}</Link>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="hero-video-side" style={{ width: '100%', flex: 1.5, maxWidth: '800px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', border: '4px solid rgba(255,255,255,0.1)' }}>
            <VideoFrame url={hero.videoUrl} />
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ position: 'relative', zIndex: 20 }}>
        <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }} className="banner-card">
          <div className="banner-img-wrapper" style={{ backgroundImage: `url(${banner.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="banner-text-wrapper">
            <span className="section-subtitle-small" style={{ color: 'var(--atp-red)', fontWeight: 900, letterSpacing: '0.15em' }}>{banner.subtitle}</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '12px', lineHeight: 1.2 }}>{banner.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1rem', lineHeight: 1.7 }}>{banner.text}</p>
            <div>
              <a href={banner.buttonLink} target="_blank" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.9rem' }}>{banner.buttonText}</a>
            </div>
          </div>
        </motion.div>
      </div>

      <section id="missions" style={{ padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-subtitle-small">NOTRE RAISON D'ÊTRE</span>
            <h2>Un catalyseur au service du territoire</h2>
            <p style={{ maxWidth: '44rem', margin: '16px auto 0', color: 'var(--text-muted)', lineHeight: 1.7 }}>L'ATP Nancy Porte Nord ne se contente pas de fédérer. Nous agissons comme un levier stratégique pour transformer les défis économiques en opportunités de croissance collective.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            <div className="glass hover-premium-card" style={{ padding: '32px', borderRadius: '16px', borderTop: '4px solid var(--atp-blue)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--atp-blue)', opacity: 0.15, marginBottom: '4px', lineHeight: 1, letterSpacing: '-0.05em' }}>01</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Fédérer l'Excellence</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nous créons des ponts entre les entreprises des zones Lafayette, Prouvé et Fruchard, favorisant le partage d'expertises et la naissance de synergies commerciales locales.</p>
            </div>
            <div className="glass hover-premium-card" style={{ padding: '32px', borderRadius: '16px', borderTop: '4px solid var(--atp-red)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--atp-red)', opacity: 0.15, marginBottom: '4px', lineHeight: 1, letterSpacing: '-0.05em' }}>02</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Accélérer le Dialogue</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Interface privilégiée avec les institutions, nous portons la voix des entrepreneurs pour influencer l'aménagement et le développement du territoire.</p>
            </div>
            <div className="glass hover-premium-card" style={{ padding: '32px', borderRadius: '16px', borderTop: '4px solid var(--atp-blue)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--atp-blue)', opacity: 0.15, marginBottom: '4px', lineHeight: 1, letterSpacing: '-0.05em' }}>03</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Valoriser l'Ancrage</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nous promouvons l'attractivité de la zone Porte Nord pour attirer de nouveaux talents, investisseurs et partenaires stratégiques.</p>
            </div>
          </div>

          <div className="feature-row" style={{ gap: '60px', flexWrap: 'wrap' }}>
            <div className="feature-image-side" style={{ borderRadius: '1rem', display: 'flex', alignItems: 'center' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-premium)', width: '100%', background: '#1a2332', position: 'relative' }}>
                <VideoFrame url={content.home?.matinalesVideoUrl} />
              </div>
            </div>
            <div className="feature-content-side">
              <span style={{ color: 'var(--atp-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Co-construction</span>
              <h3 style={{ marginTop: '6px', fontSize: '1.8rem', color: 'var(--atp-blue)' }}>Les Matinales Économiques</h3>
              <p style={{ marginBottom: '16px', fontSize: '0.95rem', lineHeight: 1.7 }}>Plus qu'un simple petit-déjeuner, nos matinales sont des séances de travail stratégiques. Elles permettent aux chefs d'entreprise de dialoguer directement avec les élus de Maxéville, de la Métropole du Grand Nancy et de la Région Grand Est.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--atp-blue)', marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.88rem' }}><strong>Influence directe</strong> sur les projets de voirie, accessibilité et signalétique de la zone.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--atp-blue)', marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.88rem' }}><strong>Veille réglementaire & fiscale</strong> partagée entre entreprises et experts.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--atp-blue)', marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.88rem' }}><strong>Thématiques variées</strong> : cyber-sécurité, transition écologique, développement international.</p>
                </div>
              </div>
              <Link to="/actions/matinales" className="btn btn-blue">Découvrir le format</Link>
            </div>
          </div>

          <div className="feature-row" style={{ flexDirection: 'row-reverse' as any, gap: '60px', flexWrap: 'wrap' }}>
            <div className="feature-image-side" style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-premium)', width: '100%', background: '#1a2332', position: 'relative' }}>
                {content.home?.emploiVideoUrl ? (
                  <VideoFrame url={content.home.emploiVideoUrl} />
                ) : (
                  <img
                    src="/atp_meeting_saber_bouzaza_1773754342527.png"
                    alt="Forum Emploi ATP"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                  />
                )}
              </div>
            </div>
            <div className="feature-content-side">
              <span style={{ color: 'var(--atp-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Capital Humain</span>
              <h3 style={{ marginTop: '8px', fontSize: '1.8rem', color: 'var(--atp-blue)' }}>Objectif Emploi & Alternance</h3>
              <p style={{ marginBottom: '16px', fontSize: '0.95rem', lineHeight: 1.7 }}>Le dynamisme d'un territoire se mesure à sa capacité à intégrer la jeunesse et les compétences locales. Nos initiatives forum, job dating et networking sont le rendez-vous incontournable du recrutement de proximité.</p>
              <p style={{ marginBottom: '24px', fontStyle: 'italic', fontSize: '0.88rem', borderLeft: '3px solid var(--atp-red)', paddingLeft: '16px', color: 'var(--text-muted)' }}>
                "Chaque année, notre Forum Emploi & Alternance met en relation directe les entreprises membres avec des centaines de candidats — demandeurs d'emploi, lycéens et alternants du Grand Nancy."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/actions/forum" className="btn btn-blue">Consulter l'agenda</Link>
                <img src="https://upload.wikimedia.org/wikipedia/fr/0/07/Logo_R%C3%A9gion_Grand_Est_2016.svg" alt="Région Grand Est" style={{ height: '28px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Besoin de visibilité sur la zone ?</h2>
          <p style={{ marginTop: '12px', marginBottom: '32px', color: 'var(--text-muted)' }}>Intégrez l'annuaire de référence de Nancy Porte Nord et développez vos synergies locales.</p>
          <Link to="/directory" className="btn btn-blue">Consulter l'annuaire</Link>
        </div>
      </section>
    </>
  );
};

const AboutPage = () => {
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

const DirectoryPage = () => {
  const { content } = useContent();
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('Toutes les zones');
  const [selectedSector, setSelectedSector] = useState('Tous les secteurs');
  const [filterJobs, setFilterJobs] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  const zones = ['Toutes les zones', 'Zone Lafayette', 'Zone Prouvé', 'Zone Fruchard', 'Zone Saint-Jacques', 'Nancy Métropole'];
  const sectors = ['Tous les secteurs', 'Industrie', 'BTP', 'Services Pro', 'Formation / RH', 'Commerce / Logistique', 'Institutionnel', 'Services à la personne'];

  const allCompanies = content.directory?.companies || [];
  const filtered = allCompanies.filter((c: any) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesZone = selectedZone === 'Toutes les zones' || c.zone === selectedZone;
    const matchesSector = selectedSector === 'Tous les secteurs' || c.sector === selectedSector;
    const matchesJobs = !filterJobs || (c.jobOffers && c.jobOffers.length > 0);
    return matchesSearch && matchesZone && matchesSector && matchesJobs;
  });
  const displayed = filtered.slice(0, visibleCount);

  const jobsCount = allCompanies.reduce((acc: number, c: any) => acc + (c.jobOffers?.length || 0), 0);

  return (
    <div className="page-root container" style={{ paddingTop: '130px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="section-subtitle-small">BASE DE DONNÉES TERRITORIALE</span>
            <h2 style={{ marginTop: '6px' }}>Annuaire des Entreprises de la Zone Porte Nord</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '8px 22px', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>
              {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
            </div>
            <button onClick={() => setViewMode('grid')} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb', background: viewMode === 'grid' ? 'var(--atp-blue)' : 'white', color: viewMode === 'grid' ? 'white' : 'var(--text-muted)', cursor: 'pointer' }}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setViewMode('list')} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb', background: viewMode === 'list' ? 'var(--atp-blue)' : 'white', color: viewMode === 'list' ? 'white' : 'var(--text-muted)', cursor: 'pointer' }}>
              <List size={16} />
            </button>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', border: '1px solid #7dd3fc', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={16} style={{ color: 'var(--atp-blue)' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--atp-blue)' }}>{allCompanies.length} Entreprises adhérentes</span>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: '1px solid #6ee7b7', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={16} style={{ color: '#059669' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#064e3b' }}>{jobsCount} Offres d'emploi actives</span>
          </div>
          <div style={{ marginTop: '0px' }}>
            <a href={content.directory?.guidePdf || '#'} target={content.directory?.guidePdf ? "_blank" : undefined} rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', border: '1px solid #f9a8d4', padding: '10px 20px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: '0.2s', cursor: 'pointer', color: '#831843', fontWeight: 700 }} className="hover-scale" onClick={(e) => { if (!content.directory?.guidePdf) { e.preventDefault(); alert('Document en cours de préparation.'); } }}>
              <Download size={16} color="#831843" />
              Télécharger le Guide des Entreprises
            </a>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', marginTop: '16px', maxWidth: '48rem', lineHeight: 1.7 }}>Explorez le réseau ATP Nancy Porte Nord. Sur 178 hectares et plus de 1 300 emplois (zones Lafayette, Prouvé, Fruchard à Maxéville), découvrez la diversité et la force économique de notre territoire.</p>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginBottom: '48px', background: 'rgba(255,255,255,0.9)' }}>
        <div style={{ display: 'flex', gap: '14px', padding: '14px 20px', background: 'white', borderRadius: '14px', border: '1px solid #e5e7eb', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <Search style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={22} />
          <input type="text" placeholder="Rechercher par nom, activité ou description..." style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontWeight: 600, color: 'var(--charcoal-gray)', fontSize: '0.95rem' }} value={search} onChange={(e) => { setSearch(e.target.value); setVisibleCount(12); }} />
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>Localisation</label>
            <select style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.88rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedZone} onChange={(e) => { setSelectedZone(e.target.value); setVisibleCount(12); }}>
              {zones.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>Secteur d'Activité</label>
            <select style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.88rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedSector} onChange={(e) => { setSelectedSector(e.target.value); setVisibleCount(12); }}>
              {sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button
            onClick={() => { setFilterJobs(!filterJobs); setVisibleCount(12); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', border: `2px solid ${filterJobs ? '#059669' : '#e5e7eb'}`, borderRadius: '10px', background: filterJobs ? '#d1fae5' : 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, color: filterJobs ? '#064e3b' : 'var(--text-muted)', transition: 'all 0.2s' }}>
            <Briefcase size={15} style={{ color: filterJobs ? '#059669' : 'var(--text-muted)' }} />
            Avec offres d'emploi
          </button>
          <button style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--atp-red)', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', textDecoration: 'underline' }} onClick={() => { setSearch(''); setSelectedZone('Toutes les zones'); setSelectedSector('Tous les secteurs'); setFilterJobs(false); setVisibleCount(12); }}>
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      {displayed.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {displayed.map((c: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: (Math.min(i, 11) % 12) * 0.04 }} style={{ padding: '28px', borderRadius: '24px', position: 'relative', overflow: 'hidden', background: 'white', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.logo ? <img src={c.logo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <Building2 style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={24} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--atp-red)', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(196,43,46,0.07)', padding: '5px 12px', borderRadius: '999px' }}>{c.sector}</span>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--atp-blue)', fontWeight: 800, marginBottom: '10px' }}>{c.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px', minHeight: '2.6rem' }}>{c.description}</p>
                  {c.jobOffers && c.jobOffers.length > 0 && (
                    <div style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)', borderRadius: '10px', padding: '8px 12px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Briefcase size={13} style={{ color: '#059669' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>{c.jobOffers.length} offre{c.jobOffers.length > 1 ? 's' : ''} d'emploi</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: 'var(--atp-red)' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--charcoal-gray)' }}>{c.zone}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {displayed.map((c: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                  style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--light-gray)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--atp-blue)', margin: 0 }}>{c.name}</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.zone}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--atp-red)', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(196,43,46,0.07)', padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{c.sector}</span>
                    {c.jobOffers && c.jobOffers.length > 0 && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)', padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{c.jobOffers.length} offre{c.jobOffers.length > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {visibleCount < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <button className="btn btn-blue" style={{ padding: '14px 40px', fontSize: '0.9rem', borderRadius: '999px' }} onClick={() => setVisibleCount(v => v + 12)}>
                Afficher plus d'entreprises ({filtered.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--light-gray)', borderRadius: '24px', marginTop: '32px', border: '2px dashed #d1d5db' }}>
          <Search size={50} style={{ margin: '0 auto 20px', color: 'var(--text-muted)', opacity: 0.15, display: 'block' }} />
          <h3 style={{ fontWeight: 800, color: 'var(--charcoal-gray)' }}>Aucun membre ne correspond</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px', maxWidth: '360px', margin: '10px auto 0' }}>Vérifiez l'orthographe ou élargissez vos filtres.</p>
          <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => { setSearch(''); setSelectedZone('Toutes les zones'); setSelectedSector('Tous les secteurs'); setFilterJobs(false); setVisibleCount(12); }}>Réinitialiser les filtres</button>
        </div>
      )}

      <div style={{ marginTop: '80px', padding: '50px', background: 'linear-gradient(135deg, var(--atp-blue) 0%, var(--atp-blue-light) 100%)', borderRadius: '28px', color: 'white', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div>
          <h3 style={{ color: 'white', fontSize: '1.6rem' }}>Votre entreprise n'est pas encore listée ?</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginTop: '8px' }}>Rejoignez le réseau le plus dynamique du Grand Nancy et bénéficiez d'une visibilité accrue auprès des décideurs locaux et régionaux.</p>
        </div>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" className="btn" style={{ background: 'white', color: 'var(--atp-blue)', fontWeight: 800 }}>Adhérer à l'ATP</a>
          <Link to="/contact" className="btn btn-primary">Nous contacter →</Link>
        </div>
      </div>
    </div>
  );
};


const AgendaPage = () => {
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

// --- ACTION PAGES (MASSIVELY ENRICHED) ---

const ActionMatinalesPage = () => {
  const { content } = useContent();
  const data = content.actions.matinales;

  const topics = [
    { icon: <Shield size={22} />, title: "Cyber-sécurité", desc: "Protection des PME face aux risques numériques croissants" },
    { icon: <MapPin size={22} />, title: "Aménagement & Mobilité", desc: "Voirie, signalétique, accessibilité et transport de la zone" },
    { icon: <TrendingUp size={22} />, title: "Développement Économique", desc: "Aides publiques, dispositifs France 2030 et opportunités d'expansion" },
    { icon: <Globe size={22} />, title: "Relations Institutionnelles", desc: "Dialogue direct avec élus, Métropole, Région et Préfecture" },
    { icon: <Users size={22} />, title: "Ressources Humaines", desc: "Recrutement, alternance, formation et GPEC territoriale" },
    { icon: <Zap size={22} />, title: "Transition & Innovation", desc: "Mutation industrielle, énergie verte et transformation digitale" },
  ];

  const recentMatinales = [
    { period: "2025", title: "La Cyber-sécurité en Entreprise", partner: "Expert cyber & ANSSI", desc: "Atelier opérationnel sur la protection des systèmes informatiques des PME de la zone. Sensibilisation aux risques et bonnes pratiques." },
    { period: "2025", title: "Matinale avec Lorr'up & son Directeur", partner: "Lorr'up — Agence de développement économique Nancy Sud Lorraine", desc: "Rencontre approfondie pour explorer les dispositifs d'accompagnement territorial, les aides à l'implantation et les projets de développement économique." },
    { period: "2025", title: "Matinale de Rentrée", partner: "Réseau ATP Porte Nord", desc: "Bilan complet de l'année passée et présentation de la feuille de route 2025-2026. Moment d'échange entre adhérents sur les priorités de l'association." },
    { period: "2025", title: "Réunion Acteurs Économiques de la Métropole", partner: "Métropole du Grand Nancy", desc: "Concertation élargie avec l'ensemble des acteurs économiques métropolitains sur les projets structurants d'aménagement et de développement territorial." },
    { period: "2024", title: "Développement & Aménagement du Territoire", partner: "Élus locaux et régionaux", desc: "Matinale dédiée aux grands projets d'infrastructure du secteur nord : voirie, zones logistiques et perspectives d'attractivité 2024-2026." },
    { period: "2024", title: "Petits Déjeuners Entrepreneurs", partner: "Réseau ATP Porte Nord", desc: "Série de rencontres informelles entre chefs d'entreprise de la zone. Networking de qualité et partage d'expertises dans un cadre convivial." },
  ];

  const partners = [
    { name: "Métropole du Grand Nancy", role: "Partenaire institutionnel" },
    { name: "Ville de Maxéville", role: "Collectivité hôte" },
    { name: "Préfecture de Meurthe-et-Moselle", role: "Institution d'État" },
    { name: "Région Grand Est", role: "Partenaire régional" },
    { name: "Lorr'up", role: "Agence de développement économique" },
    { name: "CCI Métropole Grand Nancy", role: "Chambre consulaire" },
  ];

  return (
    <div className="page-root">
      <div style={{ background: 'var(--charcoal-gray)', color: 'white', padding: '100px 0 60px', backgroundImage: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>ACTIONS ATP — DIALOGUE & GOUVERNANCE</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', lineHeight: 1.7, marginTop: '14px', fontSize: '1.02rem' }}>Le format trimestriel qui place les entrepreneurs au cœur des décisions locales.</p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '28px 0' }}>
        <div className="container" style={{ padding: '0 40px', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
          {[
            { val: '4×/an', label: 'Fréquence trimestrielle' },
            { val: '20+', label: 'Partenaires institutionnels' },
            { val: '17+', label: 'Années d\'éditions' },
            { val: '100%', label: 'Gratuit pour les adhérents' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 160px', textAlign: 'center', padding: '12px 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <strong style={{ fontSize: '1.8rem', display: 'block', color: 'white' }}>{s.val}</strong>
              <span style={{ fontSize: '0.75rem', opacity: 0.75, fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <span className="section-subtitle-small">LE FORMAT</span>
            <h2 style={{ marginTop: '8px', marginBottom: '20px' }}>{data.subtitle}</h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '20px' }}>{data.intro}</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '28px' }}>Chaque matinale accueille entre 20 et 40 participants — chefs d'entreprise membres de l'ATP et invités institutionnels — autour d'un petit-déjeuner de travail. Le format est délibérément informel pour faciliter les échanges authentiques, mais s'appuie sur une préparation rigoureuse des thématiques par le bureau de l'ATP.</p>
            <div style={{ background: 'var(--light-gray)', padding: '20px 24px', borderRadius: '14px', borderLeft: '4px solid var(--atp-red)' }}>
              <p style={{ fontWeight: 700, color: 'var(--atp-blue)', fontSize: '0.9rem' }}>Prochaine matinale</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>La date de la prochaine matinale sera communiquée aux adhérents par email et sur notre page agenda. Rejoignez l'ATP pour ne rien manquer.</p>
            </div>
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.12)', width: '100%', aspectRatio: '16/9', background: '#0f172a', display: 'flex', alignItems: 'center' }}>
            <VideoFrame url={content.home?.matinalesVideoUrl} />
          </div>
        </div>

        {/* Topics */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">AU PROGRAMME</span>
            <h2 style={{ marginTop: '8px' }}>Les thématiques abordées</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {topics.map((t, i) => (
              <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'flex-start', transition: 'box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '44px', height: '44px', background: i % 2 === 0 ? 'rgba(0,58,92,0.08)' : 'rgba(196,43,46,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: i % 2 === 0 ? 'var(--atp-blue)' : 'var(--atp-red)' }}>{t.icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px' }}>{t.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent matinales */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">HISTORIQUE</span>
            <h2 style={{ marginTop: '8px' }}>Nos dernières matinales</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentMatinales.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', gap: '24px', background: 'white', padding: '24px 28px', borderRadius: '16px', border: '1px solid #e5e7eb', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--light-gray)', padding: '8px 16px', borderRadius: '8px', fontWeight: 900, fontSize: '0.8rem', color: 'var(--atp-blue)', whiteSpace: 'nowrap', minWidth: '60px', textAlign: 'center' }}>{m.period}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 800, color: 'var(--charcoal-gray)', marginBottom: '4px', fontSize: '1rem' }}>{m.title}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--atp-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.partner}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '6px' }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '48px', marginBottom: '60px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--atp-blue)' }}>Nos partenaires institutionnels</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {partners.map((p, i) => (
              <div key={i} style={{ background: 'white', padding: '18px 20px', borderRadius: '14px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--atp-blue)', display: 'block' }}>{p.name}</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{p.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'var(--atp-blue)', color: 'white', padding: '50px 40px', borderRadius: '24px' }}>
          <h3 style={{ color: 'white', fontSize: '1.6rem', marginBottom: '12px' }}>Participez à la prochaine matinale</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '28px' }}>Les matinales sont réservées aux membres de l'ATP. Adhérez pour accéder à nos événements trimestriels.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" className="btn" style={{ background: 'white', color: 'var(--atp-blue)', fontWeight: 800 }}>Adhérer à l'ATP 2026</a>
            <Link to="/agenda" className="btn btn-primary">Consulter l'agenda</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionForumPage = () => {
  const { content } = useContent();
  const data = content.actions.forum;

  const initiatives = [
    {
      icon: <Briefcase size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
      title: "Forum Emploi de la Ville de Maxéville",
      desc: "Participation active et co-organisation du forum emploi annuel de Maxéville (2024, 2025). Mobilisation des entreprises membres pour accueillir des candidats locaux et présenter leurs offres d'emploi et d'alternance.",
      badge: "Récurrent"
    },
    {
      icon: <Target size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
      title: "Un Véhicule pour l'Emploi",
      desc: "Programme innovant mettant à disposition un véhicule pour faciliter la mobilité des demandeurs d'emploi de la zone, levant l'un des principaux freins à l'accès au travail pour les habitants des quartiers prioritaires.",
      badge: "2025"
    },
    {
      icon: <Star size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
      title: "L'Union Fait la Force",
      desc: "Le 23 mai 2025, à la Maison Régionale des Sports de Tomblaine, l'ATP a co-organisé un événement majeur de mobilisation emploi en présence de l'ensemble des institutions locales : Préfecture, Métropole, France Travail, acteurs de l'insertion.",
      badge: "Mai 2025"
    },
    {
      icon: <Handshake size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
      title: "Job Dating & Networking",
      desc: "Organisation de job datings dans nos locaux en collaboration avec les entreprises membres. Format accéléré permettant à des dizaines de candidats de rencontrer leurs futurs recruteurs en une seule matinée.",
      badge: "Régulier"
    },
    {
      icon: <Users size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
      title: "After-Work à Vida Padel",
      desc: "Événements de networking informel organisés en soirée au centre Vida Padel de Maxéville. Moment convivial pour renforcer les liens entre adhérents et accueillir de nouveaux membres dans une ambiance détendue.",
      badge: "2025"
    },
    {
      icon: <AlertCircle size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
      title: "Recrutement Alternant ATP",
      desc: "L'ATP accueille régulièrement des alternants dans sa structure pour développer les compétences des jeunes du territoire. En 2025, un job dating spécifique a été organisé en raison d'un afflux important de candidatures.",
      badge: "En cours"
    },
  ];

  const upcoming = [
    { title: "L'Union Fait la Force II", desc: "La suite du succès de 2025 — un événement encore plus ambitieux en préparation avec de nouveaux partenaires institutionnels.", status: "En préparation" },
    { title: "Braderie du Zénith", desc: "En partenariat avec les Marchés de France, une braderie professionnelle d'envergure au complexe du Zénith de Nancy.", status: "En cours" },
    { title: "Forum Économique des Banlieues — Paris", desc: "Déplacement de la délégation ATP au Forum Économique national. Représentation du territoire et nouvelles alliances stratégiques.", status: "Fin 2026" },
  ];

  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-red)', color: 'white', padding: '100px 0 60px', backgroundImage: `linear-gradient(rgba(140,30,35,0.85), rgba(140,30,35,0.85)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>EMPLOI & COMPÉTENCES</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.7, marginTop: '14px', fontSize: '1.02rem' }}>Mettre en relation les entreprises de la zone avec les talents du territoire — c'est notre engagement depuis 2006.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        {/* Intro */}
        <div style={{ maxWidth: '760px', margin: '0 auto 70px', textAlign: 'center' }}>
          <span className="section-subtitle-small">NOTRE ENGAGEMENT</span>
          <h2 style={{ marginTop: '8px', marginBottom: '20px' }}>{data.subtitle}</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{data.intro}</p>
        </div>

        {/* Initiatives grid */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">NOS INITIATIVES EMPLOI</span>
            <h2 style={{ marginTop: '8px' }}>Des actions concrètes pour le territoire</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {initiatives.map((init, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', background: init.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: init.color }}>{init.icon}</div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, background: init.color, color: 'white', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{init.badge}</span>
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '10px', fontSize: '1.02rem' }}>{init.title}</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{init.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured event: L'union fait la force */}
        <div style={{ background: 'var(--anthracite)', color: 'white', borderRadius: '24px', padding: '50px', marginBottom: '80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(196,43,46,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center', position: 'relative' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--atp-red)', display: 'block', marginBottom: '12px' }}>ÉVÉNEMENT PHARE — 23 MAI 2025</span>
              <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: 900, marginBottom: '16px' }}>L'Union Fait la Force</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '20px' }}>
                L'ATP Nancy Porte Nord a fédéré l'ensemble des acteurs économiques et institutionnels du territoire lors de cet événement majeur tenu à la <strong style={{ color: 'white' }}>Maison Régionale des Sports de Tomblaine</strong>.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75 }}>
                En présence de la Préfecture de Meurthe-et-Moselle, de la Métropole du Grand Nancy, de France Travail et des structures d'insertion, cette journée a démontré que le collectif est le moteur le plus puissant du développement territorial.
              </p>
            </div>
            <div style={{ flex: '0 0 260px' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: '28px' }}>
                {[
                  'Préfecture de Meurthe-et-Moselle',
                  'Métropole du Grand Nancy',
                  'France Travail',
                  'Structures d\'insertion partenaires',
                  'Entreprises membres ATP'
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 4 ? '12px' : 0 }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--atp-red)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-subtitle-small">À VENIR</span>
            <h2 style={{ marginTop: '8px' }}>Projets en cours de préparation</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {upcoming.map((u, i) => (
              <div key={i} style={{ background: 'var(--light-gray)', padding: '28px', borderRadius: '18px', borderLeft: '4px solid var(--atp-red)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <ChevronRight size={18} style={{ color: 'var(--atp-red)' }} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--atp-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(0,58,92,0.1)', padding: '3px 10px', borderRadius: '999px' }}>{u.status}</span>
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '10px' }}>{u.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner */}
        <div style={{ background: 'var(--light-gray)', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--atp-blue)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '16px' }}>Partenaire institutionnel</h4>
          <img src="https://upload.wikimedia.org/wikipedia/fr/0/07/Logo_R%C3%A9gion_Grand_Est_2016.svg" alt="Région Grand Est" style={{ height: '44px', margin: '0 auto 12px', display: 'block' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>L'ATP Nancy Porte Nord agit en partenariat avec la Région Grand Est dans le cadre des politiques d'emploi et de formation professionnelle du territoire.</p>
        </div>
      </div>
    </div>
  );
};

const ActionInsertionPage = () => {
  const { content } = useContent();
  const data = content.actions.insertion;

  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '100px 0 60px', textAlign: 'center', backgroundImage: `linear-gradient(rgba(0,51,80,0.88), rgba(0,51,80,0.88)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>RSE & SOLIDARITÉ TERRITORIALE</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '540px', lineHeight: 1.7, marginTop: '14px', margin: '14px auto 0', fontSize: '1.02rem' }}>Notre conviction : une zone économique performante est une zone inclusive, solidaire et responsable.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        {/* Flagship project: RSA / CD54 */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ background: 'linear-gradient(135deg, var(--atp-blue) 0%, var(--atp-blue-light) 100%)', color: 'white', borderRadius: '28px', padding: '50px', marginBottom: '70px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '280px', height: '280px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '320px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '7px 16px', borderRadius: '999px', marginBottom: '20px' }}>
                <Star size={14} style={{ color: '#fbbf24' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Projet phare — Lancé en avril 2026</span>
              </div>
              <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 900, marginBottom: '16px', lineHeight: 1.2 }}>
                Co-portage RSA :<br />Insertion Professionnelle & CD54
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: '20px', fontSize: '1rem' }}>
                Depuis avril 2026, l'ATP Nancy Porte Nord co-porte un projet ambitieux avec le <strong style={{ color: 'white' }}>Conseil Départemental de Meurthe-et-Moselle (CD54)</strong> visant l'insertion professionnelle durable des allocataires du RSA.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                Ce dispositif cible spécifiquement trois profils particulièrement éloignés du marché du travail : les <strong style={{ color: 'white' }}>allocataires RSA sans activité</strong>, les <strong style={{ color: 'white' }}>travailleurs indépendants en difficulté</strong> et les <strong style={{ color: 'white' }}>alternants</strong>. L'ATP apporte son réseau d'entreprises membres pour créer des passerelles directes entre ces publics et les opportunités concrètes d'emploi présentes sur la zone Porte Nord.
              </p>
            </div>
            <div style={{ flex: '0 0 280px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px' }}>
                <h4 style={{ color: 'white', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', fontWeight: 800 }}>Publics ciblés</h4>
                {[
                  { label: 'Allocataires RSA sans activité', icon: <UserCheck size={16} /> },
                  { label: 'Travailleurs indépendants en difficulté', icon: <Briefcase size={16} /> },
                  { label: 'Alternants en recherche d\'emploi', icon: <FileText size={16} /> },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < 2 ? '14px' : 0, background: 'rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: '10px' }}>
                    <span style={{ color: '#fbbf24' }}>{p.icon}</span>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{p.label}</span>
                  </div>
                ))}
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>En partenariat avec</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', textAlign: 'center', marginTop: '4px' }}>Conseil Départemental 54</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '760px', margin: '0 auto 70px', textAlign: 'center' }}>{data.intro}</p>

        {/* Other initiatives */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">NOS AUTRES ENGAGEMENTS</span>
            <h2 style={{ marginTop: '8px' }}>Solidarité & Inclusion au quotidien</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: <Heart size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
                title: "Solidarité Maroc — École de Marrakech",
                badge: "Janvier 2024",
                desc: "Action de solidarité internationale : financement de la construction d'une école pour un village sinistré à Marrakech, à hauteur de 6 000 euros. Un engagement humain fort de l'ATP et de ses adhérents au-delà des frontières."
              },
              {
                icon: <Users size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
                title: "Accueil de Stagiaires",
                badge: "Annuel",
                desc: "L'ATP accueille des stagiaires tout au long de l'année dans sa structure et encourage ses entreprises membres à faire de même. Un engagement continu pour permettre aux jeunes du territoire de découvrir le monde professionnel."
              },
              {
                icon: <Handshake size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
                title: "Participation aux Réunions GLPE",
                badge: "Régulier",
                desc: "L'ATP participe régulièrement aux Groupements Locaux de Prévention de l'Exclusion (GLPE) pour coordonner les actions d'insertion avec l'ensemble des partenaires institutionnels et associatifs du territoire."
              },
              {
                icon: <Shield size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
                title: "Loi Handicap — Réunion Préfecture 54",
                badge: "2025",
                desc: "Participation à la réunion organisée par la Préfecture de Meurthe-et-Moselle dans le cadre des 20 ans de la loi handicap. L'ATP s'engage pour l'accessibilité et l'inclusion des personnes en situation de handicap dans le monde du travail."
              },
              {
                icon: <Globe size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
                title: "Solidarité Valence (Valencia)",
                badge: "2024",
                desc: "Mobilisation et collecte de solidarité en soutien aux victimes des inondations catastrophiques de Valencia (Espagne). Expression concrète de la solidarité internationale du réseau Porte Nord."
              },
              {
                icon: <TrendingUp size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
                title: "Développement International",
                badge: "En cours",
                desc: "Aide au développement économique à l'international pour les adhérents souhaitant exporter ou développer des partenariats transfrontaliers. Mise en réseau avec les organismes d'appui à l'export."
              },
            ].map((init, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', background: init.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: init.color }}>{init.icon}</div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, background: init.color, color: 'white', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{init.badge}</span>
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '10px', fontSize: '0.98rem' }}>{init.title}</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{init.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '40px 48px', display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ color: 'var(--atp-blue)', fontSize: '1.4rem', marginBottom: '8px' }}>Vous souhaitez vous impliquer ?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Que vous soyez entrepreneur, institution ou structure d'insertion — rejoignons-nous pour agir ensemble.</p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">Nous contacter</Link>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" className="btn btn-blue">Adhérer à l'ATP</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionLabelPage = () => {
  const { content } = useContent();
  const data = content.actions.label;

  const criteria = [
    { icon: <Handshake size={20} />, title: "Engagement de synergie", desc: "Participer activement aux événements et initiatives de l'ATP au moins 2 fois par an." },
    { icon: <Heart size={20} />, title: "Respect mutuel", desc: "Adhérer aux valeurs de l'association : solidarité, proximité, bienveillance et professionnalisme." },
    { icon: <Globe size={20} />, title: "Implication locale", desc: "Contribuer au développement économique local et à l'attractivité de la zone Porte Nord." },
    { icon: <TrendingUp size={20} />, title: "Cotisation à jour", desc: "Être adhérent à jour de cotisation pour l'exercice en cours." },
  ];

  const benefits = [
    "Présence dans l'annuaire officiel de l'ATP Nancy Porte Nord",
    "Visibilité sur les supports de communication de l'association",
    "Accès prioritaire aux événements institutionnels",
    "Mise en avant lors des matinales économiques",
    "Réseau premium d'entreprises engagées",
    "Participation aux appels d'offres collectifs",
    "Droit d'afficher le label dans vos locaux et supports",
    "Accès aux données veille économique territoriale",
  ];

  return (
    <div className="page-root">
      <div style={{ background: 'var(--charcoal-gray)', color: 'white', padding: '100px 0 60px', textAlign: 'center', backgroundImage: `linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>QUALITÉ & RÉSEAU</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.7, marginTop: '14px', margin: '14px auto 0', fontSize: '1.02rem' }}>Un engagement. Une distinction. Une communauté.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto 70px', textAlign: 'center' }}>
          <Award style={{ margin: '0 auto 20px', color: 'var(--atp-red)', display: 'block' }} size={52} />
          <h2 style={{ marginBottom: '16px' }}>{data.subtitle}</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{data.intro}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '70px' }}>
          <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '40px' }}>
            <h3 style={{ color: 'var(--atp-blue)', marginBottom: '28px', fontSize: '1.3rem' }}>Critères d'obtention</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {criteria.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--atp-blue)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>{c.icon}</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--charcoal-gray)', display: 'block', marginBottom: '3px' }}>{c.title}</strong>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--atp-blue)', borderRadius: '24px', padding: '40px' }}>
            <h3 style={{ color: 'white', marginBottom: '28px', fontSize: '1.3rem' }}>Vos avantages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--atp-red)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', background: 'var(--light-gray)', borderRadius: '20px', padding: '44px' }}>
          <h3 style={{ marginBottom: '8px', color: 'var(--atp-blue)' }}>Obtenir le label 2026</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>Adhesión active + engagement territorial + cotisation à jour = Label Entreprise Engagée Porte Nord</p>
          <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '14px 32px' }}>Adhérer & obtenir mon label 2026</a>
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
              <Link to="/anniversary/timeline" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 28px' }}>
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
          <Link to="/anniversary/timeline" className="btn btn-blue" style={{ padding: '14px 36px', fontSize: '0.95rem' }}>Découvrir toute l'histoire de l'ATP →</Link>
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

const OrgChartPage = () => {
  const bureauMembers = [
    { name: 'M. Jabar OUMEDDOUR', role: 'Tresorier', roleLabel: 'Trésorier', desc: 'Gestion financière, budget associatif et suivi des cotisations', color: 'var(--atp-red)' },
    { name: 'M. Romain BAYETTE', role: 'Secretaire', roleLabel: 'Secrétaire', desc: 'Administration, comptes-rendus et communication officielle', color: 'var(--atp-blue)' },
  ];
  const comiteMembers = [
    'M. Michel SILVA', 'M. Marc BELLANGER', 'Me Sarah KRERBI',
    'M. Enrik LAFONTAINE', 'M. Stéphane DAL BORGO', 'Me Nassima BERHAILI',
    'M. Ilhan SEVIM', 'M. Zouheir DAOUDI', 'M. Renaud YONG', 'M. Rémy NAGEL',
  ];
  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '100px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div className="container" style={{ padding: '0 40px', position: 'relative' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>GOUVERNANCE</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginTop: '8px' }}>Organigramme de l'ATP</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '44rem', margin: '12px auto 0', lineHeight: 1.7, fontSize: '1rem' }}>
            L'ATP Nancy Porte Nord est gouvernée par un bureau et un comité élus démocratiquement lors de l'Assemblée Générale annuelle.
          </p>
        </div>
      </div>
      <div className="container" style={{ padding: '70px 40px' }}>

        {/* PRESIDENT */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <span className="section-subtitle-small">PRÉSIDENCE</span>
        </div>
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, var(--atp-blue) 0%, var(--atp-blue-light) 100%)', borderRadius: '22px', padding: '32px 28px', textAlign: 'center', color: 'white', boxShadow: '0 20px 50px rgba(0,58,92,0.28)' }}>
            <div style={{ width: '76px', height: '76px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.35)', margin: '0 auto 14px', overflow: 'hidden', background: 'rgba(255,255,255,0.12)' }}>
              <img src="https://media.licdn.com/dms/image/v2/D4E03AQHT26RwlmECtw/profile-displayphoto-crop_800_800/B4EZ13PtQEJcAI-/0/1775822099984?e=1777507200&v=beta&t=aoZMcAFRPp-Nv3tMu1zKvIJxm0vmQnxYD06d9wiqNhI" alt="Saber Bouzaza" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => { e.target.style.display = 'none'; }} />
            </div>
            <strong style={{ fontSize: '1.25rem', color: 'white', display: 'block' }}>M. Saber BOUZAZA</strong>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, display: 'block', marginTop: '4px' }}>Président</span>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginTop: '10px', lineHeight: 1.5 }}>Gouvernance stratégique · Représentation institutionnelle · Vision territoriale</p>
          </motion.div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '2px', height: '44px', background: 'linear-gradient(to bottom, var(--atp-blue), rgba(0,58,92,0.2))' }} />
        </div>

        {/* BUREAU */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span className="section-subtitle-small">BUREAU EXÉCUTIF</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', maxWidth: '680px', margin: '0 auto' }}>
          {bureauMembers.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '24px 22px', textAlign: 'center', borderTop: `3px solid ${b.color}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: b.color === 'var(--atp-red)' ? 'rgba(196,43,46,0.08)' : 'rgba(0,58,92,0.08)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} style={{ color: b.color }} />
              </div>
              <strong style={{ fontSize: '1rem', color: 'var(--charcoal-gray)', fontWeight: 800, display: 'block' }}>{b.name}</strong>
              <span style={{ fontSize: '0.68rem', color: b.color, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, display: 'block', marginTop: '4px' }}>{b.roleLabel}</span>
              <p style={{ fontSize: '0.77rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '10px' }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
          <div style={{ width: '2px', height: '44px', background: 'linear-gradient(to bottom, rgba(0,58,92,0.2), rgba(196,43,46,0.3))' }} />
        </div>

        {/* COMITE */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="section-subtitle-small">COMITÉ DE L'ASSOCIATION</span>
          <h3 style={{ marginTop: '6px', color: 'var(--atp-blue)', fontSize: '1.3rem' }}>Les 10 membres du Comité</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px', marginBottom: '60px' }}>
          {comiteMembers.map((name, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              style={{ background: 'var(--light-gray)', borderRadius: '14px', padding: '18px 16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: i % 2 === 0 ? 'rgba(0,58,92,0.1)' : 'rgba(196,43,46,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Users size={16} style={{ color: i % 2 === 0 ? 'var(--atp-blue)' : 'var(--atp-red)' }} />
              </div>
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--charcoal-gray)', fontWeight: 800, display: 'block', lineHeight: 1.3 }}>{name}</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Membre du Comité</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commissions */}
        <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '48px', marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-subtitle-small">ORGANISATION INTERNE</span>
            <h3 style={{ marginTop: '8px', color: 'var(--atp-blue)' }}>Commissions thématiques</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '38rem', margin: '8px auto 0', lineHeight: 1.6 }}>Groupes de travail opérationnels ouverts à tous les adhérents.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Commission Emploi, Insertion & Alternance', icon: <Briefcase size={20} />, color: 'var(--atp-red)', desc: 'Forums emploi, job dating, projet RSA/CD54, partenariats France Travail.' },
              { title: 'Commission Relations Institutionnelles', icon: <Handshake size={20} />, color: 'var(--atp-blue)', desc: 'Dialogue Préfecture, Métropole, Mairie, Région Grand Est, GLPE.' },
              { title: 'Commission Communication & Numérique', icon: <Globe size={20} />, color: 'var(--atp-red)', desc: 'Site internet, réseaux sociaux, annuaire et communication événementielle.' },
              { title: 'Commission Événements & Partenariats', icon: <Star size={20} />, color: 'var(--atp-blue)', desc: "Matinales, after-works, braderies et partenariats (Lorr'up, Marchés de France)." },
            ].map((c, i) => (
              <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start', border: '1px solid #e5e7eb' }}>
                <div style={{ width: '38px', height: '38px', background: c.color === 'var(--atp-red)' ? 'rgba(196,43,46,0.08)' : 'rgba(0,58,92,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '4px', lineHeight: 1.3 }}>{c.title}</h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(0,58,92,0.04)', border: '1px solid rgba(0,58,92,0.1)', borderRadius: '16px', padding: '24px 28px', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Bureau et comité sont élus lors de l'<strong>Assemblée Générale annuelle</strong>. L'adhésion est ouverte à toutes les entreprises de la zone Porte Nord.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-blue" style={{ fontSize: '0.82rem', padding: '9px 22px' }}>Nous contacter</Link>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '9px 22px' }}>Adhérer à l'ATP</a>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <Link to="/entreprises-premium" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 28px' }}>En savoir plus sur le Premium</Link>
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

const NotFoundPage = () => (
  <div className="page-root" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', background: 'var(--light-gray)' }}>
    <h1 style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: 900, color: 'var(--atp-red)', marginBottom: '16px', lineHeight: 1 }}>404</h1>
    <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--charcoal-gray)', marginBottom: '24px', fontWeight: 800 }}>Page Introuvable</h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem', maxWidth: '400px' }}>La page que vous recherchez n'existe pas, a été supprimée ou déplacée.</p>
    <Link to="/" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1rem', borderRadius: '12px' }}>
      Retour à l'accueil
    </Link>
  </div>
);

const LegalPage = ({ type }: { type: 'cgu' | 'cgv' | 'mentions' }) => {
  const { content } = useContent();
  const title = type === 'cgu' ? "Conditions Générales d'Utilisation" : type === 'cgv' ? "Conditions Générales de Vente" : "Mentions Légales";
  const defaultText = type === 'cgu' ? "En cours de rédaction." : type === 'cgv' ? "En cours de rédaction." : "Éditeur du site : ATP Nancy Porte Nord\nDirecteur de la publication : Saber Bouzaza\nHébergement : Supabase / Netlify";
  const bodyText = content?.legal?.[type] || defaultText;

  return (
    <div className="page-root">
      <div style={{ background: 'var(--charcoal-gray)', color: 'white', padding: '80px 0 60px', textAlign: 'center' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'var(--atp-red)' }}>JURIDIQUE</span>
          <h2 style={{ color: 'white', fontSize: '2rem', marginTop: '8px' }}>{title}</h2>
        </div>
      </div>
      <div className="container" style={{ padding: '60px 40px', maxWidth: '800px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', whiteSpace: 'pre-wrap', color: 'var(--charcoal-gray)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {bodyText}
        </div>
      </div>
    </div>
  );
};

const DynamicPopup = () => {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (content.popup?.enabled && location.pathname === '/') {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [content.popup?.enabled, location.pathname]);

  if (!isOpen || !content.popup?.enabled) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setIsOpen(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '100%', boxShadow: '0 25px 80px rgba(0,0,0,0.2)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.4)' }}>
            <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={16} />
            </button>
            <div style={{ width: '64px', height: '64px', background: 'rgba(196,43,46,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--atp-red)' }}>
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--atp-blue)', marginBottom: '16px' }}>{content.popup.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>{content.popup.message}</p>
            {content.popup.linkText && content.popup.linkUrl && (
              <Link to={content.popup.linkUrl} onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}>
                {content.popup.linkText}
              </Link>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PwaInstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    if (isIosDevice && !isStandalone) {
      setIsIos(true);
      setShowIosPrompt(true);
    }

    // Check for global deferredPrompt
    if ((window as any).deferredPrompt) {
      setInstallPromptEvent((window as any).deferredPrompt);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPromptEvent(e);
      (window as any).deferredPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Force show if we want to ensure visibility for debugging/UX
    const timer = setTimeout(() => {
        if((window as any).deferredPrompt) {
            setInstallPromptEvent((window as any).deferredPrompt);
        }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  if (!installPromptEvent && !showIosPrompt) return null;

  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pwa-prompt-container" style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ width: '48px', height: '48px', background: '#f5f7fa', borderRadius: '12px', padding: '5px', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <img src="/atp_logo_transparent.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1 }}>
        <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '2px', color: 'var(--charcoal-gray)' }}>Application ATP</strong>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1.3 }}>
          {isIos ? "Touchez l'icône Partage puis 'Sur l'écran d'accueil'" : "Installez l'app pour un accès rapide et hors-ligne."}
        </span>
      </div>
      
      {!isIos && (
        <button 
          onClick={() => {
            if (installPromptEvent) {
              installPromptEvent.prompt();
              installPromptEvent.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                  setInstallPromptEvent(null);
                  (window as any).deferredPrompt = null;
                }
              });
            }
          }} 
          style={{ background: 'var(--atp-red)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(196, 43, 46, 0.3)' }}
        >
          Installer
        </button>
      )}
      
      <button onClick={() => { setInstallPromptEvent(null); setShowIosPrompt(false); }} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
        <X size={18} />
      </button>
    </motion.div>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PWAPrompt />
      {!isAdmin && <Navbar />}
      {!isAdmin && <DynamicPopup />}
      {!isAdmin && <PwaInstallPrompt />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/president" element={<PresidentPage />} />
          <Route path="/organigramme" element={<OrgChartPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/actions" element={<HomePage />} />
          <Route path="/actions/matinales" element={<ActionMatinalesPage />} />
          <Route path="/actions/forum" element={<ActionForumPage />} />
          <Route path="/actions/insertion" element={<ActionInsertionPage />} />
          <Route path="/actions/label" element={<ActionLabelPage />} />
          <Route path="/offres-emploi" element={<AllJobOffersPage />} />
          <Route path="/adherent/login" element={<AdherentLogin />} />
          <Route path="/adherent-login" element={<AdherentLogin />} />
          <Route path="/adherent/dashboard" element={<AdherentDashboard />} />
          <Route path="/anniversary" element={<AnniversaryAgendaPage />} />
          <Route path="/anniversary/timeline" element={<TimelinePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cgu" element={<LegalPage type="cgu" />} />
          <Route path="/cgv" element={<LegalPage type="cgv" />} />
          <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}

      <style>{`
        .page-root { padding-top: var(--header-height); }
        .nav-content { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.5); }
        .section-subtitle-small { font-size: 0.68rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.18em; color: var(--atp-red); display: block; margin-bottom: 6px; }
        .mobile-nav-content { display: flex; flex-direction: column; gap: 24px; overflow-y: auto; }
        .hero-video-side { flex: 0 0 480px; max-width: 480px; }
        .hero-video-frame { width: 100%; aspect-ratio: 16/9; border-radius: 1.5rem; overflow: hidden; background: rgba(0,20,60,0.55); box-shadow: 0 30px 80px rgba(0,0,0,0.35); border: 2px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; position: relative; backdrop-filter: blur(10px); }
        .hero-video-frame iframe { width: 100%; height: 100%; border: none; }
        .video-placeholder-inner { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; }
        .video-play-btn { width: 80px; height: 80px; border-radius: 50%; background: rgba(196,43,46,0.8); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 14px rgba(196,43,46,0.15); cursor: pointer; transition: transform 0.2s; }
        .video-play-btn:hover { transform: scale(1.08); }
        .btn-sm { padding: 8px 18px; font-size: 0.78rem; }
        .btn-outline { background: transparent; border: 2px solid var(--atp-blue); color: var(--atp-blue); }
        .btn-outline:hover { background: var(--atp-blue); color: white; }
        
        .pwa-prompt-container {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 9999;
          background: var(--charcoal-gray);
          color: white;
          padding: 16px 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
        }

        @media (max-width: 1100px) { .hero-video-side { flex: 0 0 100%; max-width: 100%; margin-top: 40px; } }
        @media (max-width: 768px) {
          .container { padding: 0 20px; }
          .page-root .container { padding-left: 20px !important; padding-right: 20px !important; }
          .banner-img-wrapper { display: none; }
          .banner-text-wrapper { width: 100% !important; padding: 40px 28px !important; }
          .feature-row { flex-direction: column !important; gap: 30px !important; }
          div[style*="grid-template-columns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1.1fr 1fr"] { grid-template-columns: 1fr !important; }
          
          .pwa-prompt-container {
            left: 10px;
            right: 10px;
            bottom: 10px;
            border-radius: 12px;
          }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;