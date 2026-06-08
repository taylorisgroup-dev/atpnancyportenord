import { motion } from 'framer-motion';

export const LoadingSkeleton = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--light-gray)',
        zIndex: 9999,
        gap: 28,
      }}
    >
      {/* Pulsing circle logo placeholder */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--atp-blue), var(--atp-blue-light))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0, 58, 92, 0.25)',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1.3rem',
            letterSpacing: '-0.02em',
          }}
        >
          ATP
        </span>
      </motion.div>

      {/* Chargement text with animated dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          Chargement
        </span>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
            }}
          >
            .
          </motion.span>
        ))}
      </div>

      {/* Subtle bottom bar animation */}
      <motion.div
        animate={{ scaleX: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: 120,
          height: 3,
          borderRadius: 2,
          background: 'linear-gradient(90deg, var(--atp-blue), var(--atp-red))',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
};
