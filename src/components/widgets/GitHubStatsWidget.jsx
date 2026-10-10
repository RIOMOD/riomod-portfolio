import React from 'react';
import { Star, GitFork, ExternalLink, Activity, Terminal } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { usePortfolioData } from '../../context/DataContext';

export default function GitHubStatsWidget({ config = {} }) {
  const { profile } = usePortfolioData();
  const username = config.username || (profile.github ? profile.github.split('/').pop() : 'RIOMOD');
  const title = config.title || 'HOẠT ĐỘNG GITHUB & MÃ NGUỒN MỞ';

  return (
    <section id="widget-github" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(18, 22, 34, 0.85) 0%, rgba(13, 16, 24, 0.95) 100%)',
        border: '1px solid rgba(157, 78, 221, 0.3)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(157, 78, 221, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow decoration */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 214, 160, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'rgba(6, 214, 160, 0.12)',
              border: '1px solid rgba(6, 214, 160, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GithubIcon size={24} color="#06d6a0" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--accent-cyan)', textTransform: 'uppercase', fontWeight: 600 }}>
                  WIDGET TÍCH HỢP
                </span>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#06d6a0', boxShadow: '0 0 8px #06d6a0' }} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff', margin: 0 }}>
                {title}
              </h2>
            </div>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              textDecoration: 'none'
            }}
          >
            <span>@{username} trên GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* GitHub Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          {/* Card 1: Overview badge */}
          <div style={{
            background: 'rgba(10, 12, 18, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Terminal size={18} color="var(--accent-purple)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                TỔNG QUAN REPOSITORIES
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                15+
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Dự án & Repositories công khai
              </span>
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              ⚡ Bao gồm dự án 3D Portfolio, Hệ thống EdTech & Công cụ AI
            </div>
          </div>

          {/* Card 2: Commit & Contribution */}
          <div style={{
            background: 'rgba(10, 12, 18, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Activity size={18} color="#06d6a0" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                HOẠT ĐỘNG ĐÓNG GÓP
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#06d6a0' }}>
                Active
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Liên tục cập nhật & triển khai
              </span>
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              🚀 Tự động hóa CI/CD qua GitHub Actions, Cloudflare, Render & Firebase
            </div>
          </div>

          {/* Card 3: Featured Repo */}
          <div style={{
            background: 'rgba(10, 12, 18, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={16} color="#ffb703" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                  REPO TIÊU BIỂU
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(157,78,221,0.2)', color: '#c084fc' }}>
                Public
              </span>
            </div>
            <div>
              <a
                href="https://github.com/RIOMOD/riomod-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                riomod-portfolio <ExternalLink size={13} color="var(--text-muted)" />
              </a>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', margin: '0.5rem 0 0 0', lineHeight: 1.4 }}>
                Interactive 3D Magazine Portfolio with WebGL, Framer Motion, and Realtime Customizer.
              </p>
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <span>🟡 JavaScript / React</span>
              <span>⭐ 3D Booklet</span>
            </div>
          </div>
        </div>

        {/* GitHub Stats External Embed Badge */}
        <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=0d1018&title_color=06d6a0&icon_color=c084fc&text_color=94a3b8`}
            alt={`${username}'s GitHub stats`}
            loading="lazy"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            onError={(e) => {
              // Hide image cleanly if github-readme-stats API fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}
