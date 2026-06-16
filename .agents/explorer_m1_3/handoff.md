# Handoff Report - Milestone 1 Investigation

## 1. Observation
- The original project uses Vite as indicated by `vite.config.ts` and `index.html` loading `/src/main.tsx`.
- Inside `c:\Users\admin\.gemini\antigravity\scratch\atp-nancy-porte-nord\.env.local`, the following variables exist:
  - `VITE_FIREBASE_API_KEY=AIzaSyD4U_4wuCXbYROoC67zHTRMpgHQVCH0xP4`
  - `VITE_FIREBASE_AUTH_DOMAIN=atp-nancy-porte-nord.firebaseapp.com`
  - `VITE_FIREBASE_PROJECT_ID=atp-nancy-porte-nord`
  - `VITE_FIREBASE_STORAGE_BUCKET=atp-nancy-porte-nord.firebasestorage.app`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID=902387597915`
  - `VITE_FIREBASE_APP_ID=1:902387597915:web:c6f841b7357a57da2af57e`
  - `VITE_SUPABASE_URL=https://gisthzvybfnxsbchqiqk.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=...` (truncated for brevity)
  - `VITE_GEMINI_API_KEY=AIzaSyDkzGa08O4wGtEiQ37QHC_N9TiVNFCZw5wICI`
- `c:\Users\admin\.gemini\antigravity\scratch\atp-nancy-porte-nord\src\lib\supabase.ts` and `src\firebase.ts` initialize `@supabase/supabase-js` and `firebase` respectively using `import.meta.env`.
- `c:\Users\admin\.gemini\antigravity\scratch\atp-nancy-porte-nord\index.html` loads two Google Fonts: `Inter` and `Montserrat`.

## 2. Logic Chain
- To move to Next.js App Router, the command `npx create-next-app` is standard. It should be configured to use TypeScript, Tailwind, ESLint, App Router, and `src` directory to match typical modern Next.js setups.
- Environment variables in Next.js that need to be accessible on the client side must be prefixed with `NEXT_PUBLIC_` instead of `VITE_`. So the `.env.local` needs to be mapped to the new convention.
- The initialization code for Supabase and Firebase must use `process.env.NEXT_PUBLIC_*` instead of `import.meta.env.*`.
- The Next.js `app/layout.tsx` should use `next/font/google` to import `Inter` and `Montserrat` to preserve the design language of the original project.

## 3. Caveats
- `create-next-app` might prompt "Directory not empty" since `.agents` is inside `atp_nancy_nextjs`. The implementer must force the creation or create in a temp folder and move the files over.
- The `VITE_GEMINI_API_KEY` was exposed to the client in Vite. In Next.js, it is strongly recommended to keep it server-side. Thus, it is recommended to rename it simply to `GEMINI_API_KEY` and use Server Actions/Route Handlers for Gemini calls, preventing frontend exposure.

## 4. Conclusion
**Initialization Command:**
The implementer should execute:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
(Note: since the directory is not empty due to `.agents`, it's best to run `npx create-next-app@latest temp-app ...` and then move the contents of `temp-app` into `atp_nancy_nextjs`.)

**Environment Variables (.env.local):**
Create `.env.local` in the target directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD4U_4wuCXbYROoC67zHTRMpgHQVCH0xP4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=atp-nancy-porte-nord.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=atp-nancy-porte-nord
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=atp-nancy-porte-nord.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=902387597915
NEXT_PUBLIC_FIREBASE_APP_ID=1:902387597915:web:c6f841b7357a57da2af57e

NEXT_PUBLIC_SUPABASE_URL=https://gisthzvybfnxsbchqiqk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpc3RoenZ5YmZueHNiY2hxaXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NTQxMTUsImV4cCI6MjA5NjEzMDExNX0.pkHu4Vz59tDygZKl7QY40n_jITaTGSqfFGeXQb9W-So

GEMINI_API_KEY=AIzaSyDkzGa08O4wGtEiQ37QHC_N9TiVNFCZw5wICI
```

**Client Packages & Setup:**
```bash
npm install firebase @supabase/supabase-js
```

*Supabase (`src/lib/supabase.ts`):*
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

*Firebase (`src/lib/firebase.ts`):*
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

**Layout Setup (`src/app/layout.tsx`):**
```tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: "ATP Nancy Porte Nord — Réseau d'entreprises du Grand Nancy",
  description: "Association Territoire Projet Nancy Porte Nord — Réseau de plus de 40 entreprises sur 178 hectares à Maxéville.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-slate-900">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
```

## 5. Verification Method
- Ensure the `npm run dev` starts successfully.
- Verify that `process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID` resolves to `atp-nancy-porte-nord`.
- Check in the browser inspector that the `<html>` element has the correct generated classes for the Inter and Montserrat fonts.
