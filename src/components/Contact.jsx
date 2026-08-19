import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Contact() {
  const { profile } = usePortfolioData();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    // Trigger festive confetti celebrate effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" style={{ padding: '6rem 0 4rem', position: 'relative', zIndex: 1, width: '100%' }}>
      <div className="site-container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
          <span className="page-number-tag">[ 07 / GET IN TOUCH ]</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>KẾT NỐI & HỢP TÁC TƯƠNG LAI</span>
        </div>

        {/* Spread Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Left Column: GET IN TOUCH Editorial Brochure Card */}
          <div className="editorial-box" style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                HỢP TÁC & DỰ ÁN
              </p>

              <h2 className="font-display" style={{ fontSize: '3rem', color: '#fff', letterSpacing: '0.05em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                GET IN<br />TOUCH
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Bạn có ý tưởng dự án 3D WebGL mới, cần xây dựng giải pháp Web App quy mô hoặc tư vấn kiến trúc phần mềm? Hãy gửi tin nhắn cho tôi.
              </p>

              {/* Direct Info List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={18} color="var(--accent-cyan)" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Email Trực Tiếp</span>
                    <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{profile.email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={18} color="var(--accent-cyan)" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Số Điện Thoại</span>
                    <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{profile.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Social Links */}
            <div>
              <button className="btn-editorial" onClick={handleCopyEmail} style={{ width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {copied ? <Check size={16} color="var(--accent-cyan)" /> : <Copy size={16} />}
                {copied ? "Đã sao chép Email!" : "Sao Chép Địa Chỉ Email"}
              </button>

              <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-editorial" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}>
                  <GithubIcon size={16} /> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-editorial" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}>
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="editorial-box" style={{ padding: '3rem 2.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.8rem', color: '#fff', letterSpacing: '0.05em', marginBottom: '1.5rem', borderBottom: '2px solid #fff', paddingBottom: '0.5rem' }}>
              SEND A MESSAGE
            </h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(0,240,255,0.05)', border: '1px solid var(--accent-cyan)' }}>
                <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                  Cảm Ơn Bạn Đã Gửi Tin Nhắn!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Tôi sẽ phản hồi lại thông tin qua email của bạn trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    HỌ VÀ TÊN CỦA BẠN
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ví dụ: Nguyễn Văn A" 
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(9,10,13,0.8)',
                      border: '1px solid var(--surface-border-strong)',
                      color: '#fff',
                      padding: '0.85rem 1rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    ĐỊA CHỈ EMAIL
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="your.email@example.com" 
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(9,10,13,0.8)',
                      border: '1px solid var(--surface-border-strong)',
                      color: '#fff',
                      padding: '0.85rem 1rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    NỘI DUNG TIN NHẮN / LỜI MỜI HỢP TÁC
                  </label>
                  <textarea 
                    rows={5} 
                    required 
                    placeholder="Mô tả ngắn gọn về yêu cầu dự án..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(9,10,13,0.8)',
                      border: '1px solid var(--surface-border-strong)',
                      color: '#fff',
                      padding: '0.85rem 1rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn-editorial btn-accent" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                  <Send size={18} /> Gửi Tin Nhắn Ngay
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Footer */}
        <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          <div>
            © 2026 {profile.name}. Designed with Dark Editorial 3D Architecture.
          </div>
          <div>
            Built with React 18 • Three.js • Vite
          </div>
        </div>

      </div>
    </section>
  );
}
