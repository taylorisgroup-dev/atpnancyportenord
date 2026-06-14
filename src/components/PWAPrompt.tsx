import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export const PWAPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Ne pas afficher tout de suite si on ne veut pas spammer, mais ici on le force pour l'UX
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
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            maxWidth: '500px',
            margin: '0 auto'
          }}
        >
          <button 
            onClick={() => setShowPrompt(false)}
            style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
          >
            <X size={18} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/atp_logo_blue.png" alt="ATP" style={{ width: '50px', height: '50px', objectFit: 'contain', background: '#f5f7fa', borderRadius: '12px', padding: '5px' }} />
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#003a5c' }}>Application ATP</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', lineHeight: 1.3 }}>Installez l'application sur votre écran d'accueil pour un accès rapide et hors-ligne.</p>
            </div>
          </div>
          
          <button
            onClick={handleInstallClick}
            style={{
              background: '#c42b2e',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%'
            }}
          >
            <Download size={18} /> Installer l'application
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
