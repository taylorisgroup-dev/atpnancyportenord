-- 1. Create the site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow everyone to read settings
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- 4. Create a policy to allow authenticated users to update settings
-- For now, we allow anyone with the anon key to update. 
-- IN PRODUCTION: restrict this to authenticated users only.
CREATE POLICY "Allow public update/insert" ON site_settings
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Create a storage bucket for media
-- IMPORTANT: Go to Supabase Dashboard > Storage and create a public bucket named 'media'
-- if the SQL below doesn't work in your environment.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage policies for the 'media' bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE WITH CHECK (bucket_id = 'media');
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'media');

-- 7. Create a storage bucket for cv_files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cv_files', 'cv_files', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Storage policies for the 'cv_files' bucket
CREATE POLICY "Public Access CV" ON storage.objects FOR SELECT USING (bucket_id = 'cv_files');
CREATE POLICY "Public Upload CV" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cv_files');
CREATE POLICY "Public Update CV" ON storage.objects FOR UPDATE WITH CHECK (bucket_id = 'cv_files');
CREATE POLICY "Public Delete CV" ON storage.objects FOR DELETE USING (bucket_id = 'cv_files');
