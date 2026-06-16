"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, UploadCloud, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const PremiumFileUpload = ({ value, onChange, label, accept = ".pdf" }: { value: string, onChange: (v: string) => void, label: string, accept?: string }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    try {
      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
      onChange(publicUrl);
    } catch (err) {
      console.error(err);
      alert("Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-field-group">
      <label className="admin-label">{label}</label>
      <div className="premium-upload-wrapper">
        <div className="upload-preview" style={{ background: value ? 'rgba(5, 150, 105, 0.1)' : 'var(--light-gray)' }}>
          {value ? <FileText size={24} color="#059669" /> : <UploadCloud size={24} color="var(--text-muted)" />}
        </div>
        <div className="upload-controls">
          <input type="text" value={value} onChange={e => onChange(e.target.value)} className="admin-input-txt" placeholder="URL du fichier..." />
          <label className="upload-btn-label">
            <input type="file" hidden accept={accept} onChange={handleUpload} disabled={uploading} />
            {uploading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Settings size={14}/></motion.div> : <UploadCloud size={14} />}
            <span>{uploading ? "Envoi..." : "Uploader"}</span>
          </label>
        </div>
      </div>
      {value && <p style={{ fontSize: '0.75rem', marginTop: '6px', color: '#059669' }}>✓ Fichier lié</p>}
    </div>
  );
};
