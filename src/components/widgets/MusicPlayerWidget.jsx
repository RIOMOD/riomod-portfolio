import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Music, Disc } from 'lucide-react';

const TRACKS = [
  {
    title: 'Cyberpunk Lo-Fi Chill',
    artist: 'Antigravity Studio',
    duration: '3:24',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  },
  {
    title: 'Midnight Coding Symphony',
    artist: 'Neon Wave Beats',
    duration: '2:45',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3'
  },
  {
    title: 'Deep Focus Ambient Flow',
    artist: 'Synthetic Dawn',
    duration: '4:10',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=empty-mind-118973.mp3'
  }
];

export default function MusicPlayerWidget({ config = {} }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback prevented or file loading:', e);
      });
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 150);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 150);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="widget-music" style={{ padding: '3.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleNext}
      />

      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 16, 32, 0.9) 0%, rgba(12, 14, 22, 0.95) 100%)',
        border: '1px solid rgba(157, 78, 221, 0.35)',
        borderRadius: '16px',
        padding: '2rem 2.25rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(157, 78, 221, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Disc animation & track info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', minWidth: '260px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #06d6a0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isPlaying ? '0 0 25px rgba(124, 58, 237, 0.6)' : 'none',
            animation: isPlaying ? 'spin 4s linear infinite' : 'none',
            flexShrink: 0
          }}>
            <Disc size={30} color="#fff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Music size={13} color="#06d6a0" />
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: '#06d6a0', textTransform: 'uppercase', fontWeight: 600 }}>
                {isPlaying ? 'ĐANG PHÁT NHẠC CODING' : 'AUDIO VIBES WIDGET'}
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              {currentTrack.title}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {currentTrack.artist} • Track {currentTrackIndex + 1}/{TRACKS.length}
            </span>
          </div>
        </div>

        {/* Visualizer bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '36px', padding: '0 1rem' }}>
          {[18, 30, 24, 36, 14, 28, 32, 20, 26, 34, 16, 22].map((height, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: isPlaying ? `${Math.max(6, (height + (i % 3) * 5) % 36)}px` : '4px',
                background: 'linear-gradient(to top, #7c3aed, #06d6a0)',
                borderRadius: '2px',
                transition: 'height 0.2s ease'
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handlePrev}
            className="btn-secondary"
            style={{ padding: '0.6rem', borderRadius: '50%' }}
            title="Bài trước"
          >
            <SkipBack size={18} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="btn-primary"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(157, 78, 221, 0.5)'
            }}
            title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
          >
            {isPlaying ? <Pause size={22} fill="#fff" /> : <Play size={22} fill="#fff" style={{ marginLeft: '3px' }} />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-secondary"
            style={{ padding: '0.6rem', borderRadius: '50%' }}
            title="Bài kế tiếp"
          >
            <SkipForward size={18} />
          </button>

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
            <button
              type="button"
              onClick={toggleMute}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: 0 }}
            >
              {isMuted ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              style={{ width: '70px', accentColor: '#7c3aed', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
