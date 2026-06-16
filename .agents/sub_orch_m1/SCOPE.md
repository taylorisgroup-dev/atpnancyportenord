# Scope: Milestone 1: Foundation & Core Config

## Architecture
- Root Application Setup (Next.js App Router)
- Environment Variables configuration
- Backend API Clients initialization (Supabase, Firebase)
- UI Shell and Typography (Tailwind CSS, fonts)

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Foundation & Core Config | Init Next.js, copy env, install Supabase/Firebase, layout.tsx | none | PLANNED |

## Interface Contracts
### Client ↔ BaaS
- Supabase client configured with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Firebase client configured with necessary `NEXT_PUBLIC_FIREBASE_*` variables.
