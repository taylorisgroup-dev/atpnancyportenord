"use client";
import React, { useState } from 'react';
import { useContent } from '../cms/ContentContext';
import { 
  Settings, 
  Save, 
  Image as ImageIcon, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  UserSquare2, 
  FolderOpen, 
  UploadCloud, 
  Trash2, 
  CheckCircle2, 
  Building2, 
  Edit3, 
  Zap,
  Calendar,
  Award,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Camera,
  ShoppingBag,
  Star,
  FileDown,
  Sparkles,
  Plus,
  Users,
  ExternalLink,
  Video,
  Shield,
  BarChart3,
  Search,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { AdminInbox } from './AdminInbox';
import { AdminCandidates } from './AdminCandidates';
import { AdminMembers, AdminSecurity } from './AdminMembers';
import { AdminAnalytics } from './AdminAnalytics';
import { PremiumImageUpload } from './components/PremiumImageUpload';
import { PremiumFileUpload } from './components/PremiumFileUpload';
import { AdminReservations } from './AdminReservations';
import AdminOrganigram from './AdminOrganigram';

const extractDataFromCV = async (file: File) => {
  // Convert file to base64
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const base64Data = await readFileAsBase64(file);

  const response = await fetch('/.netlify/functions/extract-cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Data, mimeType: file.type })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Impossible d'extraire les données du CV.");
  }

  return response.json();
};

// --- Shared Internal Components ---

export const AdminDashboard: React.FC = () => {
  const { content, updateNestedContent } = useContent();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingItemIndex, setEditingItemIndex] = useState<number | 'new' | null>(null);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [showToast, setShowToast] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@nancyportenord.com',
        password: password
      });
      
      if (error) throw error;
      if (data.session) setIsAuthenticated(true);
    } catch (error: any) {
      alert("Identifiants incorrects ou non configurés. Configurez l'utilisateur dans Supabase (admin@nancyportenord.com).");
      // Fallback local uniquement pour développement
      if (process.env.NODE_ENV === 'development' && password === 'atp2026') setIsAuthenticated(true);
    }
  };

  const handleChange = (path: string[], value: any) => {
    if (typeof value === 'string' && path.join('.').toLowerCase().includes('video')) {
      const formatYoutubeUrl = (url: string) => {
        const watchMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
        if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
        const shortMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
        const shortsMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
        return url;
      };
      value = formatYoutubeUrl(value);
    }
    updateNestedContent(path, value);
  };

  const handlePublish = async () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, bucket: string = 'media') => {
    if (!e.target.files || e.target.files.length === 0) return null;
    const file = e.target.files[0];
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    try {
      await supabase.storage.from(bucket).upload(fileName, file);
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
      return publicUrl;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleCVScan = async (file: File) => {
    setScanning(true);
    try {
      // 1. Upload to Supabase for storage
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      await supabase.storage.from('cv_files').upload(fileName, file);
      const { data: { publicUrl } } = supabase.storage.from('cv_files').getPublicUrl(fileName);

      // 2. Extract data with Gemini
      const extractedData = await extractDataFromCV(file);
      
      setCurrentItem((prev: any) => ({
        ...prev,
        ...extractedData,
        cvFile: publicUrl
      }));
      
      alert("Analyse réussie ! Les champs ont été remplis.");
    } catch (error: any) {
      console.error(error);
      alert("Erreur lors de l'analyse : " + error.message);
    } finally {
      setScanning(false);
    }
  };

  const menuGroups = [
    {
      title: "Tableau de bord",
      items: [
        { id: 'overview', label: "Vue d'ensemble", icon: <LayoutDashboard size={18}/> },
        { id: 'analytics', label: 'Statistiques & Rapports', icon: <BarChart3 size={18}/> },
      ]
    },
    {
      title: "Général & Accueil",
      items: [
        { id: 'hero', label: 'Accueil (Hero)', icon: <Sparkles size={18}/> },
        { id: 'videos', label: 'Vidéos', icon: <Video size={18}/> },
        { id: 'banner', label: 'Bannière Actus', icon: <ImageIcon size={18}/> },
        { id: 'popup', label: 'Pop-up Dynamique', icon: <Sparkles size={18}/> },
        { id: 'about', label: 'Qui sommes-nous & Pacte', icon: <FileText size={18}/> },
        { id: 'organigramme', label: 'Organigramme', icon: <Users size={18}/> },
        { id: 'president', label: 'Mot du Président', icon: <UserSquare2 size={18}/> },
      ]
    },
    {
      title: "Contenus & Actions",
      items: [
        { id: 'directory', label: 'Annuaire & Guide', icon: <Building2 size={18}/> },
        { id: 'cvtheque', label: 'CVthèque (Manuelle)', icon: <Briefcase size={18}/> },
        { id: 'actions', label: 'Nos Actions', icon: <Zap size={18}/> },
        { id: 'agenda', label: 'Agenda & Inscriptions', icon: <Calendar size={18}/> },
        { id: 'media', label: 'Médiathèque', icon: <FolderOpen size={18}/> },
      ]
    },
    {
      title: "Configuration",
      items: [
        { id: 'inbox', label: 'Boîte de Réception', icon: <Mail size={18}/> },
        { id: 'members', label: 'Adhérents & Accès', icon: <Users size={18}/> },
        { id: 'membership', label: 'Adhésion (Avantages)', icon: <Award size={18}/> },
        { id: 'contact', label: 'Coordonnées', icon: <Mail size={18}/> },
        { id: 'legals', label: 'Pages Légales', icon: <FileText size={18}/> },
        { id: 'security', label: 'Sécurité & MDP', icon: <Shield size={18}/> }
      ]
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <style>{`
          .admin-login-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top left, #1e293b, #0f172a); padding: 2rem; }
          .admin-login-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 2rem; padding: 3rem; width: 100%; max-width: 440px; text-align: center; color: white; box-shadow: 0 25px 80px rgba(0,0,0,0.5); }
          .admin-input { width: 100%; padding: 1rem 1.2rem; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; color: white; font-size: 1rem; outline: none; transition: 0.3s; margin-bottom: 1.5rem; text-align: center; letter-spacing: 2px; }
          .admin-input:focus { border-color: var(--atp-red); box-shadow: 0 0 0 4px rgba(196,43,46,0.2); }
          .admin-btn-login { width: 100%; padding: 1rem; background: var(--atp-red); border: none; border-radius: 1rem; color: white; font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px; }
          .admin-btn-login:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(196,43,46,0.4); }
        `}</style>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="admin-login-card">
          <div style={{ width: '80px', height: '80px', background: 'var(--atp-red)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 30px rgba(196,43,46,0.3)' }}>
            <Settings size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-1px' }}>Console ATP</h2>
          <p style={{ opacity: 0.5, textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.7rem', fontWeight: 800, marginBottom: '2.5rem' }}>Administration Sécurisée</p>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="admin-input" placeholder="••••••••" />
            <button type="submit" className="admin-btn-login">Accéder au Dashboard</button>
          </form>
          <p style={{ marginTop: '2rem', fontSize: '0.75rem', opacity: 0.3 }}>© 2026 ATP Nancy Porte Nord</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <style>{`
        .admin-layout { display: flex; min-height: 100vh; background-color: #f0f2f5; font-family: var(--font-primary, 'Outfit', sans-serif); color: #1e293b; }
        .admin-sidebar { width: 280px; background: #1e293b; color: white; padding: 2rem 1.5rem; display: flex; flex-direction: column; position: fixed; height: 100vh; left: 0; top: 0; z-index: 100; box-shadow: 4px 0 20px rgba(0,0,0,0.1); }
        .admin-sidebar-logo { display: flex; alignItems: center; gap: 12px; margin-bottom: 2rem; padding: 0 0.5rem; }
        .admin-sidebar-group { margin-bottom: 1.5rem; }
        .admin-sidebar-group-title { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.4; font-weight: 800; padding: 0 1rem; margin-bottom: 0.8rem; }
        .admin-menu-btn { display: flex; align-items: center; gap: 0.8rem; width: 100%; text-align: left; padding: 0.8rem 1.2rem; border-radius: 1rem; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: 0.2s; border: none; background: transparent; color: rgba(255,255,255,0.6); margin-bottom: 2px; font-family: inherit; }
        .admin-menu-btn:hover { background: rgba(255,255,255,0.05); color: white; }
        .admin-menu-btn.active { background: var(--atp-red); color: white; box-shadow: 0 8px 20px rgba(196,43,46,0.2); }
        .admin-content { flex: 1; padding: 2.5rem 3.5rem; margin-left: 280px; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; background: white; padding: 1.2rem 2rem; border-radius: 1.5rem; margin-bottom: 2.5rem; box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid #edf2f7; }
        .admin-tab-title { font-size: 1.8rem; font-weight: 900; color: #0f172a; margin-bottom: 2rem; display: flex; alignItems: center; gap: 12px; letterSpacing: -0.5px; }
        .admin-glass-card { background: white; border-radius: 2rem; padding: 3rem; box-shadow: 0 20px 60px rgba(0,0,0,0.06); border: 1px solid #edf2f7; position: relative; }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .admin-field-group { display: flex; flex-direction: column; gap: 0.6rem; }
        .admin-field-group.full { grid-column: 1 / -1; }
        .admin-label { font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; }
        .admin-input-txt { width: 100%; padding: 1rem 1.2rem; border: 1.5px solid #e2e8f0; border-radius: 1rem; font-size: 0.95rem; background: #f8fafc; transition: 0.2s; color: #1e293b; font-weight: 500; font-family: inherit; }
        .admin-input-txt:focus { border-color: var(--atp-blue); background: white; outline: none; box-shadow: 0 0 0 4px rgba(0,85,120,0.1); }
        .admin-btn { padding: 0.8rem 1.5rem; border-radius: 1rem; font-weight: 800; font-size: 0.9rem; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; border: none; font-family: inherit; }
        .admin-btn-primary { background: var(--atp-blue); color: white; box-shadow: 0 10px 25px rgba(0,85,120,0.2); }
        .admin-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(0,85,120,0.3); }
        .admin-btn-secondary { background: #f1f5f9; color: #475569; }
        .admin-btn-secondary:hover { background: #e2e8f0; }
        .admin-btn-success { background: #10b981; color: white; }
        .admin-toast { position: fixed; bottom: 40px; right: 40px; background: #10b981; color: white; padding: 1.2rem 2.5rem; border-radius: 1.2rem; display: flex; align-items: center; gap: 12px; box-shadow: 0 15px 40px rgba(16,185,129,0.4); z-index: 1000; font-weight: 800; }
        .premium-upload-wrapper { display: flex; gap: 1.5rem; align-items: center; background: #f8fafc; padding: 1rem; border-radius: 1.2rem; border: 1.5px dashed #cbd5e1; }
        .upload-preview { width: 100px; height: 70px; background: white; border-radius: 0.8rem; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid #e2e8f0; flex-shrink: 0; }
        .upload-preview img { width: 100%; height: 100%; object-fit: cover; }
        .upload-controls { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
        .upload-btn-label { cursor: pointer; background: white; border: 1px solid #cbd5e1; padding: 0.5rem 1rem; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; width: fit-content; gap: 8px; transition: 0.2s; }
        .cv-card { background: white; border-radius: 1.5rem; border: 1px solid #edf2f7; padding: 1.5rem; transition: 0.3s; position: relative; }
        .cv-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.06); border-color: var(--atp-blue); }
        .cv-card-avatar { width: 60px; height: 60px; border-radius: 1rem; background: #f1f5f9; margin-bottom: 1.2rem; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .cv-card-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .cv-card-badge { position: absolute; top: 1rem; right: 1rem; padding: 4px 10px; border-radius: 99px; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; }
      `}</style>
      
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="admin-toast">
            <CheckCircle2 size={24} /> SITE MIS À JOUR AVEC SUCCÈS !
          </motion.div>
        )}
      </AnimatePresence>

      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">
           <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/atp_logo_transparent.png" alt="ATP Logo" style={{ width: '100%', objectFit: 'contain' }} />
           </div>
           <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 900 }}>CONSOLE ATP</h2>
              <p style={{ fontSize: '0.6rem', margin: 0, opacity: 0.5, fontWeight: 800, textTransform: 'uppercase' }}>Porte Nord</p>
           </div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
          {menuGroups.map((group, index) => (
            <div key={index} className="admin-sidebar-group">
              <div className="admin-sidebar-group-title">{group.title}</div>
              {group.items.map(item => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setEditingItemIndex(null); }} className={`admin-menu-btn ${activeTab === item.id ? 'active' : ''}`}>
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ padding: '0 15px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={handlePublish} className="admin-btn admin-btn-success" style={{ width: '100%', justifyContent: 'center' }}>
            <UploadCloud size={18} /> PUBLIER LE SITE
          </button>
          <Link href="/" target="_blank" className="admin-btn admin-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}><ExternalLink size={16}/> Voir le site public</Link>
          <button onClick={() => setIsAuthenticated(false)} className="admin-btn admin-btn-secondary" style={{ width: '100%', justifyContent: 'center', color: '#ef4444', marginTop: '10px', background: 'rgba(239,68,68,0.05)' }}><LogOut size={18} /> Déconnexion</button>
        </div>
      </div>

      <div className="admin-content" style={{ padding: '30px' }}>
        <div className="admin-header" style={{ padding: '15px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', borderRadius: '20px', marginBottom: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <div style={{ position: 'relative' }}>
               <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
               <input type="text" placeholder="Rechercher un membre, une facture, un mot-clé..." className="admin-input-txt" style={{ paddingLeft: '48px', width: '380px', borderRadius: '99px', background: '#f8fafc', border: '1px solid transparent', transition: 'all 0.3s' }} onFocus={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'var(--atp-blue)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(0,58,92,0.1)'; }} onBlur={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }} />
             </div>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '50%', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}>
               <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></div>
               <Mail size={20} color="#475569" />
             </button>
             <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '50%', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}>
               <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></div>
               <Zap size={20} color="#475569" />
             </button>
             <div style={{ width: '1px', height: '35px', background: '#e2e8f0' }}></div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '6px 12px', borderRadius: '99px', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
               <img src="https://ui-avatars.com/api/?name=Saber+B&background=003a5c&color=fff&bold=true" alt="Admin" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
               <div>
                 <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: '#1e293b' }}>Saber Bouzaza</p>
                 <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Super Administrateur</p>
               </div>
               <ChevronDown size={16} color="#94a3b8" />
             </div>
           </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="admin-glass-card">
            
            {activeTab === 'overview' && (
              <div className="admin-grid">
                <div className="admin-field-group full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 className="admin-tab-title" style={{ marginBottom: '8px' }}><LayoutDashboard size={32}/> Vue d'ensemble</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Bienvenue sur votre nouvelle Console de Gestion Ultrapro.</p>
                  </div>
                  <button onClick={() => setActiveTab('analytics')} className="admin-btn admin-btn-primary"><BarChart3 size={18} /> Voir les Statistiques Détaillées</button>
                </div>
                
                <div className="admin-field-group" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '24px', borderRadius: '16px', color: 'white', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Users size={28} color="#cbd5e1" />
                  <h4 style={{ margin: 0, fontSize: '1rem', color: '#94a3b8' }}>Adhérents Actifs</h4>
                  <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>48</p>
                  <span style={{ fontSize: '0.8rem', color: '#10b981' }}>+12% ce mois-ci</span>
                </div>

                <div className="admin-field-group" style={{ background: 'linear-gradient(135deg, #003a5c, #002236)', padding: '24px', borderRadius: '16px', color: 'white', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <MapPin size={28} color="#93c5fd" />
                  <h4 style={{ margin: 0, fontSize: '1rem', color: '#93c5fd' }}>Trafic du site</h4>
                  <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>1,240</p>
                  <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Visiteurs uniques</span>
                </div>
                
                <div className="admin-field-group" style={{ background: 'linear-gradient(135deg, #c42b2e, #8a1d20)', padding: '24px', borderRadius: '16px', color: 'white', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Mail size={28} color="#fca5a5" />
                  <h4 style={{ margin: 0, fontSize: '1rem', color: '#fca5a5' }}>Nouveaux Messages</h4>
                  <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>3</p>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>À traiter dans la boîte de réception</span>
                </div>

                <div className="admin-field-group" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '24px', borderRadius: '16px', color: 'white', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Briefcase size={28} color="#a7f3d0" />
                  <h4 style={{ margin: 0, fontSize: '1rem', color: '#a7f3d0' }}>CV Reçus</h4>
                  <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>12</p>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Candidatures récentes</span>
                </div>
                
                <div className="admin-field-group full" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                  
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Zap size={20} color="var(--atp-red)"/> Actions Rapides</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '40px' }}>
                      <button onClick={() => setActiveTab('hero')} className="admin-btn admin-btn-secondary" style={{ justifyContent: 'flex-start', padding: '15px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}><Edit3 size={18} color="var(--atp-blue)"/> Modifier l'Accueil</button>
                      <button onClick={() => setActiveTab('inbox')} className="admin-btn admin-btn-secondary" style={{ justifyContent: 'flex-start', padding: '15px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}><Mail size={18} color="#10b981"/> Voir les Messages</button>
                      <button onClick={() => setActiveTab('directory')} className="admin-btn admin-btn-secondary" style={{ justifyContent: 'flex-start', padding: '15px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}><Building2 size={18} color="#f59e0b"/> Annuaire Entreprises</button>
                      <button onClick={() => setActiveTab('organigramme')} className="admin-btn admin-btn-secondary" style={{ justifyContent: 'flex-start', padding: '15px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}><Users size={18} color="#8b5cf6"/> Gérer le Comité</button>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Calendar size={20} color="var(--atp-blue)"/> Flux d'Activité Récente</h4>
                    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                      {[
                        { time: 'Aujourd\'hui, 14:30', title: 'Nouvelle candidature reçue', type: 'cv', color: '#10b981' },
                        { time: 'Hier, 09:15', title: 'Demande de contact : Entreprise Dubois', type: 'msg', color: '#3b82f6' },
                        { time: 'Hier, 16:45', title: 'Mise à jour de l\'Organigramme', type: 'system', color: '#8b5cf6' },
                        { time: '12 Juin, 11:00', title: 'Nouvelle adhésion en attente', type: 'member', color: '#f59e0b' }
                      ].map((activity, i) => (
                        <div key={i} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: i !== 3 ? '1px solid #f1f5f9' : 'none' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: activity.color }}></div>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem' }}>{activity.title}</p>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{activity.time}</span>
                          </div>
                          <button className="admin-btn admin-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Voir</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Shield size={20} color="#10b981"/> État du Système</h4>
                    <div style={{ background: '#0f172a', borderRadius: '16px', padding: '24px', color: 'white' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Serveur Principal</span>
                        <span style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800 }}>EN LIGNE</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Base de données</span>
                        <span style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800 }}>SYNCHRONISÉE</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Certificat SSL</span>
                        <span style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800 }}>VALIDE</span>
                      </div>
                      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Espace de stockage</span>
                          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '8px' }}>
                            <div style={{ width: '35%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', borderRadius: '10px' }}></div>
                          </div>
                          <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '6px', color: '#cbd5e1' }}>1.2 GB / 5 GB</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <AdminAnalytics />
            )}

            {activeTab === 'inbox' && (
              <AdminInbox />
            )}

            {activeTab === 'popup' && (
              <div className="admin-grid">
                <div className="admin-field-group full">
                  <h3 className="admin-tab-title"><Sparkles size={32}/> Pop-up d'Information</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Configurez et activez une fenêtre pop-up qui s'affichera au centre de l'écran des visiteurs (page d'accueil).
                  </p>
                </div>
                
                <div className="admin-field-group full" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', background: content.popup?.enabled ? '#ecfdf5' : '#f8fafc', padding: '20px', borderRadius: '16px', border: `1px solid ${content.popup?.enabled ? '#10b981' : '#e2e8f0'}` }}>
                  <label className="admin-label" style={{ margin: 0 }}>Statut de la Pop-up :</label>
                  <button onClick={() => handleChange(['popup', 'enabled'], !content.popup?.enabled)} className={`admin-btn ${content.popup?.enabled ? 'admin-btn-success' : 'admin-btn-secondary'}`}>
                    {content.popup?.enabled ? '✅ ACTIVÉE' : '❌ DÉSACTIVÉE'}
                  </button>
                </div>

                <div className="admin-field-group full">
                  <label className="admin-label">Titre</label>
                  <input value={content.popup?.title || ''} onChange={e => handleChange(['popup', 'title'], e.target.value)} className="admin-input-txt" />
                </div>
                
                <div className="admin-field-group full">
                  <label className="admin-label">Message (Texte)</label>
                  <textarea value={content.popup?.message || ''} onChange={e => handleChange(['popup', 'message'], e.target.value)} className="admin-input-txt" rows={4} />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Texte du bouton</label>
                  <input value={content.popup?.linkText || ''} onChange={e => handleChange(['popup', 'linkText'], e.target.value)} className="admin-input-txt" placeholder="Ex: En savoir plus" />
                </div>
                
                <div className="admin-field-group">
                  <label className="admin-label">Lien du bouton</label>
                  <input value={content.popup?.linkUrl || ''} onChange={e => handleChange(['popup', 'linkUrl'], e.target.value)} className="admin-input-txt" placeholder="/actions ou https://..." />
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><LayoutDashboard size={32}/> Accueil (Hero)</h3></div>
                <div className="admin-field-group">
                  <label className="admin-label">Surtitre</label>
                  <input value={content.home.hero.subtitle} onChange={e => handleChange(['home', 'hero', 'subtitle'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Focus Titre (Rouge)</label>
                  <input value={content.home.hero.titleHighlight} onChange={e => handleChange(['home', 'hero', 'titleHighlight'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group full">
                  <label className="admin-label">Titre Principal</label>
                  <input value={content.home.hero.titleText} onChange={e => handleChange(['home', 'hero', 'titleText'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group full">
                   <label className="admin-label">Introduction</label>
                   <textarea value={content.home.hero.intro} onChange={e => handleChange(['home', 'hero', 'intro'], e.target.value)} className="admin-input-txt" rows={5} />
                </div>
                <div className="admin-field-group full">
                   <PremiumImageUpload value={content.home.hero.logoImage} onChange={v => handleChange(['home', 'hero', 'logoImage'], v)} label="Logo Officiel" />
                </div>
                <div className="admin-field-group full">
                  <label className="admin-label">Lien Vidéo de Présentation (YouTube ou lien local)</label>
                  <input value={content.home.hero.videoUrl || ''} onChange={e => handleChange(['home', 'hero', 'videoUrl'], e.target.value)} className="admin-input-txt" placeholder="https://www.youtube.com/embed/... ou /video.mp4" />
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><Video size={32}/> Vidéos</h3></div>
                
                <div className="admin-field-group full" style={{ marginBottom: '1.5rem' }}>
                  <label className="admin-label">Vidéo Matinales Économiques (Accueil & Page Actions)</label>
                  <input value={content.home.matinalesVideoUrl || ''} onChange={e => handleChange(['home', 'matinalesVideoUrl'], e.target.value)} className="admin-input-txt" placeholder="URL Youtube (ex: https://www.youtube.com/embed/...)" />
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Entrez le lien direct d'une vidéo YouTube (utiliser le lien 'embed') ou un lien vers un fichier local (.mp4).</p>
                </div>
                
                <div className="admin-field-group full">
                  <label className="admin-label">Vidéo Objectif Emploi / Alternance</label>
                  <input value={content.home.emploiVideoUrl || ''} onChange={e => handleChange(['home', 'emploiVideoUrl'], e.target.value)} className="admin-input-txt" placeholder="URL Youtube (ex: https://www.youtube.com/embed/...)" />
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Entrez le lien direct d'une vidéo YouTube ou un lien vers un fichier local (.mp4).</p>
                </div>
              </div>
            )}

            {activeTab === 'cvtheque' && (
              <AdminCandidates content={content} />
            )}

            {activeTab === 'members' && (
              <AdminMembers />
            )}

            {activeTab === 'security' && (
              <AdminSecurity />
            )}

            {activeTab === 'banner' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><ImageIcon size={32}/> Bannière Actus</h3></div>
                <div className="admin-field-group full">
                  <label className="admin-label">Surtitre</label>
                  <input value={content.home.banner.subtitle || ''} onChange={e => handleChange(['home', 'banner', 'subtitle'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group full">
                  <label className="admin-label">Titre</label>
                  <input value={content.home.banner.title || ''} onChange={e => handleChange(['home', 'banner', 'title'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group full">
                  <label className="admin-label">Description</label>
                  <textarea value={content.home.banner.text || ''} onChange={e => handleChange(['home', 'banner', 'text'], e.target.value)} className="admin-input-txt" rows={4} />
                </div>
                <div className="admin-field-group full">
                  <PremiumImageUpload value={content.home.banner.image || ''} onChange={v => handleChange(['home', 'banner', 'image'], v)} label="Image Bannière" />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Texte du bouton</label>
                  <input value={content.home.banner.buttonText || ''} onChange={e => handleChange(['home', 'banner', 'buttonText'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Lien du bouton (URL)</label>
                  <input value={content.home.banner.buttonLink || ''} onChange={e => handleChange(['home', 'banner', 'buttonLink'], e.target.value)} className="admin-input-txt" placeholder="https://..." />
                </div>
              </div>
            )}

            {activeTab === 'directory' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <h3 className="admin-tab-title" style={{ margin: 0 }}><Building2 size={32}/> Annuaire & Emploi</h3>
                  <button onClick={() => {
                    setEditingItemIndex('new');
                    setCurrentItem({ name: '', sector: '', description: '', zone: '', logo: '', phone: '', email: '', employees: '', slug: '', jobOffers: [] });
                  }} className="admin-btn admin-btn-primary"><Plus size={18}/> Ajouter une entreprise</button>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem' }}>Ressources de l'Annuaire</h4>
                  <PremiumFileUpload 
                    label="Uploader le Guide des Entreprises (PDF)" 
                    value={content.directory?.guidePdf || ''} 
                    onChange={(v) => handleChange(['directory', 'guidePdf'], v)} 
                  />
                </div>

                {editingItemIndex !== null ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '2rem', border: '1px solid #e2e8f0' }}>
                    <div className="admin-grid">
                      <div className="admin-field-group full"><h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Informations de l'entreprise</h4></div>
                      <div className="admin-field-group">
                        <label className="admin-label">Nom</label>
                        <input value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} className="admin-input-txt" />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Secteur</label>
                        <input value={currentItem.sector || ''} onChange={e => setCurrentItem({ ...currentItem, sector: e.target.value })} className="admin-input-txt" />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Zone</label>
                        <input value={currentItem.zone || ''} onChange={e => setCurrentItem({ ...currentItem, zone: e.target.value })} className="admin-input-txt" />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Effectifs</label>
                        <input value={currentItem.employees || ''} onChange={e => setCurrentItem({ ...currentItem, employees: e.target.value })} className="admin-input-txt" />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Téléphone</label>
                        <input value={currentItem.phone || ''} onChange={e => setCurrentItem({ ...currentItem, phone: e.target.value })} className="admin-input-txt" />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Email</label>
                        <input value={currentItem.email || ''} onChange={e => setCurrentItem({ ...currentItem, email: e.target.value })} className="admin-input-txt" />
                      </div>
                      <div className="admin-field-group full">
                        <label className="admin-label">Description</label>
                        <textarea value={currentItem.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} className="admin-input-txt" rows={4} />
                      </div>
                      <PremiumImageUpload value={currentItem.logo || ''} onChange={v => setCurrentItem({ ...currentItem, logo: v })} label="Logo entreprise" />
                      <PremiumImageUpload value={currentItem.coverImage || ''} onChange={v => setCurrentItem({ ...currentItem, coverImage: v })} label="Image de couverture" />

                      {/* Job offers management */}
                      <div className="admin-field-group full" style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}><Briefcase size={18} style={{ marginRight: 8 }}/> Offres d'emploi ({(currentItem.jobOffers || []).length})</h4>
                          <button onClick={() => {
                            const offers = [...(currentItem.jobOffers || [])];
                            offers.push({ id: `job-${Date.now()}`, title: '', type: 'CDI', sector: currentItem.sector || '', location: currentItem.zone || '', salary: '', description: '', requirements: [], published: new Date().toISOString().split('T')[0] });
                            setCurrentItem({ ...currentItem, jobOffers: offers });
                          }} className="admin-btn admin-btn-secondary" style={{ padding: '0.5rem 1rem' }}><Plus size={14}/> Ajouter une offre</button>
                        </div>
                        {(currentItem.jobOffers || []).map((job: any, ji: number) => (
                          <div key={ji} style={{ background: 'white', padding: '1.5rem', borderRadius: '1.2rem', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                            <div className="admin-grid">
                              <div className="admin-field-group">
                                <label className="admin-label">Intitulé du poste</label>
                                <input value={job.title || ''} onChange={e => {
                                  const offers = [...(currentItem.jobOffers || [])];
                                  offers[ji] = { ...offers[ji], title: e.target.value };
                                  setCurrentItem({ ...currentItem, jobOffers: offers });
                                }} className="admin-input-txt" />
                              </div>
                              <div className="admin-field-group">
                                <label className="admin-label">Type de contrat</label>
                                <input value={job.type || ''} onChange={e => {
                                  const offers = [...(currentItem.jobOffers || [])];
                                  offers[ji] = { ...offers[ji], type: e.target.value };
                                  setCurrentItem({ ...currentItem, jobOffers: offers });
                                }} className="admin-input-txt" placeholder="CDI, CDD, Alternance..." />
                              </div>
                              <div className="admin-field-group">
                                <label className="admin-label">Salaire</label>
                                <input value={job.salary || ''} onChange={e => {
                                  const offers = [...(currentItem.jobOffers || [])];
                                  offers[ji] = { ...offers[ji], salary: e.target.value };
                                  setCurrentItem({ ...currentItem, jobOffers: offers });
                                }} className="admin-input-txt" />
                              </div>
                              <div className="admin-field-group">
                                <label className="admin-label">Lieu</label>
                                <input value={job.location || ''} onChange={e => {
                                  const offers = [...(currentItem.jobOffers || [])];
                                  offers[ji] = { ...offers[ji], location: e.target.value };
                                  setCurrentItem({ ...currentItem, jobOffers: offers });
                                }} className="admin-input-txt" />
                              </div>
                              <div className="admin-field-group full">
                                <label className="admin-label">Description</label>
                                <textarea value={job.description || ''} onChange={e => {
                                  const offers = [...(currentItem.jobOffers || [])];
                                  offers[ji] = { ...offers[ji], description: e.target.value };
                                  setCurrentItem({ ...currentItem, jobOffers: offers });
                                }} className="admin-input-txt" rows={3} />
                              </div>
                              <div className="admin-field-group full">
                                <label className="admin-label">Prérequis (un par ligne)</label>
                                <textarea value={(job.requirements || []).join('\n')} onChange={e => {
                                  const offers = [...(currentItem.jobOffers || [])];
                                  offers[ji] = { ...offers[ji], requirements: e.target.value.split('\n').filter((r: string) => r.trim()) };
                                  setCurrentItem({ ...currentItem, jobOffers: offers });
                                }} className="admin-input-txt" rows={3} placeholder="Un prérequis par ligne..." />
                              </div>
                              <div className="admin-field-group full" style={{ textAlign: 'right' }}>
                                <button onClick={() => {
                                  if (window.confirm("Supprimer cette offre ?")) {
                                    const offers = [...(currentItem.jobOffers || [])];
                                    offers.splice(ji, 1);
                                    setCurrentItem({ ...currentItem, jobOffers: offers });
                                  }
                                }} className="admin-btn" style={{ background: '#fee2e2', color: '#ef4444', display: 'inline-flex' }}><Trash2 size={14}/> Supprimer l'offre</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="admin-field-group full" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button onClick={() => {
                          const nl = [...(content.directory?.companies || [])];
                          if (editingItemIndex === 'new') nl.unshift({ ...currentItem });
                          else nl[editingItemIndex as number] = currentItem;
                          handleChange(['directory', 'companies'], nl);
                          setEditingItemIndex(null);
                        }} className="admin-btn admin-btn-primary">Enregistrer</button>
                        <button onClick={() => setEditingItemIndex(null)} className="admin-btn admin-btn-secondary">Annuler</button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {(content.directory?.companies || []).map((c: any, i: number) => (
                      <div key={i} className="cv-card">
                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                          <div className="cv-card-avatar">
                            {c.logo ? <img src={c.logo} alt={c.name} /> : <Building2 size={28} color="#94a3b8" />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 900 }}>{c.name}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--atp-blue)', fontWeight: 800, margin: '0 0 2px' }}>{c.sector}</p>
                            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>{c.employees ? `${c.employees} employés` : c.zone}</p>
                          </div>
                        </div>
                        {(c.jobOffers || []).length > 0 && (
                          <div style={{ marginTop: '0.8rem', padding: '0.4rem 0.8rem', background: '#f0fdf4', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: '#16a34a' }}>
                            <Briefcase size={12} style={{ marginRight: 4 }} /> {(c.jobOffers || []).length} offre(s) d'emploi
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                          <button onClick={() => { setCurrentItem({ ...c }); setEditingItemIndex(i); }} className="admin-btn admin-btn-secondary" style={{ flex: 1, padding: '0.5rem' }}><Edit3 size={14}/> Modifier</button>
                          <button onClick={() => {
                            if (window.confirm("Supprimer cette entreprise ?")) {
                              const nl = [...(content.directory?.companies || [])];
                              nl.splice(i, 1);
                              handleChange(['directory', 'companies'], nl);
                            }
                          }} style={{ background: '#fee2e2', color: '#ef4444' }} className="admin-btn"><Trash2 size={14}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'membership' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><Award size={32}/> Adhésion</h3></div>
                <div className="admin-field-group full">
                  <label className="admin-label">Titre</label>
                  <input value={content.membership.title || ''} onChange={e => handleChange(['membership', 'title'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group full">
                  <label className="admin-label">Sous-titre</label>
                  <input value={content.membership.subtitle || ''} onChange={e => handleChange(['membership', 'subtitle'], e.target.value)} className="admin-input-txt" />
                </div>

                {/* Benefits list */}
                <div className="admin-field-group full" style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label className="admin-label">Avantages adhérents</label>
                    <button onClick={() => {
                      const benefits = [...(content.membership.benefits || [])];
                      benefits.push({ title: '', description: '', icon: 'Star' });
                      handleChange(['membership', 'benefits'], benefits);
                    }} className="admin-btn admin-btn-secondary" style={{ padding: '0.4rem 1rem' }}><Plus size={14}/> Ajouter</button>
                  </div>
                  {(content.membership.benefits || []).map((b: any, i: number) => (
                    <div key={i} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.2rem', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                      <div className="admin-grid">
                        <div className="admin-field-group">
                          <label className="admin-label">Titre de l'avantage</label>
                          <input value={b.title || ''} onChange={e => {
                            const benefits = [...(content.membership.benefits || [])];
                            benefits[i] = { ...benefits[i], title: e.target.value };
                            handleChange(['membership', 'benefits'], benefits);
                          }} className="admin-input-txt" />
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-label">Icône (nom lucide)</label>
                          <input value={b.icon || ''} onChange={e => {
                            const benefits = [...(content.membership.benefits || [])];
                            benefits[i] = { ...benefits[i], icon: e.target.value };
                            handleChange(['membership', 'benefits'], benefits);
                          }} className="admin-input-txt" placeholder="Building2, Users, Shield..." />
                        </div>
                        <div className="admin-field-group full">
                          <label className="admin-label">Description</label>
                          <textarea value={b.description || ''} onChange={e => {
                            const benefits = [...(content.membership.benefits || [])];
                            benefits[i] = { ...benefits[i], description: e.target.value };
                            handleChange(['membership', 'benefits'], benefits);
                          }} className="admin-input-txt" rows={2} />
                        </div>
                        <div className="admin-field-group full" style={{ textAlign: 'right' }}>
                          <button onClick={() => {
                            if (window.confirm("Supprimer cet avantage ?")) {
                              const benefits = [...(content.membership.benefits || [])];
                              benefits.splice(i, 1);
                              handleChange(['membership', 'benefits'], benefits);
                            }
                          }} className="admin-btn" style={{ background: '#fee2e2', color: '#ef4444', display: 'inline-flex' }}><Trash2 size={14}/> Supprimer</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="admin-field-group full" style={{ marginTop: '1rem' }}>
                  <label className="admin-label">Lien HelloAsso (bouton d'adhésion)</label>
                  <input value={content.home.hero.primaryButtonLink || ''} onChange={e => handleChange(['home', 'hero', 'primaryButtonLink'], e.target.value)} className="admin-input-txt" placeholder="https://www.helloasso.com/..." />
                  <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem' }}>Ce lien est utilisé pour le bouton « Adhérer » sur la page d'accueil.</p>
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div>
                <h3 className="admin-tab-title"><Zap size={32}/> Nos Actions</h3>
                {(['matinales', 'forum', 'insertion', 'label'] as const).map((actionKey) => {
                  const action = (content.actions as any)?.[actionKey];
                  if (!action) return null;
                  const labels: Record<string, string> = { matinales: '☕ Matinales Économiques', forum: '🤝 Forum Emploi & Alternance', insertion: '🌱 Insertion Professionnelle', label: '🏅 Label Entreprise Engagée' };
                  return (
                    <details key={actionKey} style={{ background: '#f8fafc', borderRadius: '1.5rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', overflow: 'hidden' }}>
                      <summary style={{ padding: '1.5rem 2rem', cursor: 'pointer', fontWeight: 800, fontSize: '1rem', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {labels[actionKey] || actionKey}
                      </summary>
                      <div style={{ padding: '0 2rem 2rem' }}>
                        <div className="admin-grid">
                          <div className="admin-field-group full">
                            <label className="admin-label">Titre</label>
                            <input value={action.title || ''} onChange={e => handleChange(['actions', actionKey, 'title'], e.target.value)} className="admin-input-txt" />
                          </div>
                          <div className="admin-field-group full">
                            <label className="admin-label">Sous-titre</label>
                            <input value={action.subtitle || ''} onChange={e => handleChange(['actions', actionKey, 'subtitle'], e.target.value)} className="admin-input-txt" />
                          </div>
                          <div className="admin-field-group full">
                            <label className="admin-label">Introduction</label>
                            <textarea value={action.intro || ''} onChange={e => handleChange(['actions', actionKey, 'intro'], e.target.value)} className="admin-input-txt" rows={5} />
                          </div>
                          <div className="admin-field-group full">
                            <PremiumImageUpload value={action.mainImage || ''} onChange={v => handleChange(['actions', actionKey, 'mainImage'], v)} label="Image principale" />
                          </div>
                          {actionKey === 'matinales' && (
                            <div className="admin-field-group full" style={{ marginTop: '20px' }}>
                              <h4 style={{ marginBottom: '15px' }}>Dernières Matinales</h4>
                              {(action.recentMatinales || []).map((m: any, idx: number) => (
                                <div key={idx} style={{ background: 'white', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input value={m.period} onChange={e => {
                                      const newList = [...(action.recentMatinales || [])];
                                      newList[idx] = { ...newList[idx], period: e.target.value };
                                      handleChange(['actions', actionKey, 'recentMatinales'], newList);
                                    }} placeholder="Période (ex: 2025)" className="admin-input-txt" />
                                    <input value={m.title} onChange={e => {
                                      const newList = [...(action.recentMatinales || [])];
                                      newList[idx] = { ...newList[idx], title: e.target.value };
                                      handleChange(['actions', actionKey, 'recentMatinales'], newList);
                                    }} placeholder="Titre" className="admin-input-txt" />
                                    <input value={m.partner} onChange={e => {
                                      const newList = [...(action.recentMatinales || [])];
                                      newList[idx] = { ...newList[idx], partner: e.target.value };
                                      handleChange(['actions', actionKey, 'recentMatinales'], newList);
                                    }} placeholder="Partenaire" className="admin-input-txt" />
                                    <textarea value={m.desc} onChange={e => {
                                      const newList = [...(action.recentMatinales || [])];
                                      newList[idx] = { ...newList[idx], desc: e.target.value };
                                      handleChange(['actions', actionKey, 'recentMatinales'], newList);
                                    }} placeholder="Description" className="admin-input-txt" rows={3} />
                                  </div>
                                  <button onClick={() => {
                                    const newList = [...(action.recentMatinales || [])];
                                    newList.splice(idx, 1);
                                    handleChange(['actions', actionKey, 'recentMatinales'], newList);
                                  }} className="admin-btn" style={{ background: '#fee2e2', color: '#ef4444', padding: '8px' }}><Trash2 size={16}/></button>
                                </div>
                              ))}
                              <button onClick={() => {
                                const newList = [...(action.recentMatinales || []), { period: 'Année', title: 'Nouvelle matinale', partner: '', desc: '' }];
                                handleChange(['actions', actionKey, 'recentMatinales'], newList);
                              }} className="admin-btn admin-btn-primary" style={{ padding: '8px 16px' }}><Plus size={16}/> Ajouter</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            )}

            {activeTab === 'agenda' && (
              <AdminReservations />
            )}


            {activeTab === 'about' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><FileText size={32}/> Qui sommes-nous ?</h3></div>

                <div className="admin-field-group full" style={{ marginBottom: '20px', padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#0f172a' }}>Pacte Métropolitain (PDF)</h4>
                  <PremiumFileUpload 
                    label="Uploader le Pacte"
                    value={content.about.pactePdf || ''}
                    onChange={v => handleChange(['about', 'pactePdf'], v)}
                    accept=".pdf"
                  />
                </div>

                <div className="admin-field-group full">
                  <label className="admin-label">Titre</label>
                  <input value={content.about.heroTitle} onChange={e => handleChange(['about', 'heroTitle'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group full">
                   <PremiumImageUpload value={content.about.statsImage} onChange={v => handleChange(['about', 'statsImage'], v)} label="Image territoire" />
                </div>
                <div className="admin-field-group full">
                   <label className="admin-label">Paragraphe 1</label>
                   <textarea value={content.about.paragraph1} onChange={e => handleChange(['about', 'paragraph1'], e.target.value)} className="admin-input-txt" rows={5} />
                </div>
                <div className="admin-field-group full">
                   <label className="admin-label">Paragraphe 2</label>
                   <textarea value={content.about.paragraph2} onChange={e => handleChange(['about', 'paragraph2'], e.target.value)} className="admin-input-txt" rows={5} />
                </div>
              </div>
            )}

            {activeTab === 'president' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><UserSquare2 size={32}/> Mot du Président</h3></div>
                <div className="admin-field-group full">
                  <PremiumImageUpload value={content.president.image} onChange={v => handleChange(['president', 'image'], v)} label="Photo Président" />
                </div>
                <div className="admin-field-group full">
                   <label className="admin-label">Citation</label>
                   <textarea value={content.president.quote1} onChange={e => handleChange(['president', 'quote1'], e.target.value)} className="admin-input-txt" rows={3} />
                </div>
                <div className="admin-field-group full">
                   <label className="admin-label">Message principal</label>
                   <textarea value={content.president.paragraph1} onChange={e => handleChange(['president', 'paragraph1'], e.target.value)} className="admin-input-txt" rows={8} />
                </div>
              </div>
            )}

            {activeTab === 'organigramme' && (
              <AdminOrganigram />
            )}

            {activeTab === 'contact' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><Mail size={32}/> Contact</h3></div>
                <div className="admin-field-group">
                  <label className="admin-label">Email</label>
                  <input value={content.contact.email} onChange={e => handleChange(['contact', 'email'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label">Téléphone</label>
                  <input value={content.contact.phone} onChange={e => handleChange(['contact', 'phone'], e.target.value)} className="admin-input-txt" />
                </div>
                <div className="admin-field-group full">
                  <label className="admin-label">Adresse</label>
                  <input value={content.contact.address} onChange={e => handleChange(['contact', 'address'], e.target.value)} className="admin-input-txt" />
                </div>
              </div>
            )}

            {activeTab === 'media' && (
               <div>
                  <h3 className="admin-tab-title"><FolderOpen size={32}/> Médiathèque Cloud</h3>
                  <label className="upload-zone" style={{ border: '3px dashed #e2e8f0', background: '#f8fafc', padding: '4rem', borderRadius: '2.5rem', display: 'block', textAlign: 'center', cursor: 'pointer' }}>
                     <input type="file" multiple accept="image/*,video/*" hidden onChange={async (e) => {
                       if (!e.target.files) return;
                       const newMediaList = [...(content.mediaGallery || [])];
                       for(let i=0; i<e.target.files.length; i++) {
                         const url = await handleFileUpload({ target: { files: [e.target.files[i]] } } as any);
                         if (url) newMediaList.unshift({ url, name: e.target.files[i].name, type: e.target.files[i].type.startsWith('video') ? 'video' : 'image' });
                       }
                       handleChange(['mediaGallery'], newMediaList);
                       handlePublish();
                     }} />
                     <UploadCloud size={48} color="var(--atp-blue)" style={{ margin: '0 auto 1rem' }} />
                     <h4 style={{ fontWeight: 900 }}>Ajouter des médias</h4>
                     <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Cliquez pour sélectionner des images ou vidéos.</p>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                    {(content.mediaGallery || []).map((m: any, i: number) => (
                       <div key={i} className="cv-card" style={{ padding: '0.5rem' }}>
                          <div style={{ height: '120px', borderRadius: '1rem', overflow: 'hidden', background: '#eee' }}>
                             {m.type === 'video' ? <video src={m.url} /> : <img src={m.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                             <button onClick={() => { navigator.clipboard.writeText(m.url); alert("Copié !"); }} style={{ fontSize: '0.65rem', fontWeight: 800 }}>Lien</button>
                             <button onClick={() => {
                               if (window.confirm("Supprimer ?")) {
                                 const nl = [...content.mediaGallery];
                                 nl.splice(i, 1);
                                 handleChange(['mediaGallery'], nl);
                               }
                             }} style={{ color: 'red' }}><Trash2 size={14} /></button>
                          </div>
                       </div>
                    ))}
                  </div>
               </div>
            )}

            {activeTab === 'legals' && (
              <div className="admin-grid">
                <div className="admin-field-group full"><h3 className="admin-tab-title"><FileText size={32}/> Pages Légales</h3></div>
                
                <div className="admin-field-group full">
                  <label className="admin-label">Conditions Générales d'Utilisation (CGU)</label>
                  <textarea value={content.legal?.cgu || ''} onChange={e => handleChange(['legal', 'cgu'], e.target.value)} className="admin-input-txt" rows={8} />
                </div>
                
                <div className="admin-field-group full">
                  <label className="admin-label">Conditions Générales de Vente (CGV)</label>
                  <textarea value={content.legal?.cgv || ''} onChange={e => handleChange(['legal', 'cgv'], e.target.value)} className="admin-input-txt" rows={8} />
                </div>

                <div className="admin-field-group full">
                  <label className="admin-label">Mentions Légales</label>
                  <textarea value={content.legal?.mentions || ''} onChange={e => handleChange(['legal', 'mentions'], e.target.value)} className="admin-input-txt" rows={8} />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
