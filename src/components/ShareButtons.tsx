"use client";
import { useState } from 'react';
import { Link2, Share2, Mail, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  company: string;
  url?: string;
}

export const ShareButtons = ({ title, company, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = `${title} — ${company}`;

  const links = [
    {
      label: 'LinkedIn',
      icon: <Link2 size={16} />,
      color: '#0077B5',
      onClick: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      label: 'WhatsApp',
      icon: <Share2 size={16} />,
      color: '#25D366',
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      label: 'Email',
      icon: <Mail size={16} />,
      color: 'var(--atp-blue)',
      onClick: () =>
        window.open(
          `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(
            `Découvrez cette offre : ${shareUrl}`
          )}`,
          '_blank'
        ),
    },
    {
      label: copied ? 'Copié !' : 'Copier',
      icon: copied ? <Check size={16} /> : <Copy size={16} />,
      color: copied ? '#16a34a' : 'var(--text-muted)',
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } catch {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = shareUrl;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      },
    },
  ];

  const pillStyle = (color: string): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 50,
    border: `1.5px solid ${color}`,
    background: 'transparent',
    color,
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-primary)',
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {links.map((link) => (
        <button
          key={link.label}
          onClick={link.onClick}
          style={pillStyle(link.color)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = link.color;
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = link.color;
          }}
          aria-label={link.label}
        >
          {link.icon}
          {link.label}
        </button>
      ))}
    </div>
  );
};
