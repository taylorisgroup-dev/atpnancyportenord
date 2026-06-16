import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="page-root" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', background: 'var(--light-gray)' }}>
    <h1 style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: 900, color: 'var(--atp-red)', marginBottom: '16px', lineHeight: 1 }}>404</h1>
    <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--charcoal-gray)', marginBottom: '24px', fontWeight: 800 }}>Page Introuvable</h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem', maxWidth: '400px' }}>La page que vous recherchez n'existe pas, a été supprimée ou déplacée.</p>
    <Link to="/" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1rem', borderRadius: '12px' }}>
      Retour à l'accueil
    </Link>
  </div>
);

export default NotFoundPage;
