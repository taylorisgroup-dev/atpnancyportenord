"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Users, Briefcase, Handshake, Globe, Star } from 'lucide-react';
import { useContent } from '../cms/ContentContext';
import { defaultContent } from '../cms/defaultContent';

export const OrgChartPage = () => {
  const { content } = useContent();
  const organigram = (content.organigram && content.organigram.length > 0) ? content.organigram : (defaultContent.organigram || []);
  const groups = content.organigramGroups || defaultContent.organigramGroups;

  // Sort groups by order
  const sortedGroups = [...groups].sort((a, b) => a.order - b.order);

  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '100px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div className="container" style={{ padding: '0 40px', position: 'relative' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>GOUVERNANCE</span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginTop: '8px' }}>Organigramme de l'ATP</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '44rem', margin: '12px auto 0', lineHeight: 1.7, fontSize: '1rem' }}>
            L'ATP Nancy Porte Nord est gouvernée par des acteurs engagés, élus démocratiquement pour développer et représenter notre territoire économique.
          </p>
        </div>
      </div>
      <div className="container" style={{ padding: '70px 40px' }}>

        {sortedGroups.map((group, groupIndex) => {
          const membersInGroup = organigram.filter((m: any) => m.groupId === group.id);
          if (membersInGroup.length === 0) return null;

          const isLevel1 = groupIndex === 0;
          const isLevel2 = groupIndex === 1;

          return (
            <React.Fragment key={group.id}>
              <div style={{ textAlign: 'center', marginBottom: isLevel1 ? '12px' : (isLevel2 ? '24px' : '30px'), marginTop: groupIndex > 0 ? '20px' : '0' }}>
                <span className="section-subtitle-small">{group.name.toUpperCase()}</span>
                {!isLevel1 && !isLevel2 && (
                  <h3 style={{ marginTop: '10px', color: 'var(--anthracite)', fontSize: '1.5rem', fontWeight: 800 }}>Les {membersInGroup.length} membres</h3>
                )}
              </div>

              {isLevel1 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '0' }}>
                  {membersInGroup.map((p: any, i: number) => (
                    <div key={i} style={{ maxWidth: '440px', flex: '1 1 300px' }}>
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="hover-premium-card"
                        style={{ background: 'linear-gradient(135deg, var(--atp-blue) 0%, #002236 100%)', borderRadius: '24px', padding: '40px 30px', textAlign: 'center', color: 'white', boxShadow: '0 25px 50px rgba(0,58,92,0.3)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)', margin: '0 auto 20px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                          {p.photo ? <img src={p.photo} alt={p.lastName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Users size={40} style={{ margin: '26px auto', color: 'rgba(255,255,255,0.4)' }}/>}
                        </div>
                        <strong style={{ fontSize: '1.4rem', color: 'white', display: 'block', fontWeight: 900 }}>{p.firstName} <span style={{ textTransform: 'uppercase' }}>{p.lastName}</span></strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--atp-red)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, display: 'inline-block', margin: '8px 0', padding: '4px 12px', background: 'rgba(226,0,26,0.15)', borderRadius: '20px' }}>{p.atpRole}</span>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '12px', lineHeight: 1.6, fontStyle: 'italic' }}>{p.companyRole}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              ) : isLevel2 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '850px', margin: '0 auto' }}>
                  {membersInGroup.map((b: any, i: number) => {
                    const color = i % 2 === 0 ? 'var(--atp-blue)' : 'var(--atp-red)';
                    const bgIcon = i % 2 === 0 ? 'rgba(0,58,92,0.08)' : 'rgba(226,0,26,0.08)';
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="hover-premium-card"
                        style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '20px', padding: '30px 24px', textAlign: 'center', borderTop: `4px solid ${color}`, boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}>
                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: bgIcon, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          {b.photo ? <img src={b.photo} alt={b.lastName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Users size={28} style={{ color: color }} />}
                        </div>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--charcoal-gray)', fontWeight: 800, display: 'block' }}>{b.firstName} <span style={{ textTransform: 'uppercase' }}>{b.lastName}</span></strong>
                        <span style={{ fontSize: '0.75rem', color: color, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, display: 'block', marginTop: '6px' }}>{b.atpRole}</span>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginTop: '12px' }}>{b.companyRole}</p>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '10px' }}>
                  {membersInGroup.map((c: any, i: number) => {
                    const color = i % 2 === 0 ? 'var(--atp-blue)' : 'var(--atp-red)';
                    return (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (i % 5) * 0.05 }}
                        style={{ background: 'white', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: i % 2 === 0 ? 'rgba(0,58,92,0.06)' : 'rgba(226,0,26,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                          {c.photo ? <img src={c.photo} alt={c.lastName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Users size={20} style={{ color: color }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--anthracite)', fontWeight: 800, display: 'block', lineHeight: 1.3 }}>{c.firstName} <span style={{ textTransform: 'uppercase' }}>{c.lastName}</span></strong>
                          <span style={{ fontSize: '0.68rem', color: color, fontWeight: 800, display: 'block' }}>{c.atpRole || 'Membre'}</span>
                          {c.companyRole && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>{c.companyRole}</span>}
                          {c.linkedin && <a href={c.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#0b66c2', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', textDecoration: 'none' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn
                          </a>}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {groupIndex < sortedGroups.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: isLevel1 ? '0' : '8px' }}>
                  <div style={{ width: '3px', height: '50px', background: isLevel1 ? 'linear-gradient(to bottom, var(--atp-blue), rgba(0,58,92,0.1))' : 'linear-gradient(to bottom, rgba(0,58,92,0.15), rgba(226,0,26,0.15))' }} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Unassigned Members Fallback */}
        {organigram.filter((m: any) => !sortedGroups.find((g: any) => g.id === m.groupId)).length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="section-subtitle-small">AUTRES MEMBRES</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {organigram.filter((m: any) => !sortedGroups.find((g: any) => g.id === m.groupId)).map((c: any, i: number) => {
                const color = 'var(--atp-blue)';
                return (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (i % 5) * 0.05 }}
                    style={{ background: 'white', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,58,92,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      {c.photo ? <img src={c.photo} alt={c.lastName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Users size={20} style={{ color: color }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--anthracite)', fontWeight: 800, display: 'block', lineHeight: 1.3 }}>{c.firstName} <span style={{ textTransform: 'uppercase' }}>{c.lastName}</span></strong>
                      <span style={{ fontSize: '0.68rem', color: color, fontWeight: 800, display: 'block' }}>{c.atpRole || 'Membre'}</span>
                      {c.companyRole && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>{c.companyRole}</span>}
                      {c.linkedin && <a href={c.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#0b66c2', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', textDecoration: 'none' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn
                      </a>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {organigram.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--light-gray)', borderRadius: '24px' }}>
            <Users size={48} style={{ color: '#cbd5e1', margin: '0 auto 16px' }} />
            <h3 style={{ color: 'var(--atp-blue)', fontSize: '1.2rem', marginBottom: '8px' }}>L'organigramme est en cours de mise à jour</h3>
            <p style={{ color: 'var(--text-muted)' }}>Revenez très bientôt pour découvrir l'équipe de l'ATP Nancy Porte Nord.</p>
          </div>
        )}

        {/* Commissions */}
        <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '48px', marginBottom: '40px', marginTop: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-subtitle-small">ORGANISATION INTERNE</span>
            <h3 style={{ marginTop: '8px', color: 'var(--atp-blue)' }}>Commissions thématiques</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '38rem', margin: '8px auto 0', lineHeight: 1.6 }}>Groupes de travail opérationnels ouverts à tous les adhérents.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Commission Emploi, Insertion & Alternance', icon: <Briefcase size={20} />, color: 'var(--atp-red)', desc: 'Forums emploi, job dating, projet RSA/CD54, partenariats France Travail.' },
              { title: 'Commission Relations Institutionnelles', icon: <Handshake size={20} />, color: 'var(--atp-blue)', desc: 'Dialogue Préfecture, Métropole, Mairie, Région Grand Est, GLPE.' },
              { title: 'Commission Communication & Numérique', icon: <Globe size={20} />, color: 'var(--atp-red)', desc: 'Site internet, réseaux sociaux, annuaire et communication événementielle.' },
              { title: 'Commission Événements & Partenariats', icon: <Star size={20} />, color: 'var(--atp-blue)', desc: "Matinales, after-works, braderies et partenariats (Lorr'up, Marchés de France)." },
            ].map((c, i) => (
              <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start', border: '1px solid #e5e7eb' }}>
                <div style={{ width: '38px', height: '38px', background: c.color === 'var(--atp-red)' ? 'rgba(196,43,46,0.08)' : 'rgba(0,58,92,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '4px', lineHeight: 1.3 }}>{c.title}</h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(0,58,92,0.04)', border: '1px solid rgba(0,58,92,0.1)', borderRadius: '16px', padding: '24px 28px', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Bureau et comité sont élus lors de l'<strong>Assemblée Générale annuelle</strong>. L'adhésion est ouverte à toutes les entreprises de la zone Porte Nord.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-blue" style={{ fontSize: '0.82rem', padding: '9px 22px' }}>Nous contacter</Link>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '9px 22px' }}>Adhérer à l'ATP</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChartPage;
