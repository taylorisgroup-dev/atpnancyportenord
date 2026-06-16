import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useContent } from '../cms/ContentContext';
import { VideoFrame } from '../components/ui/VideoFrame';

export const HomePage = () => {
  const { content } = useContent();
  const { hero, banner } = content.home;

  return (
    <>
      <section className="hero-section" style={{ minHeight: 'auto', paddingBottom: '120px', overflow: 'visible' }}>
        <div className="digital-waves" style={{ overflow: 'hidden' }}>
          <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100px' }}><path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#ffffff" fillOpacity="0.05"></path></svg>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '60px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="hero-title" style={{ color: 'white', marginBottom: '15px', lineHeight: 1.15 }}>
              ATP Nancy Porte Nord <br/>
              <span className="text-gradient" style={{ filter: 'brightness(1.5)' }}>Bienvenue sur le site officiel</span>
            </h1>
            <span className="section-subtitle-small" style={{ marginBottom: '40px', display: 'inline-block' }}>
              <strong style={{ color: 'white', opacity: 0.9 }}>ASSOCIATION TERRITOIRE PROJET - FONDÉE EN MAI 2006</strong>
            </span>

            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="hover-video-card" style={{ width: '100%', maxWidth: '640px', margin: '0 auto 40px auto', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', border: '4px solid rgba(255,255,255,0.1)', aspectRatio: '16/9' }}>
              <VideoFrame url={hero.videoUrl} thumbnail="/atp_video_thumbnail.jpg" />
            </motion.div>

            <p className="hero-intro-text" style={{ fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '1050px', margin: '0 auto 40px', color: 'rgba(255,255,255,0.95)' }}>
              Depuis mai 2006, l'Association Territoire Projet fédère les entrepreneurs et entreprises de Maxéville et du Grand Nancy.<br className="hidden-mobile"/> Sur 178 hectares de zones d'activités, nous sommes le lien stratégique entre les acteurs économiques et les institutions locales, métropolitaines et régionales.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={hero.primaryButtonLink} target="_blank" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.15rem' }}>{hero.primaryButtonText}</a>
              <a href="#actions" className="btn btn-blue" style={{ padding: '16px 36px', fontSize: '1.15rem' }}>{hero.secondaryButtonText}</a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-60px' }}>
        <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }} className="banner-card" style={{ boxShadow: '0 25px 50px -12px rgba(0,34,54,0.15)', border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden' }}>
          <div className="banner-img-wrapper" style={{ backgroundImage: `url(${banner.image})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '300px' }}></div>
          <div className="banner-text-wrapper" style={{ padding: '40px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
            <span className="section-subtitle-small" style={{ color: 'var(--atp-red)', fontWeight: 900, letterSpacing: '0.15em', display: 'inline-block', marginBottom: '12px' }}>{banner.subtitle}</span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '16px', lineHeight: 1.2, color: 'var(--anthracite)', fontWeight: 900 }}>{banner.title}</h2>
            <p style={{ color: '#475569', marginBottom: '30px', fontSize: '1.15rem', lineHeight: 1.7 }}>{banner.text}</p>
            <div>
              <a href={banner.buttonLink} target="_blank" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem', borderRadius: '50px' }}>{banner.buttonText}</a>
            </div>
          </div>
        </motion.div>
      </div>

      <section id="actions" style={{ padding: '120px 0 90px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(0,58,92,0.03), transparent 40%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '70px', background: 'white', padding: '50px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--atp-red), #ff4d4d)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', boxShadow: '0 10px 25px rgba(226, 0, 26, 0.3)' }}>
              <Sparkles size={36} color="white" />
            </div>
            <span className="section-subtitle-small">NOTRE RAISON D'ÊTRE</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '15px', color: 'var(--anthracite)', marginTop: '10px' }}>Un catalyseur au service du territoire</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: '#475569', lineHeight: 1.8, fontSize: '1.25rem', fontStyle: 'italic' }}>"L'ATP Nancy Porte Nord ne se contente pas de fédérer. Nous agissons comme un <strong style={{color: 'var(--atp-red)'}}>levier stratégique</strong> pour transformer les défis économiques en opportunités de croissance collective."</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            <div className="glass hover-premium-card" style={{ padding: '32px', borderRadius: '16px', borderTop: '4px solid var(--atp-blue)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--atp-blue)', opacity: 0.15, marginBottom: '4px', lineHeight: 1, letterSpacing: '-0.05em' }}>01</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Fédérer l'Excellence</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nous créons des ponts entre les entreprises des zones Lafayette, Prouvé et Fruchard, favorisant le partage d'expertises et la naissance de synergies commerciales locales.</p>
            </div>
            <div className="glass hover-premium-card" style={{ padding: '32px', borderRadius: '16px', borderTop: '4px solid var(--atp-red)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--atp-red)', opacity: 0.15, marginBottom: '4px', lineHeight: 1, letterSpacing: '-0.05em' }}>02</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Accélérer le Dialogue</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Interface privilégiée avec les institutions, nous portons la voix des entrepreneurs pour influencer l'aménagement et le développement du territoire.</p>
            </div>
            <div className="glass hover-premium-card" style={{ padding: '32px', borderRadius: '16px', borderTop: '4px solid var(--atp-blue)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--atp-blue)', opacity: 0.15, marginBottom: '4px', lineHeight: 1, letterSpacing: '-0.05em' }}>03</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Valoriser l'Ancrage</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nous promouvons l'attractivité de la zone Porte Nord pour attirer de nouveaux talents, investisseurs et partenaires stratégiques.</p>
            </div>
          </div>

          <div className="feature-row" style={{ gap: '60px', flexWrap: 'wrap' }}>
            <div className="mobile-only" style={{ width: '100%', marginBottom: '-40px', zIndex: 2 }}>
              <span style={{ color: 'var(--atp-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Co-construction</span>
              <h3 style={{ marginTop: '6px', fontSize: '1.8rem', color: 'var(--atp-blue)' }}>Les Matinales Économiques</h3>
            </div>
            <div className="feature-image-side" style={{ borderRadius: '1rem', display: 'flex', alignItems: 'center' }}>
              <div className="hover-video-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-premium)', width: '100%', background: '#1a2332', position: 'relative' }}>
                <VideoFrame url={content.home?.matinalesVideoUrl} />
              </div>
            </div>
            <div className="feature-content-side">
              <div className="desktop-only">
                <span style={{ color: 'var(--atp-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Co-construction</span>
                <h3 style={{ marginTop: '6px', fontSize: '1.8rem', color: 'var(--atp-blue)' }}>Les Matinales Économiques</h3>
              </div>
              <p style={{ marginBottom: '16px', fontSize: '0.95rem', lineHeight: 1.7 }}>Plus qu'un simple petit-déjeuner, nos matinales sont des séances de travail stratégiques. Elles permettent aux chefs d'entreprise de dialoguer directement avec les élus de Maxéville, de la Métropole du Grand Nancy et de la Région Grand Est.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--atp-blue)', marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.88rem' }}><strong>Influence directe</strong> sur les projets de voirie, accessibilité et signalétique de la zone.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--atp-blue)', marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.88rem' }}><strong>Veille réglementaire & fiscale</strong> partagée entre entreprises et experts.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--atp-blue)', marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.88rem' }}><strong>Thématiques variées</strong> : cyber-sécurité, transition écologique, développement international.</p>
                </div>
              </div>
              <Link to="/actions/matinales" className="btn btn-blue">Découvrir le format</Link>
            </div>
          </div>

          <div className="feature-row" style={{ flexDirection: 'row-reverse' as any, gap: '60px', flexWrap: 'wrap' }}>
            <div className="mobile-only" style={{ width: '100%', marginBottom: '-40px', zIndex: 2 }}>
              <span style={{ color: 'var(--atp-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Capital Humain</span>
              <h3 style={{ marginTop: '8px', fontSize: '1.8rem', color: 'var(--atp-blue)' }}>Objectif Emploi & Alternance</h3>
            </div>
            <div className="feature-image-side" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="hover-video-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-premium)', width: '100%', background: '#1a2332', position: 'relative' }}>
                {content.home?.emploiVideoUrl ? (
                  <VideoFrame url={content.home.emploiVideoUrl} />
                ) : (
                  <img
                    src="/atp_meeting_saber_bouzaza_1773754342527.png"
                    alt="Forum Emploi ATP"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                  />
                )}
              </div>
            </div>
            <div className="feature-content-side">
              <div className="desktop-only">
                <span style={{ color: 'var(--atp-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Capital Humain</span>
                <h3 style={{ marginTop: '8px', fontSize: '1.8rem', color: 'var(--atp-blue)' }}>Objectif Emploi & Alternance</h3>
              </div>
              <p style={{ marginBottom: '16px', fontSize: '0.95rem', lineHeight: 1.7 }}>Le dynamisme d'un territoire se mesure à sa capacité à intégrer la jeunesse et les compétences locales. Nos initiatives forum, job dating et networking sont le rendez-vous incontournable du recrutement de proximité.</p>
              <p style={{ marginBottom: '24px', fontStyle: 'italic', fontSize: '0.88rem', borderLeft: '3px solid var(--atp-red)', paddingLeft: '16px', color: 'var(--text-muted)' }}>
                "Chaque année, notre Forum Emploi & Alternance met en relation directe les entreprises membres avec des centaines de candidats — demandeurs d'emploi, lycéens et alternants du Grand Nancy."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/actions/forum" className="btn btn-blue">Consulter l'agenda</Link>
                <img src="https://upload.wikimedia.org/wikipedia/fr/0/07/Logo_R%C3%A9gion_Grand_Est_2016.svg" alt="Région Grand Est" style={{ height: '28px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Besoin de visibilité sur la zone ?</h2>
          <p style={{ marginTop: '12px', marginBottom: '32px', color: 'var(--text-muted)' }}>Intégrez l'annuaire de référence de Nancy Porte Nord et développez vos synergies locales.</p>
          <Link to="/directory" className="btn btn-blue">Consulter l'annuaire</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
