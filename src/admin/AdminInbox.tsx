import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, CheckCircle2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminInbox = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      console.error("Erreur lors de la récupération des contacts (Assurez-vous que la table existe)", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await supabase.from('contact_requests').update({ status: 'read' }).eq('id', id);
    fetchRequests();
  };

  const deleteRequest = async (id: string) => {
    if (window.confirm("Archiver ce message ?")) {
      await supabase.from('contact_requests').update({ status: 'archived' }).eq('id', id);
      fetchRequests();
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Chargement de la boîte de réception...</div>;

  const activeRequests = requests.filter(r => r.status !== 'archived');

  return (
    <div className="admin-grid" style={{ gridTemplateColumns: '1fr' }}>
      <div className="admin-field-group full">
        <h3 className="admin-tab-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><Mail size={32}/> Boîte de réception CRM</span>
          <span style={{ fontSize: '0.8rem', background: 'var(--atp-blue)', color: 'white', padding: '4px 12px', borderRadius: '20px' }}>
            {activeRequests.length} message(s)
          </span>
        </h3>
      </div>

      {activeRequests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', color: '#94a3b8' }}>
          <Mail size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <p>Aucun nouveau message.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeRequests.map(req => (
            <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                 style={{ background: 'white', padding: '24px', borderRadius: '16px', borderLeft: req.status === 'unread' ? '4px solid var(--atp-red)' : '4px solid #cbd5e1', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 800 }}>{req.subject}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>De: <strong>{req.contact_name}</strong> {req.company_name ? `(${req.company_name})` : ''} — <a href={`mailto:${req.email}`}>{req.email}</a></p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Le {new Date(req.created_at).toLocaleDateString('fr-FR')} à {new Date(req.created_at).toLocaleTimeString('fr-FR')}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {req.status === 'unread' && (
                    <button onClick={() => markAsRead(req.id)} className="admin-btn" style={{ background: '#d1fae5', color: '#059669', padding: '8px 12px' }}><CheckCircle2 size={16} /> Marquer lu</button>
                  )}
                  <a href={`mailto:${req.email}?subject=RE: ${req.subject}`} className="admin-btn admin-btn-secondary" style={{ padding: '8px 12px' }}>Répondre</a>
                  <button onClick={() => deleteRequest(req.id)} className="admin-btn" style={{ background: '#fee2e2', color: '#ef4444', padding: '8px 12px' }}><Trash2 size={16} /></button>
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {req.message}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
