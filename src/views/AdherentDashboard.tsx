"use client";
import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';
// import { Navigate } from 'react-router-dom';

import { LogOut, User, Building2, Briefcase, FileText, Settings, Lightbulb, Video } from 'lucide-react';
import { useContent } from '../cms/ContentContext';

export const AdherentDashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState('profile');

  if (loading) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement...</div>;
  }

  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/adherent/login';
    return null;
  }

  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '60px 0 120px' }}>
        <div className="container" style={{ padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '8px' }}>Espace Adhérent</h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>Bienvenue, {profile?.first_name || user.email}</p>
          </div>
          <button onClick={signOut} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: '0 40px', marginTop: '-60px', marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          
          {/* Sidebar */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', height: 'fit-content' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => setActiveTab('profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: activeTab === 'profile' ? 'var(--light-gray)' : 'transparent', color: activeTab === 'profile' ? 'var(--atp-blue)' : 'var(--text-muted)', fontWeight: activeTab === 'profile' ? 800 : 600, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <User size={18} /> Mon Profil
              </button>
              <button onClick={() => setActiveTab('company')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: activeTab === 'company' ? 'var(--light-gray)' : 'transparent', color: activeTab === 'company' ? 'var(--atp-blue)' : 'var(--text-muted)', fontWeight: activeTab === 'company' ? 800 : 600, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <Building2 size={18} /> Fiche Entreprise
              </button>
              <button onClick={() => setActiveTab('jobs')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: activeTab === 'jobs' ? 'var(--light-gray)' : 'transparent', color: activeTab === 'jobs' ? 'var(--atp-blue)' : 'var(--text-muted)', fontWeight: activeTab === 'jobs' ? 800 : 600, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <Briefcase size={18} /> Offres d'Emplois
              </button>
              <button onClick={() => setActiveTab('ideabox')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: activeTab === 'ideabox' ? 'rgba(124,58,237,0.08)' : 'transparent', color: activeTab === 'ideabox' ? '#7c3aed' : 'var(--text-muted)', fontWeight: activeTab === 'ideabox' ? 800 : 600, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <Lightbulb size={18} /> Boîte à Idées
              </button>
              <div style={{ height: '1px', background: '#e5e7eb', margin: '8px 0' }} />
              <button onClick={() => setActiveTab('settings')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: activeTab === 'settings' ? 'var(--light-gray)' : 'transparent', color: activeTab === 'settings' ? 'var(--charcoal-gray)' : 'var(--text-muted)', fontWeight: activeTab === 'settings' ? 800 : 600, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <Settings size={18} /> Paramètres
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', minHeight: '500px' }}>
            
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--atp-blue)', marginBottom: '24px' }}>Informations Personnelles</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Prénom</label>
                    <input type="text" value={profile?.first_name || ''} readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', color: 'var(--text-muted)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Nom</label>
                    <input type="text" value={profile?.last_name || ''} readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', color: 'var(--text-muted)' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Email</label>
                    <input type="email" value={user.email || ''} readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', color: 'var(--text-muted)' }} />
                  </div>
                </div>
                <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: '12px' }}>
                  <h4 style={{ color: '#059669', fontSize: '0.95rem', marginBottom: '8px' }}>Statut Adhérent</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-gray)' }}>
                    Votre compte est <strong>{profile?.status === 'validated' ? 'validé' : 'en attente de validation'}</strong> par l'équipe ATP.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--atp-blue)', marginBottom: '24px' }}>Fiche Entreprise</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Modifiez les informations de votre entreprise telles qu'elles apparaîtront dans l'annuaire public.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Nom de l'entreprise</label>
                    <input type="text" value={profile?.company_name || ''} readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', color: 'var(--text-muted)' }} />
                  </div>
                  <div style={{ padding: '30px', background: 'var(--light-gray)', borderRadius: '16px', textAlign: 'center', border: '2px dashed #d1d5db' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Pour modifier vos informations détaillées (logo, description, secteur), veuillez contacter l'administration ATP.</p>
                    <Link href="/contact" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>Contacter l'ATP</Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--atp-blue)' }}>Mes Offres d'Emplois</h2>
                  <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>+ Nouvelle offre</button>
                </div>
                <div style={{ padding: '60px 0', textAlign: 'center' }}>
                  <Briefcase size={48} style={{ color: 'var(--text-muted)', opacity: 0.2, margin: '0 auto 16px' }} />
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 600 }}>Vous n'avez pas encore publié d'offres d'emploi.</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>Diffusez vos offres à l'ensemble du réseau et du territoire.</p>
                </div>
              </div>
            )}

            {activeTab === 'ideabox' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.6rem', color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      Boîte à Idées <span style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'rgba(124,58,237,0.1)', color: '#7c3aed', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Privé</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Proposez vos projets, idées d'événements et actions collectives directement au bureau de l'ATP.</p>
                  </div>
                </div>
                
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--light-gray)', padding: '30px', borderRadius: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Catégorie</label>
                    <select style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', background: 'white' }}>
                      <option value="idee">Idée & Suggestion</option>
                      <option value="evenement">Demande d'Événement</option>
                      <option value="action">Action Collective</option>
                      <option value="territoire">Vie du Territoire</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Titre du projet</label>
                    <input type="text" placeholder="Ex: Création d'un club RH" style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '0.95rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal-gray)', marginBottom: '8px' }}>Description détaillée</label>
                    <textarea rows={5} placeholder="Décrivez votre idée, les objectifs et les résultats attendus..." style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}></textarea>
                  </div>
                  <button type="button" className="btn" style={{ background: '#7c3aed', color: 'white', fontWeight: 800, alignSelf: 'flex-start' }}>Soumettre mon idée</button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--charcoal-gray)', marginBottom: '24px' }}>Paramètres du compte</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                    <div>
                      <h4 style={{ fontWeight: 800, marginBottom: '4px' }}>Mot de passe</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mettez à jour votre mot de passe de connexion</p>
                    </div>
                    <button className="btn" style={{ background: 'var(--light-gray)', color: 'var(--charcoal-gray)', fontSize: '0.85rem' }}>Modifier</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                    <div>
                      <h4 style={{ fontWeight: 800, marginBottom: '4px' }}>Notifications</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gérer vos préférences de réception d'emails (Newsletters, etc.)</p>
                    </div>
                    <button className="btn" style={{ background: 'var(--light-gray)', color: 'var(--charcoal-gray)', fontSize: '0.85rem' }}>Gérer</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
