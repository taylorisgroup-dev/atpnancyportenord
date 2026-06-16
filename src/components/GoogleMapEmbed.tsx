"use client";
interface GoogleMapEmbedProps {
  address?: string;
}

export const GoogleMapEmbed = ({
  address = "Zone d'Activités Porte Nord, Maxéville, France",
}: GoogleMapEmbedProps) => {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      <iframe
        title="Localisation ATP Nancy Porte Nord"
        src={src}
        width="100%"
        height="350"
        style={{
          border: 0,
          display: 'block',
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
