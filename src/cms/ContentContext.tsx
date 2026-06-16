"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultContent, SiteContent } from './defaultContent';
import { supabase } from '../lib/supabase';

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, key: string, value: any) => void;
  updateNestedContent: (path: string[], value: any) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  // Load content from Supabase on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Enforce a minimum 5-second delay for the loading animation and slogan
        const [{ data, error }] = await Promise.all([
          supabase
            .from('site_settings')
            .select('*')
            .eq('id', 'global')
            .single(),
          new Promise(resolve => setTimeout(resolve, 5000))
        ]);

        if (data) {
          // Backward compatibility check for older data structures
          let loadedContent = { ...data.content };
          if (Array.isArray(loadedContent.directory)) {
            loadedContent.directory = {
              guidePdf: '',
              companies: loadedContent.directory.map((c: any) => ({
                ...c,
                premium: false
              }))
            };
          }
          if (loadedContent.servicesMarketplace) {
            delete loadedContent.servicesMarketplace;
          }
          if (Array.isArray(loadedContent.organigram)) {
            loadedContent.organigram = loadedContent.organigram.map((m: any) => {
              if (m.group) {
                const { group, ...rest } = m;
                return { ...rest, groupId: group };
              }
              return m;
            });
          }
          if (!loadedContent.organigramGroups) {
            loadedContent.organigramGroups = defaultContent.organigramGroups;
          }
          // Deep merge defaults with existing content to handle new nested fields
          const merged = { ...defaultContent, ...loadedContent };
          if (loadedContent.home) {
            merged.home = { ...defaultContent.home, ...loadedContent.home };
            merged.home.hero = { ...defaultContent.home.hero, ...(loadedContent.home.hero || {}) };
            merged.home.banner = { ...defaultContent.home.banner, ...(loadedContent.home.banner || {}) };
          }
          if (loadedContent.about) merged.about = { ...defaultContent.about, ...loadedContent.about };
          if (loadedContent.popup) merged.popup = { ...defaultContent.popup, ...loadedContent.popup };
          if (loadedContent.directory) merged.directory = { ...defaultContent.directory, ...loadedContent.directory };
          if (loadedContent.membership) merged.membership = { ...defaultContent.membership, ...loadedContent.membership };
          if (loadedContent.legal) merged.legal = { ...defaultContent.legal, ...loadedContent.legal };

          
          setContent(merged);
        } else {
          // Initialize DB with defaults if nothing exists
          const { error: insertError } = await supabase
            .from('site_settings')
            .upsert({ id: 'global', content: defaultContent });
          
          if (insertError) console.error("Error initializing Supabase content:", insertError);
        }
      } catch (error) {
        console.error("Error loading CMS content from Supabase:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const updateNestedContent = async (path: string[], value: any) => {
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current[path[i]] = { ...current[path[i]] };
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    
    // Update local state immediately for snappy UI
    setContent(newContent);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 'global', content: newContent });
      
      if (error) throw error;
    } catch (e) {
      console.error("Supabase save error:", e);
    }
  };

  const updateContent = async (section: keyof SiteContent, key: string, value: any) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [key]: value
      }
    };
    
    setContent(newContent);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 'global', content: newContent });
      
      if (error) throw error;
    } catch(e) {
      console.error("Supabase save error:", e);
    }
  };

  if(loading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a, #003a5c)', color: 'white' }}>
        <style>
          {`
            @keyframes slideUpFade {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        <img src="/atp_logo_transparent.png" alt="ATP Porte Nord" style={{ width: '260px', marginBottom: '25px', animation: 'pulse 2.5s infinite', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))' }} />
        <h2 style={{ color: 'white', letterSpacing: '0.05em', fontSize: '1.6rem', margin: 0, fontWeight: 800 }}>ATP NANCY PORTE NORD</h2>
        <div style={{ marginTop: '15px', animation: 'slideUpFade 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}>
          <span style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#e2e8f0', letterSpacing: '0.02em' }}>Le réseau qui fait bouger la zone</span>
        </div>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, updateNestedContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

