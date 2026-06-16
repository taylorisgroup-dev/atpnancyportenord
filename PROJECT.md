# Project: ATP Nancy Next.js Refactor
# Scope: Global Architecture and Milestones

## Architecture
- **Framework**: Next.js (App Router), React, TypeScript.
- **Styling**: Tailwind CSS (carte blanche premium design).
- **Data Layer**: Supabase (reads from `site_settings` single row JSON blob via Server Components, writes via Server Actions).
- **Storage**: Supabase Storage (`media`, `cv_files`).
- **Serverless**: Next.js Route Handlers (e.g. Gemini CV extraction).
- **Auth**: Firebase/Supabase (existing config must be migrated).

## Code Layout
- `app/` - Next.js App Router routes
- `components/` - Reusable UI components
- `lib/` - Supabase client, types, utility functions
- `public/` - Static assets

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Foundation & Core Config | Next.js init, Tailwind config, fonts, layouts, Supabase/Firebase env vars and clients. | none | PLANNED |
| 2 | Data Layer & API | Define TypeScript interfaces matching existing `site_settings` JSON. Create Supabase data fetching utilities (Server Components friendly). Migrate `extract-cv` to Route Handler. | M1 | PLANNED |
| 3 | Public Pages (Static) | UI redesign (Home, About, President, Contact, Legal). Server-side render data from Supabase. | M2 | PLANNED |
| 4 | Public Pages (Dynamic) | UI redesign (Organigramme, Directory, Agenda, Job Offers, Actions). Client/Server hydration where needed. | M2 | PLANNED |
| 5 | Admin Dashboard & Auth | Migrate Admin UI. Protect routes. Implement Server Actions to safely mutate `site_settings` and upload files. | M2 | PLANNED |
| 6 | E2E Testing Pass | E2E Testing Track completion & Pass 100% of the test suite. | M3, M4, M5 | PLANNED |

## Interface Contracts
### Data Fetching
- `getSiteSettings()` -> `Promise<SiteContent>` (Server-side fetch to Supabase)
### Mutations
- `updateSiteSettings(newContent: SiteContent)` -> Server Action
### API Routes
- `POST /api/extract-cv` -> Receives PDF/File, returns extracted JSON using Gemini.
