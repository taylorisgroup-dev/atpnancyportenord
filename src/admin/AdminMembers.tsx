import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, CheckCircle, XCircle, ShieldAlert, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminMembers = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProfiles(data || []);
    } catch (err: any) {
      console.error("Erreur récupération profils", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!window.confirm(`Confirmer le changement de statut vers "${newStatus}" ?`)) return;
    try {
      const { error } = await supabase.from('profiles').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      fetchProfiles();
    } catch (err: any) {
      alert("Erreur lors de la mise à jour : " + err.message);
    }
  };

  return (
    <div className="admin-grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="admin-tab-title" style={{ margin: 0 }}><Users size={32}/> Gestion des Adhérents (Espace Privé)</h3>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        {loading ? <p>Chargement...</p> : profiles.length === 0 ? <p>Aucun adhérent inscrit pour le moment.</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '12px' }}>Adhérent</th>
                  <th style={{ padding: '12px' }}>Entreprise</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Rôle</th>
                  <th style={{ padding: '12px' }}>Statut</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{p.first_name} {p.last_name}</td>
                    <td style={{ padding: '12px' }}>{p.company_name}</td>
                    <td style={{ padding: '12px' }}>{p.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px', background: p.role === 'admin' ? '#fee2e2' : '#f1f5f9', color: p.role === 'admin' ? '#ef4444' : '#475569', fontWeight: 700 }}>
                        {p.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        fontSize: '0.75rem', padding: '4px 8px', borderRadius: '8px', fontWeight: 700,
                        background: p.status === 'validated' ? '#d1fae5' : p.status === 'pending' ? '#fef3c7' : '#fee2e2',
                        color: p.status === 'validated' ? '#059669' : p.status === 'pending' ? '#d97706' : '#ef4444'
                       }}>
                        {p.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      {p.role !== 'admin' && (
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          {p.status !== 'validated' && (
                            <button onClick={() => updateStatus(p.id, 'validated')} className="admin-btn" style={{ padding: '6px 12px', background: '#d1fae5', color: '#059669', fontSize: '0.8rem' }}><CheckCircle size={14}/> Valider</button>
                          )}
                          {p.status !== 'suspended' && (
                            <button onClick={() => updateStatus(p.id, 'suspended')} className="admin-btn" style={{ padding: '6px 12px', background: '#fee2e2', color: '#ef4444', fontSize: '0.8rem' }}><XCircle size={14}/> Suspendre</button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminSecurity = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    if (newPassword.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setMessage("Mot de passe mis à jour avec succès. Déconnexion recommandée.");
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="admin-tab-title" style={{ margin: 0 }}><ShieldAlert size={32}/> Sécurité & Authentification</h3>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', maxWidth: '600px' }}>
        <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Rotation du mot de passe Admin</h4>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>Modifiez régulièrement votre mot de passe pour garantir la sécurité de la plateforme.</p>
        
        {message && <div style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px', background: message.includes('Erreur') || message.includes('pas') ? '#fee2e2' : '#d1fae5', color: message.includes('Erreur') || message.includes('pas') ? '#ef4444' : '#059669', fontSize: '0.9rem', fontWeight: 600 }}>{message}</div>}

        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="admin-field-group full">
            <label className="admin-label">Nouveau mot de passe</label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}/>
              <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="admin-input-txt" style={{ paddingLeft: '40px' }} placeholder="Minimum 8 caractères" />
            </div>
          </div>
          <div className="admin-field-group full">
            <label className="admin-label">Confirmer le mot de passe</label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}/>
              <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="admin-input-txt" style={{ paddingLeft: '40px' }} placeholder="Minimum 8 caractères" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="admin-btn admin-btn-primary" style={{ marginTop: '10px' }}>
            {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
};
