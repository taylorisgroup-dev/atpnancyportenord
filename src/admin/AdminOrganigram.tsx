"use client";
import React, { useState } from 'react';
import { Users, Plus, Trash2, Edit3, Save, X, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { useContent } from '../cms/ContentContext';
import { PremiumImageUpload } from './components/PremiumImageUpload';

export default function AdminOrganigram() {
  const { content, updateContent } = useContent();
  const groups = Array.isArray(content.organigramGroups) ? content.organigramGroups : [];
  const members = Array.isArray(content.organigram) ? content.organigram : [];

  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupData, setEditingGroupData] = useState({ id: '', name: '', order: 0 });

  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingMemberData, setEditingMemberData] = useState<any>(null);

  // Group Management
  const handleAddGroup = () => {
    const newId = `group-${Date.now()}`;
    const newOrder = groups.length > 0 ? Math.max(...groups.map(g => g.order)) + 1 : 1;
    const newGroups = [...groups, { id: newId, name: 'Nouvelle Famille', order: newOrder }];
    updateContent('organigramGroups', '', newGroups);
  };

  const saveGroup = () => {
    const newGroups = groups.map(g => g.id === editingGroupData.id ? editingGroupData : g);
    updateContent('organigramGroups', '', newGroups);
    setEditingGroupId(null);
  };

  const deleteGroup = (id: string) => {
    if (window.confirm("Supprimer cette famille ? Les membres à l'intérieur ne seront pas supprimés mais n'auront plus de catégorie.")) {
      updateContent('organigramGroups', '', groups.filter(g => g.id !== id));
    }
  };

  const moveGroup = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === groups.length - 1)) return;
    const newGroups = [...groups];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    // Swap order property
    const tempOrder = newGroups[index].order;
    newGroups[index].order = newGroups[targetIndex].order;
    newGroups[targetIndex].order = tempOrder;
    // Sort array
    newGroups.sort((a, b) => a.order - b.order);
    updateContent('organigramGroups', '', newGroups);
  };

  // Member Management
  const handleAddMember = (groupId: string) => {
    const newMember = {
      id: `member-${Date.now()}`,
      groupId,
      firstName: '',
      lastName: '',
      atpRole: 'Membre',
      companyRole: '',
      photo: '',
      linkedin: ''
    };
    updateContent('organigram', '', [...members, newMember]);
    setEditingMemberId(newMember.id);
    setEditingMemberData(newMember);
  };

  const saveMember = () => {
    const newMembers = members.map(m => m.id === editingMemberData.id ? editingMemberData : m);
    updateContent('organigram', '', newMembers);
    setEditingMemberId(null);
  };

  const deleteMember = (id: string) => {
    if (window.confirm("Supprimer ce membre définitivement ?")) {
      updateContent('organigram', '', members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="admin-grid">
      <div className="admin-field-group full" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="admin-tab-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Users size={32} color="var(--atp-blue)"/> Gouvernance & Organigramme</h3>
            <p style={{ color: 'var(--text-muted)', margin: '5px 0 0' }}>Gérez les familles de l'organigramme et placez-y vos acteurs.</p>
          </div>
          <button onClick={handleAddGroup} className="admin-btn admin-btn-primary" style={{ marginTop: '20px' }}>
            <Plus size={16}/> Ajouter une nouvelle famille
          </button>
        </div>

        {/* Unassigned Members Section */}
        {members.filter(m => !groups.find(g => g.id === m.groupId)).length > 0 && (
          <div style={{ marginTop: '40px', padding: '20px', background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '12px' }}>
            <h3 style={{ color: '#c53030', marginBottom: '15px' }}>Membres sans catégorie (Orphelins)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
              {members.filter(m => !groups.find(g => g.id === m.groupId)).map(member => (
                <div key={member.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  {editingMemberId === member.id ? (
                    <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <PremiumImageUpload 
                        value={editingMemberData.photo} 
                        onChange={(v: string) => setEditingMemberData({...editingMemberData, photo: v})} 
                        label="Photo (carrée)" 
                      />
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Prénom</label>
                        <input value={editingMemberData.firstName} onChange={e => setEditingMemberData({...editingMemberData, firstName: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Nom</label>
                        <input value={editingMemberData.lastName} onChange={e => setEditingMemberData({...editingMemberData, lastName: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Statut ATP (ex: Président)</label>
                        <input value={editingMemberData.atpRole} onChange={e => setEditingMemberData({...editingMemberData, atpRole: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Métier / Entreprise</label>
                        <input value={editingMemberData.companyRole} onChange={e => setEditingMemberData({...editingMemberData, companyRole: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Déplacer vers...</label>
                        <select value={editingMemberData.groupId} onChange={e => setEditingMemberData({...editingMemberData, groupId: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px', background: 'white' }}>
                          <option value="">Sélectionner une catégorie</option>
                          {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <button onClick={saveMember} className="admin-btn admin-btn-success" style={{ flex: 1 }}><Save size={16}/> Enregistrer</button>
                        <button onClick={() => setEditingMemberId(null)} className="admin-btn admin-btn-secondary"><X size={16}/></button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', padding: '15px', gap: '15px', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
                        {member.photo ? <img src={member.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile"/> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}><Plus size={24}/></div>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--anthracite)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.firstName} {member.lastName}</strong>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--atp-red)', fontWeight: 700 }}>{member.atpRole}</span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.companyRole}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button onClick={() => { setEditingMemberData(member); setEditingMemberId(member.id); }} className="admin-btn admin-btn-secondary" style={{ padding: '6px' }}><Edit3 size={14}/></button>
                        <button onClick={() => deleteMember(member.id)} className="admin-btn" style={{ background: '#fee2e2', color: '#ef4444', padding: '6px' }}><Trash2 size={14}/></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {groups.sort((a, b) => a.order - b.order).map((group, gIndex) => (
        <div key={group.id} className="admin-field-group full" style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          {/* Group Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #e2e8f0' }}>
            {editingGroupId === group.id ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                <input 
                  value={editingGroupData.name} 
                  onChange={e => setEditingGroupData({ ...editingGroupData, name: e.target.value })} 
                  className="admin-input-txt" 
                  autoFocus
                />
                <button onClick={saveGroup} className="admin-btn admin-btn-success"><Save size={16}/> Enregistrer</button>
                <button onClick={() => setEditingGroupId(null)} className="admin-btn admin-btn-secondary"><X size={16}/></button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <button onClick={() => moveGroup(gIndex, 'up')} disabled={gIndex === 0} style={{ background: 'none', border: 'none', cursor: gIndex === 0 ? 'default' : 'pointer', opacity: gIndex === 0 ? 0.3 : 1 }}><ChevronUp size={20}/></button>
                  <button onClick={() => moveGroup(gIndex, 'down')} disabled={gIndex === groups.length - 1} style={{ background: 'none', border: 'none', cursor: gIndex === groups.length - 1 ? 'default' : 'pointer', opacity: gIndex === groups.length - 1 ? 0.3 : 1 }}><ChevronDown size={20}/></button>
                </div>
                <h4 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--charcoal-gray)', fontWeight: 800 }}>{group.name}</h4>
                <button onClick={() => { setEditingGroupData(group); setEditingGroupId(group.id); }} className="admin-btn admin-btn-secondary" style={{ padding: '6px 12px' }}><Edit3 size={14}/></button>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleAddMember(group.id)} className="admin-btn" style={{ background: 'white', border: '1px solid #cbd5e1', color: 'var(--atp-blue)' }}><Plus size={16}/> Ajouter Acteur</button>
              <button onClick={() => deleteGroup(group.id)} className="admin-btn" style={{ background: '#fee2e2', color: '#ef4444', padding: '8px' }} title="Supprimer la famille"><Trash2 size={16}/></button>
            </div>
          </div>

          {/* Members Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
            {members.filter(m => m.groupId === group.id).map(member => (
              <div key={member.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                {editingMemberId === member.id ? (
                  <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <PremiumImageUpload 
                      value={editingMemberData.photo} 
                      onChange={(v: string) => setEditingMemberData({...editingMemberData, photo: v})} 
                      label="Photo (carrée)" 
                    />
                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Prénom</label>
                      <input value={editingMemberData.firstName} onChange={e => setEditingMemberData({...editingMemberData, firstName: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Nom</label>
                      <input value={editingMemberData.lastName} onChange={e => setEditingMemberData({...editingMemberData, lastName: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Statut ATP (ex: Président)</label>
                      <input value={editingMemberData.atpRole} onChange={e => setEditingMemberData({...editingMemberData, atpRole: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Métier / Entreprise</label>
                      <input value={editingMemberData.companyRole} onChange={e => setEditingMemberData({...editingMemberData, companyRole: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#64748b' }}>URL Profil LinkedIn (Optionnel)</label>
                      <input value={editingMemberData.linkedin || ''} onChange={e => setEditingMemberData({...editingMemberData, linkedin: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px' }} placeholder="https://linkedin.com/in/..."/>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Déplacer vers...</label>
                      <select value={editingMemberData.groupId} onChange={e => setEditingMemberData({...editingMemberData, groupId: e.target.value})} className="admin-input-txt" style={{ padding: '6px 10px', background: 'white' }}>
                        {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button onClick={saveMember} className="admin-btn admin-btn-success" style={{ flex: 1 }}><Save size={16}/> Enregistrer</button>
                      <button onClick={() => setEditingMemberId(null)} className="admin-btn admin-btn-secondary"><X size={16}/></button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '15px', position: 'relative' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #e2e8f0', overflow: 'hidden', flexShrink: 0 }}>
                        {member.photo ? <img src={member.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" /> : <Users size={24} style={{ margin: '16px', color: '#cbd5e1' }}/>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--charcoal-gray)' }}>{member.firstName} <span style={{ textTransform: 'uppercase' }}>{member.lastName}</span></strong>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--atp-red)', textTransform: 'uppercase' }}>{member.atpRole}</span>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.3 }}>{member.companyRole}</p>
                        {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '0.7rem', color: '#0b66c2', display: 'inline-block', marginTop: '4px', textDecoration: 'none' }}>LinkedIn</a>}
                      </div>
                    </div>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                      <button onClick={() => { setEditingMemberData(member); setEditingMemberId(member.id); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}><Edit3 size={16}/></button>
                      <button onClick={() => deleteMember(member.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><Trash2 size={16}/></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {members.filter(m => m.groupId === group.id).length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px dashed #cbd5e1', gridColumn: '1 / -1' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Aucun acteur dans cette famille.</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Unassigned Members (Fallback if a group was deleted) */}
      {members.filter(m => !groups.find(g => g.id === m.groupId)).length > 0 && (
        <div className="admin-field-group full" style={{ background: '#fef2f2', padding: '24px', borderRadius: '16px', border: '1px solid #fecaca' }}>
          <h4 style={{ color: '#ef4444', marginTop: 0, marginBottom: '20px' }}>Acteurs sans catégorie</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
            {members.filter(m => !groups.find(g => g.id === m.groupId)).map(member => (
              <div key={member.id} style={{ background: 'white', borderRadius: '12px', padding: '15px', border: '1px solid #fecaca', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{member.firstName} {member.lastName}</strong>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>{member.atpRole}</span>
                </div>
                <button onClick={() => { setEditingMemberData(member); setEditingMemberId(member.id); }} className="admin-btn admin-btn-secondary" style={{ padding: '6px 12px' }}>Éditer pour classer</button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
