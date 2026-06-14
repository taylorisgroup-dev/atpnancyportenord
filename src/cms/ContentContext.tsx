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
        const [supabaseResponse] = await Promise.all([
          supabase
            .from('site_settings')
            .select('content')
            .eq('id', 'global')
            .single(),
          new Promise(resolve => setTimeout(resolve, 1500)) // Force display splash screen for 1.5s
        ]);
        
        const { data, error } = supabaseResponse;
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows returned'
          throw error;
        }

        if (data && data.content) {
          const loadedContent = { ...data.content };
          if (loadedContent.directory && loadedContent.directory.companies) {
            loadedContent.directory.companies = loadedContent.directory.companies.map((c: any) => ({
              ...c,
              premium: false
            }));
          }
          if (loadedContent.servicesMarketplace) {
            delete loadedContent.servicesMarketplace;
          }
          // Merge defaults with existing content to handle new fields
          setContent({ ...defaultContent, ...loadedContent });
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
        <img src="/atp_logo_white.png" alt="ATP Porte Nord" style={{ width: '160px', marginBottom: '30px', animation: 'pulse 2s infinite', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }} />
        <h2 style={{ color: 'white', letterSpacing: '0.05em', fontSize: '1.4rem', margin: 0, fontWeight: 800 }}>ATP NANCY PORTE NORD</h2>
        <div style={{ width: '40px', height: '4px', background: '#c42b2e', margin: '20px 0', borderRadius: '2px' }} />
        <span style={{ opacity: 0.7, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>Initialisation...</span>
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

