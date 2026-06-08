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
        const { data, error } = await supabase
          .from('site_settings')
          .select('content')
          .eq('id', 'global')
          .single();
        
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
    // Update local state immediately for snappy UI
    let updatedContent: SiteContent = { ...content };
    setContent(prev => {
      const newContent = { ...prev };
      let current: any = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      updatedContent = newContent;
      return newContent;
    });

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 'global', content: updatedContent });
      
      if (error) throw error;
    } catch (e) {
      console.error("Supabase save error:", e);
    }
  };

  const updateContent = async (section: keyof SiteContent, key: string, value: any) => {
    let updatedContent: SiteContent = { ...content };
    setContent(prev => {
      const newContent = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      };
      updatedContent = newContent;
      return newContent;
    });

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 'global', content: updatedContent });
      
      if (error) throw error;
    } catch(e) {
      console.error("Supabase save error:", e);
    }
  };

  if(loading) return <div className="min-h-screen flex items-center justify-center bg-atp-blue text-white">Chargement du contenu...</div>;

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

