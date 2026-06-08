-- Script de migration Supabase : ATS, CRM et Réservations
-- A exécuter dans le SQL Editor de Supabase (https://supabase.com/dashboard/project/_/sql)

-- 1. Table des Demandes de Contact
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  company_name text,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived'))
);

-- 2. Table des Candidats (CVthèque)
CREATE TABLE IF NOT EXISTS public.candidates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  title text NOT NULL,
  sector text NOT NULL,
  experience_years integer DEFAULT 0,
  availability text,
  skills text[] DEFAULT '{}',
  languages text[] DEFAULT '{}',
  summary text,
  cv_url text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'hired', 'inactive'))
);

-- 3. Table des Offres d'Emploi (extraites des entreprises)
CREATE TABLE IF NOT EXISTS public.job_offers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  company_name text NOT NULL,
  title text NOT NULL,
  sector text NOT NULL,
  contract_type text,
  location text,
  salary text,
  description text,
  requirements text[] DEFAULT '{}',
  status text DEFAULT 'open' CHECK (status IN ('open', 'closed'))
);

-- 4. Tables pour les Événements et Réservations
CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  date timestamp with time zone NOT NULL,
  location text,
  capacity integer DEFAULT 50,
  description text
);

CREATE TABLE IF NOT EXISTS public.reservations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
  attendee_name text NOT NULL,
  attendee_email text NOT NULL,
  attendee_company text,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled'))
);

-- CONFIGURATION DE LA SÉCURITÉ (RLS)
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Politiques pour les administrateurs (accès total)
DROP POLICY IF EXISTS "Admin full access on contact_requests" ON public.contact_requests;
CREATE POLICY "Admin full access on contact_requests" ON public.contact_requests FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access on candidates" ON public.candidates;
CREATE POLICY "Admin full access on candidates" ON public.candidates FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access on job_offers" ON public.job_offers;
CREATE POLICY "Admin full access on job_offers" ON public.job_offers FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access on events" ON public.events;
CREATE POLICY "Admin full access on events" ON public.events FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access on reservations" ON public.reservations;
CREATE POLICY "Admin full access on reservations" ON public.reservations FOR ALL USING (auth.role() = 'authenticated');

-- Politiques publiques (insertions uniquement pour formulaires)
DROP POLICY IF EXISTS "Public can insert contact_requests" ON public.contact_requests;
CREATE POLICY "Public can insert contact_requests" ON public.contact_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read active job_offers" ON public.job_offers;
CREATE POLICY "Public can read active job_offers" ON public.job_offers FOR SELECT USING (status = 'open');

DROP POLICY IF EXISTS "Public can read upcoming events" ON public.events;
CREATE POLICY "Public can read upcoming events" ON public.events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert reservations" ON public.reservations;
CREATE POLICY "Public can insert reservations" ON public.reservations FOR INSERT WITH CHECK (true);

-- 5. Table des Profils (Adhérents)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  first_name text,
  last_name text,
  company_name text,
  role text default 'adherent' check (role in ('adherent', 'admin')),
  status text default 'pending' check (status in ('pending', 'validated', 'suspended')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politiques pour les profils
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger pour la création automatique de profil après inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, company_name)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'first_name', 
    new.raw_user_meta_data->>'last_name', 
    new.raw_user_meta_data->>'company_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Storage pour CVs et Images
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true) ON CONFLICT DO NOTHING;
-- Politiques Storage peuvent être configurées via le Dashboard Supabase.
