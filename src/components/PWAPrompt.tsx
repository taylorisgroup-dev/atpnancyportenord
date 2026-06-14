import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PWAPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            background: 'var(--atp-blue)',
            color: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '400px',
            margin: '0 auto',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <button 
            onClick={() => setShowPrompt(false)}
            style={{ position: 'absolute', top: '12px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', padding: '4px' }}
          >
            ✕
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/atp_logo_transparent.png" alt="ATP" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em' }}>ATP Nancy Porte Nord</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>Installez notre application pour un accès rapide et hors-ligne.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowPrompt(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                flex: 1,
                transition: 'background 0.2s'
              }}
            >
              Plus tard
            </button>
            <button
              onClick={handleInstallClick}
              style={{
                background: 'var(--atp-red)',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                flex: 1,
                transition: 'background 0.2s'
              }}
            >
              Installer
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
