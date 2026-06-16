# Milestone 1: Explorer Handoff

## 1. Observation
- The original project uses Vite and React, storing environment variables in `c:\Users\admin\.gemini\antigravity\scratch\atp-nancy-porte-nord\.env.local`.
- `.env.local` contains variables prefixed with `VITE_`: `VITE_FIREBASE_API_KEY`, `VITE_SUPABASE_URL`, etc.
- `src/lib/supabase.ts` and `src/firebase.ts` contain the initialization logic using `import.meta.env`.
- `index.html` specifies SEO metadata and uses Google Fonts `Inter` and `Montserrat`.

## 2. Logic Chain
- **Initialization**: A new Next.js App Router project needs to be created directly in the target directory using `create-next-app` with the appropriate flags (`--tailwind`, `--typescript`, `--eslint`, `--app`).
- **Environment Variables**: Next.js uses `NEXT_PUBLIC_` instead of `VITE_` for variables exposed to the browser. The variables in `.env.local` must be copied over and renamed.
- **Supabase/Firebase**: The packages `@supabase/supabase-js` and `firebase` need to be installed. The initialization code must be refactored to use `process.env.NEXT_PUBLIC_*`. Firebase requires a check to prevent re-initialization during hot-reloads (`getApps().length > 0`).
- **Root Layout**: The `app/layout.tsx` should use `next/font/google` to load the `Inter` and `Montserrat` fonts optimally and set up a basic React UI shell.

## 3. Caveats
- `VITE_GEMINI_API_KEY` is present in the `.env.local`. If you map it to `NEXT_PUBLIC_GEMINI_API_KEY`, it will be exposed to the client. If the Gemini calls are moved to Next.js API routes (Server Actions or Route Handlers), it should just be `GEMINI_API_KEY`.
- The `create-next-app` command will generate a default project structure. You may need to clean up `page.tsx` and `globals.css`.

## 4. Conclusion
**Step 1: Initialize Next.js**
Run the following command in `c:\Users\admin\.gemini\antigravity\scratch\atp_nancy_nextjs`:
```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*" --use-npm
```

**Step 2: Environment Variables**
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

**Step 3: Supabase & Firebase Setup**
```powershell
npm install @supabase/supabase-js firebase
```

`lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
```

`lib/firebase.ts`:
```typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
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

export const isFirebaseConfigured = !!firebaseConfig.projectId;

const app = getApps().length > 0 ? getApp() : (isFirebaseConfigured ? initializeApp(firebaseConfig) : null);
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
```

**Step 4: Root Layout**
Update `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

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
      <body className="font-sans antialiased bg-gray-50 text-slate-900 min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
```

## 5. Verification Method
- Execute `create-next-app` and `npm install`.
- Save `.env.local`, `lib/supabase.ts`, `lib/firebase.ts` and `app/layout.tsx`.
- Run `npm run dev` and check that the app builds successfully on `localhost:3000` with the specified fonts loaded.
