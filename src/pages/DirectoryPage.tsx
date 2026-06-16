import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, Building2, Briefcase, Download, Search, MapPin } from 'lucide-react';
import { useContent } from '../cms/ContentContext';

export const DirectoryPage = () => {
  const { content } = useContent();
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('Toutes les zones');
  const [selectedSector, setSelectedSector] = useState('Tous les secteurs');
  const [filterJobs, setFilterJobs] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  const zones = ['Toutes les zones', 'Zone Lafayette', 'Zone Prouvé', 'Zone Fruchard', 'Zone Saint-Jacques', 'Nancy Métropole'];
  const sectors = ['Tous les secteurs', 'Industrie', 'BTP', 'Services Pro', 'Formation / RH', 'Commerce / Logistique', 'Institutionnel', 'Services à la personne'];

  const allCompanies = content.directory?.companies || [];
  const filtered = allCompanies.filter((c: any) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesZone = selectedZone === 'Toutes les zones' || c.zone === selectedZone;
    const matchesSector = selectedSector === 'Tous les secteurs' || c.sector === selectedSector;
    const matchesJobs = !filterJobs || (c.jobOffers && c.jobOffers.length > 0);
    return matchesSearch && matchesZone && matchesSector && matchesJobs;
  });
  const displayed = filtered.slice(0, visibleCount);

  const jobsCount = allCompanies.reduce((acc: number, c: any) => acc + (c.jobOffers?.length || 0), 0);

  return (
    <div className="page-root container" style={{ paddingTop: '130px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="section-subtitle-small">BASE DE DONNÉES TERRITORIALE</span>
            <h2 style={{ marginTop: '6px' }}>Annuaire des Entreprises de la Zone Porte Nord</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '8px 22px', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>
              {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
            </div>
            <button onClick={() => setViewMode('grid')} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb', background: viewMode === 'grid' ? 'var(--atp-blue)' : 'white', color: viewMode === 'grid' ? 'white' : 'var(--text-muted)', cursor: 'pointer' }}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setViewMode('list')} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb', background: viewMode === 'list' ? 'var(--atp-blue)' : 'white', color: viewMode === 'list' ? 'white' : 'var(--text-muted)', cursor: 'pointer' }}>
              <List size={16} />
            </button>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', border: '1px solid #7dd3fc', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={16} style={{ color: 'var(--atp-blue)' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--atp-blue)' }}>{allCompanies.length} Entreprises adhérentes</span>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: '1px solid #6ee7b7', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={16} style={{ color: '#059669' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#064e3b' }}>{jobsCount} Offres d'emploi actives</span>
          </div>
          <div style={{ marginTop: '0px' }}>
            <a href={content.directory?.guidePdf || '#'} target={content.directory?.guidePdf ? "_blank" : undefined} rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', border: '1px solid #f9a8d4', padding: '10px 20px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: '0.2s', cursor: 'pointer', color: '#831843', fontWeight: 700 }} className="hover-scale" onClick={(e) => { if (!content.directory?.guidePdf) { e.preventDefault(); alert('Document en cours de préparation.'); } }}>
              <Download size={16} color="#831843" />
              Télécharger le Guide des Entreprises
            </a>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', marginTop: '16px', maxWidth: '48rem', lineHeight: 1.7 }}>Explorez le réseau ATP Nancy Porte Nord. Sur 178 hectares et plus de 1 300 emplois (zones Lafayette, Prouvé, Fruchard à Maxéville), découvrez la diversité et la force économique de notre territoire.</p>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginBottom: '48px', background: 'rgba(255,255,255,0.9)' }}>
        <div style={{ display: 'flex', gap: '14px', padding: '14px 20px', background: 'white', borderRadius: '14px', border: '1px solid #e5e7eb', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <Search style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={22} />
          <input type="text" placeholder="Rechercher par nom, activité ou description..." style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontWeight: 600, color: 'var(--charcoal-gray)', fontSize: '0.95rem' }} value={search} onChange={(e) => { setSearch(e.target.value); setVisibleCount(12); }} />
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>Localisation</label>
            <select style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.88rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedZone} onChange={(e) => { setSelectedZone(e.target.value); setVisibleCount(12); }}>
              {zones.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>Secteur d'Activité</label>
            <select style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '10px', background: 'white', fontSize: '0.88rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }} value={selectedSector} onChange={(e) => { setSelectedSector(e.target.value); setVisibleCount(12); }}>
              {sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button
            onClick={() => { setFilterJobs(!filterJobs); setVisibleCount(12); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', border: `2px solid ${filterJobs ? '#059669' : '#e5e7eb'}`, borderRadius: '10px', background: filterJobs ? '#d1fae5' : 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, color: filterJobs ? '#064e3b' : 'var(--text-muted)', transition: 'all 0.2s' }}>
            <Briefcase size={15} style={{ color: filterJobs ? '#059669' : 'var(--text-muted)' }} />
            Avec offres d'emploi
          </button>
          <button style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--atp-red)', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', textDecoration: 'underline' }} onClick={() => { setSearch(''); setSelectedZone('Toutes les zones'); setSelectedSector('Tous les secteurs'); setFilterJobs(false); setVisibleCount(12); }}>
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      {displayed.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {displayed.map((c: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: (Math.min(i, 11) % 12) * 0.04 }} style={{ padding: '28px', borderRadius: '24px', position: 'relative', overflow: 'hidden', background: 'white', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.logo ? <img src={c.logo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <Building2 style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={24} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--atp-red)', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(196,43,46,0.07)', padding: '5px 12px', borderRadius: '999px' }}>{c.sector}</span>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--atp-blue)', fontWeight: 800, marginBottom: '10px' }}>{c.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px', minHeight: '2.6rem' }}>{c.description}</p>
                  {c.jobOffers && c.jobOffers.length > 0 && (
                    <div style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)', borderRadius: '10px', padding: '8px 12px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Briefcase size={13} style={{ color: '#059669' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>{c.jobOffers.length} offre{c.jobOffers.length > 1 ? 's' : ''} d'emploi</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: 'var(--atp-red)' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--charcoal-gray)' }}>{c.zone}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {displayed.map((c: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                  style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--light-gray)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 style={{ color: 'var(--atp-blue)', opacity: 0.5 }} size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--atp-blue)', margin: 0 }}>{c.name}</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.zone}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--atp-red)', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(196,43,46,0.07)', padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{c.sector}</span>
                    {c.jobOffers && c.jobOffers.length > 0 && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)', padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{c.jobOffers.length} offre{c.jobOffers.length > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {visibleCount < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <button className="btn btn-blue" style={{ padding: '14px 40px', fontSize: '0.9rem', borderRadius: '999px' }} onClick={() => setVisibleCount(v => v + 12)}>
                Afficher plus d'entreprises ({filtered.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--light-gray)', borderRadius: '24px', marginTop: '32px', border: '2px dashed #d1d5db' }}>
          <Search size={50} style={{ margin: '0 auto 20px', color: 'var(--text-muted)', opacity: 0.15, display: 'block' }} />
          <h3 style={{ fontWeight: 800, color: 'var(--charcoal-gray)' }}>Aucun membre ne correspond</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px', maxWidth: '360px', margin: '10px auto 0' }}>Vérifiez l'orthographe ou élargissez vos filtres.</p>
          <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => { setSearch(''); setSelectedZone('Toutes les zones'); setSelectedSector('Tous les secteurs'); setFilterJobs(false); setVisibleCount(12); }}>Réinitialiser les filtres</button>
        </div>
      )}

      <div style={{ marginTop: '80px', padding: '50px', background: 'linear-gradient(135deg, var(--atp-blue) 0%, var(--atp-blue-light) 100%)', borderRadius: '28px', color: 'white', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div>
          <h3 style={{ color: 'white', fontSize: '1.6rem' }}>Votre entreprise n'est pas encore listée ?</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginTop: '8px' }}>Rejoignez le réseau le plus dynamique du Grand Nancy et bénéficiez d'une visibilité accrue auprès des décideurs locaux et régionaux.</p>
        </div>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'white', color: 'var(--atp-blue)', fontWeight: 800 }}>Adhérer à l'ATP</a>
          <Link to="/contact" className="btn btn-primary">Nous contacter →</Link>
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;
