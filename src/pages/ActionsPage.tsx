import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, MapPin, TrendingUp, Globe, Users, Zap, Briefcase, 
  Target, Star, Handshake, AlertCircle, ChevronRight, CheckCircle2, 
  Heart, UserCheck, FileText, Award, ArrowRight
} from 'lucide-react';
import { useContent } from '../cms/ContentContext';
import { VideoFrame } from '../components/ui/VideoFrame';

export const ActionMatinalesPage = () => {
  const { content } = useContent();
  const data = content.actions.matinales;

  const topics = [
    { icon: <Shield size={22} />, title: "Cyber-sécurité", desc: "Protection des PME face aux risques numériques croissants" },
    { icon: <MapPin size={22} />, title: "Aménagement & Mobilité", desc: "Voirie, signalétique, accessibilité et transport de la zone" },
    { icon: <TrendingUp size={22} />, title: "Développement Économique", desc: "Aides publiques, dispositifs France 2030 et opportunités d'expansion" },
    { icon: <Globe size={22} />, title: "Relations Institutionnelles", desc: "Dialogue direct avec élus, Métropole, Région et Préfecture" },
    { icon: <Users size={22} />, title: "Ressources Humaines", desc: "Recrutement, alternance, formation et GPEC territoriale" },
    { icon: <Zap size={22} />, title: "Transition & Innovation", desc: "Mutation industrielle, énergie verte et transformation digitale" },
  ];

  const recentMatinales = [
    { period: "2025", title: "La Cyber-sécurité en Entreprise", partner: "Expert cyber & ANSSI", desc: "Atelier opérationnel sur la protection des systèmes informatiques des PME de la zone. Sensibilisation aux risques et bonnes pratiques." },
    { period: "2025", title: "Matinale avec Lorr'up & son Directeur", partner: "Lorr'up — Agence de développement économique Nancy Sud Lorraine", desc: "Rencontre approfondie pour explorer les dispositifs d'accompagnement territorial, les aides à l'implantation et les projets de développement économique." },
    { period: "2025", title: "Matinale de Rentrée", partner: "Réseau ATP Porte Nord", desc: "Bilan complet de l'année passée et présentation de la feuille de route 2025-2026. Moment d'échange entre adhérents sur les priorités de l'association." },
    { period: "2025", title: "Réunion Acteurs Économiques de la Métropole", partner: "Métropole du Grand Nancy", desc: "Concertation élargie avec l'ensemble des acteurs économiques métropolitains sur les projets structurants d'aménagement et de développement territorial." },
    { period: "2024", title: "Développement & Aménagement du Territoire", partner: "Élus locaux et régionaux", desc: "Matinale dédiée aux grands projets d'infrastructure du secteur nord : voirie, zones logistiques et perspectives d'attractivité 2024-2026." },
    { period: "2024", title: "Petits Déjeuners Entrepreneurs", partner: "Réseau ATP Porte Nord", desc: "Série de rencontres informelles entre chefs d'entreprise de la zone. Networking de qualité et partage d'expertises dans un cadre convivial." },
  ];

  const partners = [
    { name: "Métropole du Grand Nancy", role: "Partenaire institutionnel" },
    { name: "Ville de Maxéville", role: "Collectivité hôte" },
    { name: "Préfecture de Meurthe-et-Moselle", role: "Institution d'État" },
    { name: "Région Grand Est", role: "Partenaire régional" },
    { name: "Lorr'up", role: "Agence de développement économique" },
    { name: "CCI Métropole Grand Nancy", role: "Chambre consulaire" },
  ];

  return (
    <div className="page-root">
      <div style={{ background: 'var(--charcoal-gray)', color: 'white', padding: '100px 0 60px', backgroundImage: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>ACTIONS ATP — DIALOGUE & GOUVERNANCE</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', lineHeight: 1.7, marginTop: '14px', fontSize: '1.02rem' }}>Le format trimestriel qui place les entrepreneurs au cœur des décisions locales.</p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '28px 0' }}>
        <div className="container" style={{ padding: '0 40px', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
          {[
            { val: '4×/an', label: 'Fréquence trimestrielle' },
            { val: '20+', label: 'Partenaires institutionnels' },
            { val: '17+', label: 'Années d\'éditions' },
            { val: '100%', label: 'Gratuit pour les adhérents' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 160px', textAlign: 'center', padding: '12px 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <strong style={{ fontSize: '1.8rem', display: 'block', color: 'white' }}>{s.val}</strong>
              <span style={{ fontSize: '0.75rem', opacity: 0.75, fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <span className="section-subtitle-small">LE FORMAT</span>
            <h2 style={{ marginTop: '8px', marginBottom: '20px' }}>{data.subtitle}</h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '20px' }}>{data.intro}</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '28px' }}>Chaque matinale accueille entre 20 et 40 participants — chefs d'entreprise membres de l'ATP et invités institutionnels — autour d'un petit-déjeuner de travail. Le format est délibérément informel pour faciliter les échanges authentiques, mais s'appuie sur une préparation rigoureuse des thématiques par le bureau de l'ATP.</p>
            <div style={{ background: 'var(--light-gray)', padding: '20px 24px', borderRadius: '14px', borderLeft: '4px solid var(--atp-red)' }}>
              <p style={{ fontWeight: 700, color: 'var(--atp-blue)', fontSize: '0.9rem' }}>Prochaine matinale</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>La date de la prochaine matinale sera communiquée aux adhérents par email et sur notre page agenda. Rejoignez l'ATP pour ne rien manquer.</p>
            </div>
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.12)', width: '100%', aspectRatio: '16/9', background: '#0f172a', display: 'flex', alignItems: 'center' }}>
            <VideoFrame url={content.home?.matinalesVideoUrl} />
          </div>
        </div>

        {/* Topics */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">AU PROGRAMME</span>
            <h2 style={{ marginTop: '8px' }}>Les thématiques abordées</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {topics.map((t, i) => (
              <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'flex-start', transition: 'box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '44px', height: '44px', background: i % 2 === 0 ? 'rgba(0,58,92,0.08)' : 'rgba(196,43,46,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: i % 2 === 0 ? 'var(--atp-blue)' : 'var(--atp-red)' }}>{t.icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px' }}>{t.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent matinales */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">HISTORIQUE</span>
            <h2 style={{ marginTop: '8px' }}>Nos dernières matinales</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentMatinales.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', gap: '24px', background: 'white', padding: '24px 28px', borderRadius: '16px', border: '1px solid #e5e7eb', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--light-gray)', padding: '8px 16px', borderRadius: '8px', fontWeight: 900, fontSize: '0.8rem', color: 'var(--atp-blue)', whiteSpace: 'nowrap', minWidth: '60px', textAlign: 'center' }}>{m.period}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 800, color: 'var(--charcoal-gray)', marginBottom: '4px', fontSize: '1rem' }}>{m.title}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--atp-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.partner}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '6px' }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '48px', marginBottom: '60px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--atp-blue)' }}>Nos partenaires institutionnels</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {partners.map((p, i) => (
              <div key={i} style={{ background: 'white', padding: '18px 20px', borderRadius: '14px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--atp-blue)', display: 'block' }}>{p.name}</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{p.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'var(--atp-blue)', color: 'white', padding: '50px 40px', borderRadius: '24px' }}>
          <h3 style={{ color: 'white', fontSize: '1.6rem', marginBottom: '12px' }}>Participez à la prochaine matinale</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '28px' }}>Les matinales sont réservées aux membres de l'ATP. Adhérez pour accéder à nos événements trimestriels.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'white', color: 'var(--atp-blue)', fontWeight: 800 }}>Adhérer à l'ATP 2026</a>
            <Link to="/agenda" className="btn btn-primary">Consulter l'agenda</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActionForumPage = () => {
  const { content } = useContent();
  const data = content.actions.forum;

  const initiatives = [
    {
      icon: <Briefcase size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
      title: "Forum Emploi de la Ville de Maxéville",
      desc: "Participation active et co-organisation du forum emploi annuel de Maxéville (2024, 2025). Mobilisation des entreprises membres pour accueillir des candidats locaux et présenter leurs offres d'emploi et d'alternance.",
      badge: "Récurrent"
    },
    {
      icon: <Target size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
      title: "Un Véhicule pour l'Emploi",
      desc: "Programme innovant mettant à disposition un véhicule pour faciliter la mobilité des demandeurs d'emploi de la zone, levant l'un des principaux freins à l'accès au travail pour les habitants des quartiers prioritaires.",
      badge: "2025"
    },
    {
      icon: <Star size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
      title: "L'Union Fait la Force",
      desc: "Le 23 mai 2025, à la Maison Régionale des Sports de Tomblaine, l'ATP a co-organisé un événement majeur de mobilisation emploi en présence de l'ensemble des institutions locales : Préfecture, Métropole, France Travail, acteurs de l'insertion.",
      badge: "Mai 2025"
    },
    {
      icon: <Handshake size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
      title: "Job Dating & Networking",
      desc: "Organisation de job datings dans nos locaux en collaboration avec les entreprises membres. Format accéléré permettant à des dizaines de candidats de rencontrer leurs futurs recruteurs en une seule matinée.",
      badge: "Régulier"
    },
    {
      icon: <Users size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
      title: "After-Work à Vida Padel",
      desc: "Événements de networking informel organisés en soirée au centre Vida Padel de Maxéville. Moment convivial pour renforcer les liens entre adhérents et accueillir de nouveaux membres dans une ambiance détendue.",
      badge: "2025"
    },
    {
      icon: <AlertCircle size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
      title: "Recrutement Alternant ATP",
      desc: "L'ATP accueille régulièrement des alternants dans sa structure pour développer les compétences des jeunes du territoire. En 2025, un job dating spécifique a été organisé en raison d'un afflux important de candidatures.",
      badge: "En cours"
    },
  ];

  const upcoming = [
    { title: "L'Union Fait la Force II", desc: "La suite du succès de 2025 — un événement encore plus ambitieux en préparation avec de nouveaux partenaires institutionnels.", status: "En préparation" },
    { title: "Braderie du Zénith", desc: "En partenariat avec les Marchés de France, une braderie professionnelle d'envergure au complexe du Zénith de Nancy.", status: "En cours" },
    { title: "Forum Économique des Banlieues — Paris", desc: "Déplacement de la délégation ATP au Forum Économique national. Représentation du territoire et nouvelles alliances stratégiques.", status: "Fin 2026" },
  ];

  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-red)', color: 'white', padding: '100px 0 60px', backgroundImage: `linear-gradient(rgba(140,30,35,0.85), rgba(140,30,35,0.85)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>EMPLOI & COMPÉTENCES</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.7, marginTop: '14px', fontSize: '1.02rem' }}>Mettre en relation les entreprises de la zone avec les talents du territoire — c'est notre engagement depuis 2006.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        {/* Intro */}
        <div style={{ maxWidth: '760px', margin: '0 auto 70px', textAlign: 'center' }}>
          <span className="section-subtitle-small">NOTRE ENGAGEMENT</span>
          <h2 style={{ marginTop: '8px', marginBottom: '20px' }}>{data.subtitle}</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{data.intro}</p>
        </div>

        {/* Initiatives grid */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">NOS INITIATIVES EMPLOI</span>
            <h2 style={{ marginTop: '8px' }}>Des actions concrètes pour le territoire</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {initiatives.map((init, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', background: init.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: init.color }}>{init.icon}</div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, background: init.color, color: 'white', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{init.badge}</span>
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '10px', fontSize: '1.02rem' }}>{init.title}</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{init.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured event: L'union fait la force */}
        <div style={{ background: 'var(--anthracite)', color: 'white', borderRadius: '24px', padding: '50px', marginBottom: '80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(196,43,46,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center', position: 'relative' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--atp-red)', display: 'block', marginBottom: '12px' }}>ÉVÉNEMENT PHARE — 23 MAI 2025</span>
              <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: 900, marginBottom: '16px' }}>L'Union Fait la Force</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '20px' }}>
                L'ATP Nancy Porte Nord a fédéré l'ensemble des acteurs économiques et institutionnels du territoire lors de cet événement majeur tenu à la <strong style={{ color: 'white' }}>Maison Régionale des Sports de Tomblaine</strong>.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75 }}>
                En présence de la Préfecture de Meurthe-et-Moselle, de la Métropole du Grand Nancy, de France Travail et des structures d'insertion, cette journée a démontré que le collectif est le moteur le plus puissant du développement territorial.
              </p>
            </div>
            <div style={{ flex: '0 0 260px' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: '28px' }}>
                {[
                  'Préfecture de Meurthe-et-Moselle',
                  'Métropole du Grand Nancy',
                  'France Travail',
                  'Structures d\'insertion partenaires',
                  'Entreprises membres ATP'
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 4 ? '12px' : 0 }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--atp-red)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-subtitle-small">À VENIR</span>
            <h2 style={{ marginTop: '8px' }}>Projets en cours de préparation</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {upcoming.map((u, i) => (
              <div key={i} style={{ background: 'var(--light-gray)', padding: '28px', borderRadius: '18px', borderLeft: '4px solid var(--atp-red)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <ChevronRight size={18} style={{ color: 'var(--atp-red)' }} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--atp-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(0,58,92,0.1)', padding: '3px 10px', borderRadius: '999px' }}>{u.status}</span>
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '10px' }}>{u.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner */}
        <div style={{ background: 'var(--light-gray)', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--atp-blue)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '16px' }}>Partenaire institutionnel</h4>
          <img src="https://upload.wikimedia.org/wikipedia/fr/0/07/Logo_R%C3%A9gion_Grand_Est_2016.svg" alt="Région Grand Est" style={{ height: '44px', margin: '0 auto 12px', display: 'block' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>L'ATP Nancy Porte Nord agit en partenariat avec la Région Grand Est dans le cadre des politiques d'emploi et de formation professionnelle du territoire.</p>
        </div>
      </div>
    </div>
  );
};

export const ActionInsertionPage = () => {
  const { content, defaultContent } = useContent();
  const data = content.actions.insertion;

  return (
    <div className="page-root">
      <div style={{ background: 'var(--atp-blue)', color: 'white', padding: '100px 0 60px', textAlign: 'center', backgroundImage: `linear-gradient(rgba(0,51,80,0.88), rgba(0,51,80,0.88)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>RSE & SOLIDARITÉ TERRITORIALE</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '540px', lineHeight: 1.7, marginTop: '14px', margin: '14px auto 0', fontSize: '1.02rem' }}>Notre conviction : une zone économique performante est une zone inclusive, solidaire et responsable.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        {/* Flagship project: RSA / CD54 */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ background: 'linear-gradient(135deg, var(--atp-blue) 0%, var(--atp-blue-light) 100%)', color: 'white', borderRadius: '28px', padding: '50px', marginBottom: '70px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '280px', height: '280px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '320px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '7px 16px', borderRadius: '999px', marginBottom: '20px' }}>
                <Star size={14} style={{ color: '#fbbf24' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Projet phare — Lancé en avril 2026</span>
              </div>
              <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 900, marginBottom: '16px', lineHeight: 1.2 }}>
                Co-portage RSA :<br />Insertion Professionnelle & CD54
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: '20px', fontSize: '1rem' }}>
                Depuis avril 2026, l'ATP Nancy Porte Nord co-porte un projet ambitieux avec le <strong style={{ color: 'white' }}>Conseil Départemental de Meurthe-et-Moselle (CD54)</strong> visant l'insertion professionnelle durable des allocataires du RSA.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                Ce dispositif cible spécifiquement trois profils particulièrement éloignés du marché du travail : les <strong style={{ color: 'white' }}>allocataires RSA sans activité</strong>, les <strong style={{ color: 'white' }}>travailleurs indépendants en difficulté</strong> et les <strong style={{ color: 'white' }}>alternants</strong>. L'ATP apporte son réseau d'entreprises membres pour créer des passerelles directes entre ces publics et les opportunités concrètes d'emploi présentes sur la zone Porte Nord.
              </p>
            </div>
            <div style={{ flex: '0 0 280px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px' }}>
                <h4 style={{ color: 'white', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', fontWeight: 800 }}>Publics ciblés</h4>
                {[
                  { label: 'Allocataires RSA sans activité', icon: <UserCheck size={16} /> },
                  { label: 'Travailleurs indépendants en difficulté', icon: <Briefcase size={16} /> },
                  { label: 'Alternants en recherche d\'emploi', icon: <FileText size={16} /> },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < 2 ? '14px' : 0, background: 'rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: '10px' }}>
                    <span style={{ color: '#fbbf24' }}>{p.icon}</span>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{p.label}</span>
                  </div>
                ))}
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>En partenariat avec</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', textAlign: 'center', marginTop: '4px' }}>Conseil Départemental 54</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '760px', margin: '0 auto 70px', textAlign: 'center' }}>{data.intro}</p>

        {/* Other initiatives */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle-small">NOS AUTRES ENGAGEMENTS</span>
            <h2 style={{ marginTop: '8px' }}>Solidarité & Inclusion au quotidien</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: <Heart size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
                title: "Solidarité Maroc — École de Marrakech",
                badge: "Janvier 2024",
                desc: "Action de solidarité internationale : financement de la construction d'une école pour un village sinistré à Marrakech, à hauteur de 6 000 euros. Un engagement humain fort de l'ATP et de ses adhérents au-delà des frontières."
              },
              {
                icon: <Users size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
                title: "Accueil de Stagiaires",
                badge: "Annuel",
                desc: "L'ATP accueille des stagiaires tout au long de l'année dans sa structure et encourage ses entreprises membres à faire de même. Un engagement continu pour permettre aux jeunes du territoire de découvrir le monde professionnel."
              },
              {
                icon: <Handshake size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
                title: "Participation aux Réunions GLPE",
                badge: "Régulier",
                desc: "L'ATP participe régulièrement aux Groupements Locaux de Prévention de l'Exclusion (GLPE) pour coordonner les actions d'insertion avec l'ensemble des partenaires institutionnels et associatifs du territoire."
              },
              {
                icon: <Shield size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
                title: "Loi Handicap — Réunion Préfecture 54",
                badge: "2025",
                desc: "Participation à la réunion organisée par la Préfecture de Meurthe-et-Moselle dans le cadre des 20 ans de la loi handicap. L'ATP s'engage pour l'accessibilité et l'inclusion des personnes en situation de handicap dans le monde du travail."
              },
              {
                icon: <Globe size={28} />, color: 'var(--atp-red)', bg: 'rgba(196,43,46,0.08)',
                title: "Solidarité Valence (Valencia)",
                badge: "2024",
                desc: "Mobilisation et collecte de solidarité en soutien aux victimes des inondations catastrophiques de Valencia (Espagne). Expression concrète de la solidarité internationale du réseau Porte Nord."
              },
              {
                icon: <TrendingUp size={28} />, color: 'var(--atp-blue)', bg: 'rgba(0,58,92,0.08)',
                title: "Développement International",
                badge: "En cours",
                desc: "Aide au développement économique à l'international pour les adhérents souhaitant exporter ou développer des partenariats transfrontaliers. Mise en réseau avec les organismes d'appui à l'export."
              },
            ].map((init, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', background: init.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: init.color }}>{init.icon}</div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, background: init.color, color: 'white', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{init.badge}</span>
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--atp-blue)', marginBottom: '10px', fontSize: '0.98rem' }}>{init.title}</h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{init.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GOUVERNANCE PREVIEW */}
        <div style={{ marginTop: '80px', marginBottom: '60px', textAlign: 'center' }}>
          <span className="section-subtitle-small">GOUVERNANCE</span>
          <h2 style={{ marginTop: '12px', marginBottom: '24px' }}>Un collectif au service du territoire</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '42rem', margin: '0 auto 40px', lineHeight: 1.6 }}>
            L'ATP Nancy Porte Nord est dirigée par un bureau exécutif et un comité élus, représentant la diversité des entreprises de notre zone d'activités.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {((content.organigram && content.organigram.length > 0) ? content.organigram : (defaultContent?.organigram || [])).slice(0, 5).map((member: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyItems: 'center', zIndex: 5 - i, marginLeft: i > 0 ? '-40px' : '0' }}>
                {member.photo ? <img src={member.photo} alt={member.lastName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Users size={32} style={{ color: '#cbd5e1', margin: 'auto' }}/>}
              </motion.div>
            ))}
            {content.organigram && content.organigram.length > 5 && (
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--atp-red)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginLeft: '-30px', zIndex: 0 }}>
                +{content.organigram.length - 5}
              </div>
            )}
          </div>
          
          <Link to="/organigramme" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            Découvrir notre équipe <ArrowRight size={18} />
          </Link>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '40px 48px', display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ color: 'var(--atp-blue)', fontSize: '1.4rem', marginBottom: '8px' }}>Vous souhaitez vous impliquer ?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Que vous soyez entrepreneur, institution ou structure d'insertion — rejoignons-nous pour agir ensemble.</p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">Nous contacter</Link>
            <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noopener noreferrer" className="btn btn-blue">Adhérer à l'ATP</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActionLabelPage = () => {
  const { content } = useContent();
  const data = content.actions.label;

  const criteria = [
    { icon: <Handshake size={20} />, title: "Engagement de synergie", desc: "Participer activement aux événements et initiatives de l'ATP au moins 2 fois par an." },
    { icon: <Heart size={20} />, title: "Respect mutuel", desc: "Adhérer aux valeurs de l'association : solidarité, proximité, bienveillance et professionnalisme." },
    { icon: <Globe size={20} />, title: "Implication locale", desc: "Contribuer au développement économique local et à l'attractivité de la zone Porte Nord." },
    { icon: <TrendingUp size={20} />, title: "Cotisation à jour", desc: "Être adhérent à jour de cotisation pour l'exercice en cours." },
  ];

  const benefits = [
    "Présence dans l'annuaire officiel de l'ATP Nancy Porte Nord",
    "Visibilité sur les supports de communication de l'association",
    "Accès prioritaire aux événements institutionnels",
    "Mise en avant lors des matinales économiques",
    "Réseau premium d'entreprises engagées",
    "Participation aux appels d'offres collectifs",
    "Droit d'afficher le label dans vos locaux et supports",
    "Accès aux données veille économique territoriale",
  ];

  return (
    <div className="page-root">
      <div style={{ background: 'var(--charcoal-gray)', color: 'white', padding: '100px 0 60px', textAlign: 'center', backgroundImage: `linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(${data.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ padding: '0 40px' }}>
          <span className="section-subtitle-small" style={{ color: 'rgba(255,255,255,0.7)' }}>QUALITÉ & RÉSEAU</span>
          <h2 style={{ color: 'white', fontSize: '2.4rem', marginTop: '8px' }}>{data.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.7, marginTop: '14px', margin: '14px auto 0', fontSize: '1.02rem' }}>Un engagement. Une distinction. Une communauté.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '70px 40px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto 70px', textAlign: 'center' }}>
          <Award style={{ margin: '0 auto 20px', color: 'var(--atp-red)', display: 'block' }} size={52} />
          <h2 style={{ marginBottom: '16px' }}>{data.subtitle}</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{data.intro}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '70px' }}>
          <div style={{ background: 'var(--light-gray)', borderRadius: '24px', padding: '40px' }}>
            <h3 style={{ color: 'var(--atp-blue)', marginBottom: '28px', fontSize: '1.3rem' }}>Critères d'obtention</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {criteria.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--atp-blue)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>{c.icon}</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--charcoal-gray)', display: 'block', marginBottom: '3px' }}>{c.title}</strong>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--atp-blue)', borderRadius: '24px', padding: '40px' }}>
            <h3 style={{ color: 'white', marginBottom: '28px', fontSize: '1.3rem' }}>Vos avantages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--atp-red)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', background: 'var(--light-gray)', borderRadius: '20px', padding: '44px' }}>
          <h3 style={{ marginBottom: '8px', color: 'var(--atp-blue)' }}>Obtenir le label 2026</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>Adhesión active + engagement territorial + cotisation à jour = Label Entreprise Engagée Porte Nord</p>
          <a href="https://www.helloasso.com/associations/maxeville-nancy-porte-nord/adhesions/cotisations-2026" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '14px 32px' }}>Adhérer & obtenir mon label 2026</a>
        </div>
      </div>
    </div>
  );
};
