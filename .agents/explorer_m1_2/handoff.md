# Handoff Report: Milestone 1 - Foundation & Core Config

## 1. Observation
- The original Vite project (`c:\Users\admin\.gemini\antigravity\scratch\atp-nancy-porte-nord`) contains a `.env.local` file with the following variables:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_GEMINI_API_KEY`
- The `index.html` of the original project imports two Google Fonts: `Inter` (weights 400, 500, 600, 700) and `Montserrat` (weights 600, 700, 800).
- The `SCOPE.md` interface contract explicitly requires configuring Supabase and Firebase with `NEXT_PUBLIC_` prefixed variables.

## 2. Logic Chain
1. **Next.js Initialization**: Since we want the project directly in the Target Directory (`atp_nancy_nextjs`), the command `npx create-next-app@latest .` should be used with flags to enforce TypeScript, Tailwind, ESLint, App Router, and the `src/` directory pattern (which matches the original project's structure).
2. **Environment Variables**: Next.js requires environment variables exposed to the client to be prefixed with `NEXT_PUBLIC_`. All `VITE_` prefixes must be replaced in the new `.env.local` file.
3. **Backend Clients**: The Supabase and Firebase clients must be installed via `npm install @supabase/supabase-js firebase`. The initialization files (e.g., `src/lib/supabase.ts` and `src/lib/firebase.ts`) should reference the newly prefixed `NEXT_PUBLIC_` environment variables.
4. **Root Layout & Fonts**: Next.js has built-in font optimization via `next/font/google`. We should configure `Inter` and `Montserrat` in `src/app/layout.tsx` and inject them as CSS variables into the HTML body. We will also port basic SEO metadata from the original `index.html`.

## 3. Caveats
- The original `index.html` contained a Service Worker kill switch script. I have omitted it from the basic Next.js layout, as PWA setup in Next.js usually requires next-pwa or similar and can be handled separately if needed.
- `firebase` and `@supabase/supabase-js` dependencies will need to be explicitly installed after `create-next-app`.

## 4. Conclusion
Here are the recommended steps for the implementer:

### Step 1: Initialize Next.js
Run the following command in the Target Directory (`c:\Users\admin\.gemini\antigravity\scratch\atp_nancy_nextjs`):
```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

### Step 2: Environment Variables
Create a `.env.local` file in the Target Directory and copy over the values from the Original Project, renaming the prefixes:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

NEXT_PUBLIC_GEMINI_API_KEY=...
```

### Step 3: Install & Configure Clients
Run:
```powershell
npm install @supabase/supabase-js firebase
```

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Create `src/lib/firebase.ts`:
```typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Step 4: Root Layout Setup
Replace the contents of `src/app/layout.tsx` with:
```tsx
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'ATP Nancy Porte Nord — Réseau d\'entreprises du Grand Nancy',
  description: 'Association Territoire Projet Nancy Porte Nord — Réseau de plus de 40 entreprises sur 178 hectares à Maxéville.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-white text-gray-900">
        <main>{children}</main>
      </body>
    </html>
  );
}
```
*(Note: Ensure `tailwind.config.ts` is later updated to map `font-sans` to the Inter variable if exact font parity is required, e.g., `fontFamily: { sans: ['var(--font-inter)'] }`)*

## 5. Verification Method
1. Ensure the Target Directory contains `package.json`, `src/app/layout.tsx`, `src/lib/supabase.ts`, and `src/lib/firebase.ts`.
2. Run `npm run build` in the Target Directory to verify that Next.js compiles the layout and clients without type errors.
