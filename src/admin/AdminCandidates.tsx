import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, CheckCircle2, Trash2, Link as LinkIcon, Star, Plus, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateMatchScore, JobOffer } from '../lib/matchingAlgorithm';

export const AdminCandidates = ({ content }: { content: any }) => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCandidate, setActiveCandidate] = useState<any>(null);
  
  // Formulaire d'ajout manuel
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    title: '',
    sector: '',
    experience_years: 0,
    availability: '',
    skills: '', // comma separated in form
    languages: '', // comma separated in form
    summary: '',
    cv_url: '' // We use this to store the photo/image URL
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase.from('candidates').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setCandidates(data || []);
    } catch (err: any) {
      console.error("Erreur récupération candidats", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    const file = e.target.files[0];
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    try {
      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, cv_url: publicUrl }));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('candidates').insert({
        first_name: formData.first_name,
        last_name: formData.last_name,
        title: formData.title,
        sector: formData.sector,
        experience_years: formData.experience_years,
        availability: formData.availability,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
        summary: formData.summary,
        cv_url: formData.cv_url,
        status: 'active'
      });
      fetchCandidates();
      setShowAddForm(false);
      setFormData({
        first_name: '', last_name: '', title: '', sector: '',
        experience_years: 0, availability: '', skills: '', languages: '', summary: '', cv_url: ''
      });
    } catch (err) {
      alert("Erreur lors de l'ajout du candidat.");
    }
  };

  const deleteCandidate = async (id: string) => {
    if (window.confirm("Supprimer ce candidat ?")) {
      await supabase.from('candidates').delete().eq('id', id);
      fetchCandidates();
      if (activeCandidate?.id === id) setActiveCandidate(null);
    }
  };

  const allJobs: JobOffer[] = [];
  (content?.directory?.companies || []).forEach((c: any) => {
    (c.jobOffers || []).forEach((j: any) => {
      allJobs.push({
        company_name: c.name,
        title: j.title,
        sector: c.sector,
        contract_type: j.type,
        location: j.location,
        salary: j.salary,
        description: j.description,
        requirements: j.requirements || []
      });
    });
  });

  return (
    <div className="admin-grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="admin-tab-title" style={{ margin: 0 }}><Briefcase size={32}/> Fiches Candidats (CVthèque Manuelle)</h3>
        <button onClick={() => setShowAddForm(!showAddForm)} className="admin-btn admin-btn-primary"><Plus size={18}/> Créer une fiche</button>
      </div>

      {showAddForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Nouvelle Fiche Candidat</h4>
          <form onSubmit={handleAddCandidate} className="admin-grid">
            <div className="admin-field-group">
              <label className="admin-label">Prénom *</label>
              <input required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="admin-input-txt" />
            </div>
            <div className="admin-field-group">
              <label className="admin-label">Nom *</label>
              <input required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="admin-input-txt" />
            </div>
            <div className="admin-field-group full">
              <label className="admin-label">Titre du poste recherché *</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input-txt" placeholder="Ex: Développeur React" />
            </div>
            <div className="admin-field-group">
              <label className="admin-label">Secteur *</label>
              <input required value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} className="admin-input-txt" />
            </div>
            <div className="admin-field-group">
              <label className="admin-label">Années d'expérience</label>
              <input type="number" value={formData.experience_years} onChange={e => setFormData({...formData, experience_years: parseInt(e.target.value) || 0})} className="admin-input-txt" />
            </div>
            <div className="admin-field-group full">
              <label className="admin-label">Compétences clés (séparées par des virgules)</label>
              <input value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="admin-input-txt" placeholder="React, Node.js, Gestion de projet..." />
            </div>
            <div className="admin-field-group full">
              <label className="admin-label">Photo du candidat</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="text" value={formData.cv_url} onChange={e => setFormData({...formData, cv_url: e.target.value})} className="admin-input-txt" placeholder="URL de l'image" style={{ flex: 1 }} />
                <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer', margin: 0 }}>
                  <input type="file" hidden accept="image/jpeg, image/png, image/webp" onChange={handleImageUpload} disabled={uploadingImage} />
                  {uploadingImage ? "Envoi..." : <><Camera size={16}/> Upload Image</>}
                </label>
              </div>
            </div>
            <div className="admin-field-group full">
              <label className="admin-label">Résumé / Présentation</label>
              <textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="admin-input-txt" rows={4} />
            </div>
            <div className="admin-field-group full" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" className="admin-btn admin-btn-success">Enregistrer le candidat</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="admin-btn admin-btn-secondary">Annuler</button>
            </div>
          </form>
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: activeCandidate ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        {/* Liste des Candidats */}
        <div>
          {loading ? <p>Chargement...</p> : candidates.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>Aucun candidat pour le moment.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {candidates.map(c => (
                <div key={c.id} onClick={() => setActiveCandidate(c)} 
                     style={{ background: activeCandidate?.id === c.id ? '#f8fafc' : 'white', border: activeCandidate?.id === c.id ? '2px solid var(--atp-blue)' : '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {c.cv_url ? (
                      <img src={c.cv_url} alt="Photo" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Briefcase size={20} color="#94a3b8"/></div>
                    )}
                    <div>
                      <h5 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{c.first_name} {c.last_name}</h5>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.title} • {c.experience_years} ans d'exp.</p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteCandidate(c.id); }} className="admin-btn" style={{ padding: '6px', color: '#ef4444', background: 'transparent' }}><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Détails et Matching */}
        {activeCandidate && (
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'sticky', top: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              {activeCandidate.cv_url ? (
                <img src={activeCandidate.cv_url} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
              ) : null}
              <div>
                <h4 style={{ fontSize: '1.3rem', margin: '0 0 8px' }}>{activeCandidate.first_name} {activeCandidate.last_name}</h4>
                <p style={{ color: 'var(--atp-blue)', fontWeight: 800, margin: 0 }}>{activeCandidate.title}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {(activeCandidate.skills || []).slice(0,5).map((s:string) => <span key={s} style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600 }}>{s}</span>)}
            </div>

            <h5 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={16} color="var(--atp-red)"/> Emplois Compatibles
            </h5>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {allJobs.map((job, idx) => {
                const match = calculateMatchScore(activeCandidate, job);
                return { job, match };
              })
              .sort((a, b) => b.match.score - a.match.score)
              .slice(0, 3)
              .map((res, i) => (
                <div key={i} style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', background: res.match.score > 70 ? '#f0fdf4' : 'transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h6 style={{ margin: '0 0 2px', fontSize: '0.95rem' }}>{res.job.title}</h6>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{res.job.company_name}</p>
                    </div>
                    <div style={{ background: res.match.score > 70 ? '#10b981' : res.match.score > 40 ? '#f59e0b' : '#ef4444', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>
                      {res.match.score}% Match
                    </div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', gap: '12px' }}>
                    <span>Secteur: {res.match.breakdown.sectorScore}/30</span>
                    <span>Compétences: {res.match.breakdown.skillsScore}/50</span>
                    <span>Expérience: {res.match.breakdown.experienceScore}/20</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
