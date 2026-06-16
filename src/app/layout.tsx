import type { Metadata } from 'next';
import './globals.css';
import { ContentProvider } from '@/cms/ContentContext';
import { AppLayout } from '@/components/layout/AppLayout';

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
    <html lang="fr">
      <body>
        <ContentProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </ContentProvider>
      </body>
    </html>
  );
}
