"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
// import { Navigate } from 'react-router-dom';

import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export const AdherentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const { user } = useAuth();

  if (user) {
    if (typeof window !== 'undefined') window.location.href = '/adherent/dashboard';
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate.push('/adherent/dashboard');
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' 
        ? 'Identifiants incorrects' 
        : 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      <div style={{ background: 'var(--light-gray)', padding: '100px 0', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '50px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', width: '100%', maxWidth: '460px', border: '1px solid #e5e7eb' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(0,58,92,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--atp-blue)' }}>
              <Lock size={32} />
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Espace Adhérent</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Connectez-vous pour accéder à vos services réservés.</p>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Adresse Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@entreprise.fr"
                  required
                  style={{ width: '100%', padding: '12px 16px 12px 42px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: '100%', padding: '12px 16px 12px 42px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
              {loading ? 'Connexion...' : 'Se connecter'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Pas encore de compte ? L'accès est réservé aux adhérents validés.</p>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--atp-blue)', textDecoration: 'underline' }}>
              Adhérer à l'ATP 2026
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
