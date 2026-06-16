"use client";
import React from 'react';
import { useContent } from '../cms/ContentContext';

export const LegalPage = ({ type }: { type: 'cgu' | 'cgv' | 'mentions' }) => {
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

export default LegalPage;
