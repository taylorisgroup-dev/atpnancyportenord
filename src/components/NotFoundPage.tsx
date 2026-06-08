import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--anthracite) 0%, var(--atp-blue) 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 20px',
      }}
    >
      {/* Dot pattern background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        {/* 404 large text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(7rem, 18vw, 12rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 8,
            background: 'linear-gradient(135deg, var(--atp-blue-light), var(--atp-red))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
          }}
        >
          Page introuvable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              borderRadius: 10,
              background: 'var(--atp-red)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 24px rgba(196, 43, 46, 0.35)',
            }}
          >
            <ArrowLeft size={18} />
            Retour à l&apos;accueil
            <Home size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
