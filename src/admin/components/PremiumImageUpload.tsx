import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Image as ImageIcon, Camera, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const PremiumImageUpload = ({ value, onChange, label }: { value: string, onChange: (v: string) => void, label: string }) => {
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
        <div className="upload-preview">
          {value ? <img src={value} alt="Preview" /> : <ImageIcon size={24} color="var(--atp-blue)" />}
        </div>
        <div className="upload-controls">
          <input type="text" value={value} onChange={e => onChange(e.target.value)} className="admin-input-txt" placeholder="Lien direct..." />
          <label className="upload-btn-label">
            <input type="file" hidden accept="image/*" onChange={handleUpload} disabled={uploading} />
            {uploading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Settings size={14}/></motion.div> : <Camera size={14} />}
            <span>{uploading ? "Envoi..." : "Choisir un fichier"}</span>
          </label>
        </div>
      </div>
    </div>
  );
};
