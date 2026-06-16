"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { HomePage } from '@/views/HomePage';
import { AboutPage } from '@/views/AboutPage';
import { PresidentPage, AnniversaryAgendaPage, TimelinePage, ContactPage, AllJobOffersPage, CVthequePage, AppelAProjetPage } from '@/AppComponents';
import { OrgChartPage } from '@/views/OrgChartPage';
import { DirectoryPage } from '@/views/DirectoryPage';
import { AgendaPage } from '@/views/AgendaPage';
import { ActionMatinalesPage, ActionForumPage, ActionInsertionPage, ActionLabelPage } from '@/views/ActionsPage';
import { AdherentLogin } from '@/views/AdherentLogin';
import { AdherentDashboard } from '@/views/AdherentDashboard';
import { AdminDashboard } from '@/admin/AdminDashboard';
import { LegalPage } from '@/views/LegalPage';
import { NotFoundPage } from '@/views/NotFoundPage';

export default function CatchAll() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';

  switch(slug) {
    case '': return <HomePage />;
    case 'about': return <AboutPage />;
    case 'president': return <PresidentPage />;
    case 'organigramme': return <OrgChartPage />;
    case 'directory': return <DirectoryPage />;
    case 'agenda': return <AgendaPage />;
    case 'actions/matinales': return <ActionMatinalesPage />;
    case 'actions/forum': return <ActionForumPage />;
    case 'actions/insertion': return <ActionInsertionPage />;
    case 'actions/label': return <ActionLabelPage />;
    case 'offres-emploi': return <AllJobOffersPage />;
    case 'cvtheque': return <CVthequePage />;
    case 'appel-a-projet': return <AppelAProjetPage />;
    case 'adherent/login': return <AdherentLogin />;
    case 'adherent-login': return <AdherentLogin />;
    case 'adherent/dashboard': return <AdherentDashboard />;
    case 'anniversary': return <AnniversaryAgendaPage />;
    case 'anniversary/timeline': return <TimelinePage />;
    case 'contact': return <ContactPage />;
    case 'admin': return <AdminDashboard />;
    case 'cgu': return <LegalPage type="cgu" />;
    case 'cgv': return <LegalPage type="cgv" />;
    case 'mentions-legales': return <LegalPage type="mentions" />;
    default: return <NotFoundPage />;
  }
}
