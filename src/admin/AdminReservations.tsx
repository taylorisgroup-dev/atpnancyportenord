import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Users, CheckCircle2, Trash2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminReservations = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, resRes] = await Promise.all([
        supabase.from('events').select('*').order('date', { ascending: true }),
        supabase.from('reservations').select('*')
      ]);
      setEvents(eventsRes.data || []);
      setReservations(resRes.data || []);
    } catch (err) {
      console.error("Erreur lors de la récupération des événements et réservations", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id: string) => {
    if (window.confirm("Annuler cette inscription ?")) {
      await supabase.from('reservations').update({ status: 'cancelled' }).eq('id', id);
      fetchData();
    }
  };

  const deleteEvent = async (id: string) => {
    if (window.confirm("Supprimer cet événement et toutes ses inscriptions ?")) {
      await supabase.from('events').delete().eq('id', id);
      fetchData();
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Chargement des événements...</div>;

  return (
    <div className="admin-grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
      <div className="admin-field-group full">
        <h3 className="admin-tab-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><Calendar size={32}/> Agenda & Inscriptions</span>
          <button onClick={() => alert("Pour ajouter un événement, utilisez votre base de données Supabase ou implémentez le formulaire d'ajout ici.")} className="admin-btn admin-btn-primary">Nouvel Événement</button>
        </h3>
      </div>

      {events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '16px', color: '#94a3b8' }}>
          <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <p>Aucun événement prévu.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {events.map(ev => {
            const evReservations = reservations.filter(r => r.event_id === ev.id && r.status === 'confirmed');
            const percentFilled = Math.min(100, Math.round((evReservations.length / (ev.capacity || 50)) * 100));

            return (
              <div key={ev.id} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 800 }}>{ev.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--atp-blue)' }}>{new Date(ev.date).toLocaleDateString('fr-FR')} - {new Date(ev.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>{ev.location}</p>
                  </div>
                  <button onClick={() => deleteEvent(ev.id)} className="admin-btn" style={{ padding: '6px', color: '#ef4444' }}><Trash2 size={16}/></button>
                </div>
                
                <div style={{ margin: '20px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px', fontWeight: 700 }}>
                    <span style={{ color: '#64748b' }}>Inscriptions ({evReservations.length}/{ev.capacity})</span>
                    <span style={{ color: percentFilled > 90 ? '#ef4444' : 'var(--atp-blue)' }}>{percentFilled}% complet</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percentFilled}%`, background: percentFilled > 90 ? '#ef4444' : 'var(--atp-blue)' }}></div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--charcoal-gray)' }}><Users size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Liste des inscrits :</p>
                  {evReservations.length === 0 ? <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Personne pour le moment.</span> : null}
                  {evReservations.map(res => (
                    <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>{res.attendee_name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{res.attendee_company || res.attendee_email}</span>
                      </div>
                      <button onClick={() => cancelReservation(res.id)} className="admin-btn" title="Annuler l'inscription" style={{ padding: '4px', color: '#94a3b8' }}><XCircle size={14}/></button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
