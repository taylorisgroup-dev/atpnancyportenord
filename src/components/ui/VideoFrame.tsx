"use client";
import React, { useState } from 'react';
import { Play } from 'lucide-react';

export const VideoFrame = ({ url, thumbnail = '/atp_video_thumbnail.jpg' }: { url?: string, thumbnail?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  let displayUrl = url;
  if (url) {
    const watchMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) displayUrl = `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
    else {
      const shortMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (shortMatch) displayUrl = `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
      else {
        const shortsMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) displayUrl = `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1`;
        else if (!url.includes('autoplay=1')) displayUrl = url + (url.includes('?') ? '&autoplay=1' : '?autoplay=1');
      }
    }
  }

  return (
    <div className="hero-video-frame">
      {displayUrl ? (
        isPlaying ? (
          displayUrl.includes('.mp4') ? (
            <video
              src={displayUrl.replace('?autoplay=1', '').replace('&autoplay=1', '')}
              autoPlay
              controls
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <iframe
              src={displayUrl}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ border: 'none', width: '100%', height: '100%', aspectRatio: '16/9' }}
            />
          )
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsPlaying(true)}>
            <img src={thumbnail} alt="Miniature Vidéo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}>
              <div className="video-play-btn">
                <Play size={40} style={{ color: 'white', marginLeft: '6px' }} />
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="video-placeholder-inner">
          <div className="video-play-btn">
            <Play size={40} style={{ color: 'white', marginLeft: '6px' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '20px', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Vidéo de présentation
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '6px' }}>Configurable depuis l'espace administrateur</p>
        </div>
      )}
    </div>
  );
};

export default VideoFrame;
