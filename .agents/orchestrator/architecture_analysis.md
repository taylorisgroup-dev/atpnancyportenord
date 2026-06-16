# Architecture Analysis: Migration to Next.js

## 1. Pages and Routes
The existing project is a Vite-based Single Page Application (SPA) using `react-router-dom`. The routing is completely defined within a monolithic `App.tsx` file. During the migration to Next.js App Router, these should be mapped to individual directories inside the `app/` folder:

### Public Pages
- **`/` (Home):** Maps to `app/page.tsx`
- **`/about`:** Maps to `app/about/page.tsx`
- **`/president`:** Maps to `app/president/page.tsx`
- **`/organigramme`:** Maps to `app/organigramme/page.tsx`
- **`/directory`:** Maps to `app/directory/page.tsx`
- **`/agenda`:** Maps to `app/agenda/page.tsx`
- **`/offres-emploi`:** Maps to `app/offres-emploi/page.tsx`
- **`/anniversary` & `/anniversary/timeline`:** Maps to `app/anniversary/page.tsx` and `app/anniversary/timeline/page.tsx`
- **`/contact`:** Maps to `app/contact/page.tsx`

### Actions (Features & Initiatives)
- **`/actions/matinales`:** Maps to `app/actions/matinales/page.tsx`
- **`/actions/forum`:** Maps to `app/actions/forum/page.tsx`
- **`/actions/insertion`:** Maps to `app/actions/insertion/page.tsx`
- **`/actions/label`:** Maps to `app/actions/label/page.tsx`

### Protected & Admin Pages
- **`/adherent/login` & `/adherent-login`:** Maps to `app/adherent/login/page.tsx`
- **`/adherent/dashboard`:** Maps to `app/adherent/dashboard/page.tsx`
- **`/admin`:** Maps to `app/admin/page.tsx` (Dashboard for CMS)

### Legal Pages
- **`/cgu`, `/cgv`, `/mentions-legales`:** Can be a dynamic route `app/legal/[type]/page.tsx` or separate pages.

---

## 2. Data Models and Database Interactions (Supabase)
Currently, the application uses **Supabase** as its backend. However, instead of relational tables, the entire content of the site is stored as a massive JSON blob in a single table:
- **Table:** `site_settings`
- **Row Identity:** `id = 'global'`
- **Schema:** The JSON matches a `SiteContent` TypeScript interface (found in `src/cms/defaultContent.ts`).

### Main Content Sections within the JSON
- **`home`**, **`about`**, **`president`**, **`contact`**: Static text, images, and video URLs.
- **`directory`**: A list of `companies`, each containing metadata (name, sector, zone) and nested `jobOffers`.
- **`cvtheque`**: Contains parsed CV profiles of candidates.
- **`agenda` & `anniversary`**: Event dates, descriptions, and media.
- **`organigram` & `organigramGroups`**: Structure of the association's committee.
- **`adherents`**: List of members and their status.

### Migration Strategy for Next.js
In Next.js, loading this massive JSON client-side via a `ContentContext` (which currently enforces a 5-second artificial delay) is an anti-pattern. 
- **Server Components:** Fetch the `site_settings` data directly on the server (SSR or SSG) to eliminate loading spinners and improve SEO.
- **Database Refactoring (Optional but Recommended):** Split the JSON blob into relational tables (e.g., `companies`, `job_offers`, `events`, `profiles`) in Supabase to allow pagination, filtering (especially for the Directory and Job Offers), and faster reads/writes.

---

## 3. Core Components and Layout Structure
### Layout Components
- **`Navbar` & `Footer`:** Should be moved to `app/layout.tsx`. The Navbar includes scroll-detection logic that will remain a Client Component (`"use client"`), but the layout itself can wrap the app.
- **`PWAPrompt`:** Can be integrated into `app/layout.tsx` as a Client Component.

### Admin Dashboard (`src/admin/AdminDashboard.tsx`)
The Admin section is currently a large component that conditionally renders tabs to edit the `site_settings` JSON structure. 
- It updates the database using `updateNestedContent` which saves the entire JSON back to Supabase. 
- It handles file uploads to Supabase Storage (`media` and `cv_files` buckets).
- **Next.js Improvement:** The Admin Dashboard can leverage **Server Actions** to mutate data in Supabase without exposing API keys to the client.

### Serverless Functions -> Next.js API Routes
There is currently a Netlify function (`netlify/functions/extract-cv.ts`) which uses the Google Gemini API to parse uploaded CVs into structured JSON data.
- **Migration:** Move this function to a Next.js Route Handler: `app/api/extract-cv/route.ts`. The logic using `@google/generative-ai` can be preserved as-is.

---

## 4. Key Takeaways for Next.js Redesign
1. **Remove Client-Side Data Fetching Wait:** Replace the React `useEffect` + `useState` fetching in `ContentContext.tsx` with Next.js Server Components.
2. **Component Modularity:** Break down the monolithic `App.tsx`. Pages and their unique sections must be isolated into their respective directories.
3. **Styling & UI:** We have 'carte blanche' for the redesign, so the existing `index.css` can be replaced entirely with Tailwind CSS or CSS Modules, aligning with modern Next.js conventions.
4. **Data Mutability:** Use Next.js Server Actions for Admin dashboard saves instead of directly writing to Supabase from the browser client, enhancing security.
