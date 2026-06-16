"use client";
import { useState, type FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      style={{
        background: 'var(--anthracite)',
        padding: '80px 40px',
        color: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            color: '#fff',
            marginBottom: 12,
          }}
        >
          Restez informé
        </h2>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Recevez les actualités de l&apos;ATP directement dans votre boîte mail.
        </p>

        {submitted ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '20px 32px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: 12,
              color: '#4ade80',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            <CheckCircle size={22} />
            Merci ! Vous êtes inscrit à notre newsletter.
          </div>
        ) : (
          <form
            name="newsletter"
            data-netlify="true"
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: 12,
              maxWidth: 520,
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: 240,
                padding: '14px 20px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.07)',
                color: '#fff',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-primary)',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--atp-red)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            />
            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                borderRadius: 10,
                border: 'none',
                background: 'var(--atp-red)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(196, 43, 46, 0.3)',
              }}
            >
              <Send size={16} />
              S&apos;inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
