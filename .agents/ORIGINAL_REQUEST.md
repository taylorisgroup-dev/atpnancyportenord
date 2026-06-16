# Original User Request

## Initial Request — 2026-06-14T21:17:47Z

# Teamwork Project Prompt — Draft

> Status: Launched

Refondre, architecturer et perfectionner massivement le site web ATP Nancy Porte Nord. Le projet consiste à migrer l'application existante vers Next.js pour des performances extrêmes et un SEO parfait, tout en réinventant totalement le design (carte blanche) pour un rendu premium.

Working directory: c:\Users\admin\.gemini\antigravity\scratch\atp_nancy_nextjs
Integrity mode: development

## Requirements

### R1. Migration vers Next.js
Migrer l'ensemble des fonctionnalités du site existant (actuellement sous Vite/React) vers le framework Next.js (App Router). L'objectif est d'utiliser le Server-Side Rendering (SSR) et la génération statique pour garantir un temps de chargement instantané. Toutes les intégrations existantes (Supabase, Firebase, tableau de bord administrateur protégé) doivent rester 100% fonctionnelles.

### R2. Design "Carte Blanche" Premium
Réinventer totalement l'interface utilisateur (UI) et l'expérience utilisateur (UX) en partant de zéro. Le design final doit être ultra-moderne, fluide (micro-animations), avec un effet "Wow" digne des meilleures agences web. L'équipe a carte blanche sur l'esthétique, tant que l'ergonomie reste irréprochable sur ordinateur et mobile.

### R3. Optimisation SEO Technique Intégrée
Le référencement (SEO) doit être codé directement dans l'application de manière organique (balises Meta dynamiques, OpenGraph, sitemap généré automatiquement, structure HTML5 sémantique stricte). 

## Acceptance Criteria

### Perfection Technique et Visuelle
- [ ] L'application compile avec succès via la commande `npm run build` sous Next.js sans aucune erreur TypeScript.
- [ ] Le score d'audit Google Lighthouse (Performance, Accessibilité, Bonnes Pratiques, SEO) est strictement supérieur ou égal à 95/100 sur l'ensemble des pages publiques.
- [ ] Les données dynamiques (Organigramme, Annuaire, Vidéos) se chargent et s'affichent correctement depuis le backend Supabase existant.
- [ ] L'accès au panneau d'administration nécessite toujours l'authentification et permet la modification des données du site.
