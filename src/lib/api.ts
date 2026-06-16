import { supabase } from './supabase';
import { SiteContent } from '@/types/site';

/**
 * Fetches the global site settings from Supabase.
 * This is designed to be used in Next.js Server Components.
 */
export async function getSiteSettings(): Promise<SiteContent> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('content')
    .eq('id', 'global')
    .single();

  if (error) {
    throw new Error(`Failed to fetch site settings: ${error.message}`);
  }

  if (!data || !data.content) {
    throw new Error('Site settings not found');
  }

  return data.content as SiteContent;
}
