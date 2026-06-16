"use client";
import React from 'react';
import Link from 'next/link';

import { Mail, Phone } from 'lucide-react';
import { useContent } from '../../cms/ContentContext';

export const Footer = () => {
  const { content } = useContent();
  return (
  <footer style={{ background: 'var(--anthracite)', color: 'white', padding: '60px 0 30px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div style={{ paddingRight: '20px' }}>
          <img src="/atp_logo_transparent.png" alt="Logo" style={{ height: '48px', marginBottom: '15px' }} />
          <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: '1.8', whiteSpace: 'nowrap' }}>
            Association Territoire Projet – Nancy Porte Nord.<br />
            Zone d'Activités Porte Nord, Maxéville – 54320.<br />
            Fondée en mai 2006.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a href="mailto:nancyportenord@gmail.com" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14}/> nancyportenord@gmail.com</a>
            <a href="tel:0622387700" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14}/> 06 22 38 77 00</a>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--atp-red)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 800 }}>Navigation</h4>
          <Link href="/about" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Qui sommes-nous ?</Link>
          <Link href="/president" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Le mot du Président</Link>
          <Link href="/directory" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Annuaire Entreprises</Link>
          <Link href="/organigramme" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Organigramme</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--atp-red)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 800 }}>Ressources</h4>
          <Link href="/offres-emploi" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Offres d'Emploi</Link>
          <Link href="/adherent-login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Espace Adhérent</Link>
          <a href="/#actions" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none' }}>Nos Actions</a>
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
          <Link href="/cgu" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textDecoration: 'none' }}>CGU</Link>
          <Link href="/cgv" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textDecoration: 'none' }}>CGV</Link>
          <Link href="/mentions-legales" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textDecoration: 'none' }}>Mentions légales</Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
