"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { PWAPrompt } from '../PWAPrompt';
import { Footer } from './Footer';
import { useContent } from '../../cms/ContentContext';

const NavItem = ({ title, href, subItems }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="nav-item-wrapper" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Link href={href} className="nav-link">{title} {subItems && <ChevronDown size={12} />}</Link>
      <AnimatePresence>
        {isOpen && subItems && (
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="submenu" transition={{ duration: 0.2 }}>
            {subItems.map((item: any, i: number) => (
              <Link key={i} href={item.href} className="submenu-link" onClick={() => setIsOpen(false)}>{item.title}</Link>
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
  const pathname = usePathname();
  const { content } = useContent();

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
        <Link href="/" className="logo">
          <img src="/atp_logo_transparent.png" alt="ATP Nancy Porte Nord" className="logo-img" />
        </Link>
        <div className="desktop-menu">
          {menuItems.map((item, i) => (<NavItem key={i} title={item.title} href={item.href} subItems={item.subItems} />))}
          <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ marginLeft: '10px' }}>ADHÉRER 2026</a>
        </div>
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={32} style={{ color: 'white' }} />
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
                      <Link key={si} href={s.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{s.title}</Link>
                    ))}
                  </div>
                </div>
              ))}
              <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setMobileMenuOpen(false)}>ADHÉRER 2026</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DynamicPopup = () => {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (content.popup?.enabled && pathname === '/') {
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(10px)' }} onClick={() => setIsOpen(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} style={{ position: 'relative', background: 'white', borderRadius: '16px', padding: '40px', maxWidth: '520px', width: '100%', boxShadow: '0 25px 80px rgba(0,0,0,0.3)', textAlign: 'center', borderTop: '4px solid var(--atp-red)' }}>
            <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', padding: '8px' }}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--anthracite)', marginBottom: '20px', marginTop: '10px' }}>{content.popup.title}</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '35px' }}>{content.popup.message}</p>
            {content.popup.linkText && content.popup.linkUrl && (
              <Link href={content.popup.linkUrl} onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.05rem', borderRadius: '50px' }}>
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
        <img src="/atp_logo_new.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
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

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') || false;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PWAPrompt />
      {!isAdmin && <Navbar />}
      {!isAdmin && <DynamicPopup />}
      {!isAdmin && <PwaInstallPrompt />}
      
      <div style={{ flex: 1 }}>
        {children}
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
