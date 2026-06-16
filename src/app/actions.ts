'use server';

import { supabase } from '@/lib/supabase';
import { SiteContent } from '@/types/site';
import { revalidatePath } from 'next/cache';

/**
 * Updates the global site settings in Supabase.
 * This is a Next.js Server Action.
 */
export async function updateSiteSettings(newContent: SiteContent) {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ id: 'global', content: newContent });

  if (error) {
    throw new Error(`Failed to update site settings: ${error.message}`);
  }

  // Revalidate the home page and other relevant paths so the new data is reflected immediately
  revalidatePath('/', 'layout');
}

/**
 * Uploads a file to a Supabase Storage bucket.
 * This is a Next.js Server Action.
 */
export async function uploadFile(bucket: string, path: string, formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file provided');
  }

  // Convert File to ArrayBuffer, then Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
}

