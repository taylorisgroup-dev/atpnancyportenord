import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';

const STORAGE_KEY = 'atp-cookie-consent';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return; // Already accepted or refused

    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (choice: 'accepted' | 'refused') => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  const buttonBase: React.CSSProperties = {
    padding: '10px 24px',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: '0.82rem',
    cursor: 'pointer',
    fontFamily: 'var(--font-primary)',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10000,
            padding: '20px 24px',
          }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              flexWrap: 'wrap',
              padding: '24px 32px',
              borderRadius: 16,
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.2)',
              color: '#fff',
            }}
          >
            <Shield size={22} style={{ flexShrink: 0, color: 'var(--atp-blue-light)' }} />

            <p
              style={{
                flex: 1,
                minWidth: 240,
                fontSize: '0.88rem',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                margin: 0,
              }}
            >
              Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous
              acceptez notre politique de confidentialité.
            </p>

            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button
                onClick={() => handleChoice('accepted')}
                style={{
                  ...buttonBase,
                  background: 'var(--atp-blue)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 58, 92, 0.3)',
                }}
              >
                Accepter
              </button>
              <button
                onClick={() => handleChoice('refused')}
                style={{
                  ...buttonBase,
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                }}
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
