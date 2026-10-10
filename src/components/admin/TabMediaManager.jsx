import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { 
  Image, 
  Music, 
  Film, 
  Upload, 
  Play, 
  Pause, 
  Trash2, 
  Plus, 
  Edit3, 
  Save, 
  ExternalLink, 
  CheckCircle2, 
  Volume2,
  Sparkles
} from 'lucide-react';

export default function TabMediaManager() {
  const { 
    profile, 
    updateProfile, 
    projects, 
    updateProject, 
    events, 
    updateEvent, 
    audioTracks, 
    updateAudioTracks, 
    showToast 
  } = usePortfolioData();

  // Active sub-tab: 'audio' | 'profile' | 'projects' | 'events'
  const [activeMediaSection, setActiveMediaSection] = useState('audio');

  // Audio state
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [audioAudioElement, setAudioAudioElement] = useState(null);
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState(null);
  const [trackForm, setTrackForm] = useState({
    title: '',
    artist: '',
    duration: '3:00',
    url: ''
  });

  // Profile avatar state
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar || profile.photo || '');

  // Audio player helper
  const handleTogglePlay = (track) => {
    if (playingTrackId === track.id) {
      if (audioAudioElement) {
        audioAudioElement.pause();
      }
      setPlayingTrackId(null);
    } else {
      if (audioAudioElement) {
        audioAudioElement.pause();
      }
      const audio = new Audio(track.url);
      audio.play().catch((err) => {
        showToast('Không thể phát file âm thanh: ' + err.message, 'error');
      });
      audio.onended = () => setPlayingTrackId(null);
      setAudioAudioElement(audio);
      setPlayingTrackId(track.id);
    }
  };

  // Audio Track Upload / Save
  const handleAudioFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      showToast('File âm thanh quá lớn (> 15MB). Hãy dùng file nén hoặc đường link URL!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setTrackForm((prev) => ({
        ...prev,
        url: event.target.result,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '')
      }));
      showToast(`Đã nạp file âm thanh: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveTrack = (e) => {
    e.preventDefault();
    if (!trackForm.title || !trackForm.url) {
      showToast('Vui lòng nhập tên bài hát và đường link file âm thanh!', 'error');
      return;
    }

    const tracks = audioTracks || [];
    if (editingTrackId) {
      const updated = tracks.map((t) =>
        t.id === editingTrackId ? { ...t, ...trackForm } : t
      );
      updateAudioTracks(updated);
      showToast(`Đã cập nhật bài hát: ${trackForm.title}`);
    } else {
      const newTrack = {
        ...trackForm,
        id: `track_${Date.now()}`
      };
      updateAudioTracks([...tracks, newTrack]);
      showToast(`Đã thêm bài hát mới: ${trackForm.title}`);
    }

    setIsAddingTrack(false);
    setEditingTrackId(null);
    setTrackForm({ title: '', artist: '', duration: '3:00', url: '' });
  };

  const handleDeleteTrack = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa bài hát này khỏi danh sách phát?')) {
      const updated = (audioTracks || []).filter((t) => t.id !== id);
      updateAudioTracks(updated);
      showToast('Đã xóa bài hát thành công!');
    }
  };

  // Profile Avatar Upload
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setAvatarUrl(dataUrl);
      updateProfile({ avatar: dataUrl, photo: dataUrl });
      showToast('Đã cập nhật ảnh đại diện mới!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAvatar = (e) => {
    e.preventDefault();
    updateProfile({ avatar: avatarUrl, photo: avatarUrl });
    showToast('Đã lưu ảnh đại diện!');
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
          <Sparkles size={22} color="#c084fc" />
          QUẢN LÝ TOÀN BỘ MEDIA (ẢNH, VIDEO, ÂM THANH)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.4rem 0 0 0' }}>
          Tải ảnh đại diện trực tiếp từ máy, sửa danh sách nhạc widget Lo-Fi, cập nhật ảnh và video demo cho các dự án & sự kiện.
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveMediaSection('audio')}
          style={{
            padding: '0.6rem 1.1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: activeMediaSection === 'audio' ? 'linear-gradient(135deg, #7c3aed, #06d6a0)' : 'rgba(255,255,255,0.05)',
            color: activeMediaSection === 'audio' ? '#fff' : 'var(--text-muted)',
            border: activeMediaSection === 'audio' ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Music size={16} /> Âm Thanh Widget Lo-Fi ({(audioTracks || []).length} Bài)
        </button>

        <button
          type="button"
          onClick={() => setActiveMediaSection('profile')}
          style={{
            padding: '0.6rem 1.1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: activeMediaSection === 'profile' ? 'linear-gradient(135deg, #7c3aed, #06d6a0)' : 'rgba(255,255,255,0.05)',
            color: activeMediaSection === 'profile' ? '#fff' : 'var(--text-muted)',
            border: activeMediaSection === 'profile' ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Image size={16} /> Ảnh Hồ Sơ & Avatar
        </button>

        <button
          type="button"
          onClick={() => setActiveMediaSection('projects')}
          style={{
            padding: '0.6rem 1.1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: activeMediaSection === 'projects' ? 'linear-gradient(135deg, #7c3aed, #06d6a0)' : 'rgba(255,255,255,0.05)',
            color: activeMediaSection === 'projects' ? '#fff' : 'var(--text-muted)',
            border: activeMediaSection === 'projects' ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Film size={16} /> Ảnh & Video Dự Án ({projects.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveMediaSection('events')}
          style={{
            padding: '0.6rem 1.1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: activeMediaSection === 'events' ? 'linear-gradient(135deg, #7c3aed, #06d6a0)' : 'rgba(255,255,255,0.05)',
            color: activeMediaSection === 'events' ? '#fff' : 'var(--text-muted)',
            border: activeMediaSection === 'events' ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Film size={16} /> Media Sự Kiện ({events.length})
        </button>
      </div>

      {/* SECTION 1: Âm Thanh / Audio Tracks */}
      {activeMediaSection === 'audio' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Danh sách bài hát phát trong widget <strong>Lo-Fi Music Player</strong> trên trang chủ:
            </span>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setIsAddingTrack(true);
                setEditingTrackId(null);
                setTrackForm({ title: '', artist: 'Antigravity Studio', duration: '3:00', url: '' });
              }}
              style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
            >
              <Plus size={16} /> Thêm Bài Hát Mới
            </button>
          </div>

          {/* Form thêm / sửa bài hát */}
          {(isAddingTrack || editingTrackId) && (
            <div style={{
              background: 'rgba(20, 24, 36, 0.9)',
              border: '1px solid rgba(157, 78, 221, 0.4)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.75rem'
            }}>
              <h4 style={{ fontSize: '1.05rem', color: '#c084fc', margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)' }}>
                {editingTrackId ? 'Chỉnh Sửa Bài Hát' : 'Thêm Bài Hát Mới Vào Widget'}
              </h4>

              <form onSubmit={handleSaveTrack} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-grid-2">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Tên Bài Hát:</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="VD: Midnight Coding Symphony"
                      value={trackForm.title}
                      onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Nghệ Sĩ / Tác Giả:</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="VD: Neon Wave Beats"
                      value={trackForm.artist}
                      onChange={(e) => setTrackForm({ ...trackForm, artist: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Đường Dẫn URL File Âm Thanh (.mp3, .ogg):</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://.../audio.mp3"
                    value={trackForm.url}
                    onChange={(e) => setTrackForm({ ...trackForm, url: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Hoặc Tải File MP3 Từ Máy Tính Lên:</label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileUpload}
                    style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setIsAddingTrack(false);
                      setEditingTrackId(null);
                    }}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn-primary">
                    <Save size={15} /> Lưu Bài Hát
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Danh sách các bài hát */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {(audioTracks || []).map((track, idx) => (
              <div
                key={track.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: 'rgba(18, 22, 32, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => handleTogglePlay(track)}
                    className="btn-primary"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      padding: 0,
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                    title={playingTrackId === track.id ? 'Tạm dừng nghe thử' : 'Nghe thử bài hát'}
                  >
                    {playingTrackId === track.id ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                  </button>

                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {track.artist || 'Không rõ'} • {track.duration || '3:00'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setEditingTrackId(track.id);
                      setIsAddingTrack(false);
                      setTrackForm({
                        title: track.title,
                        artist: track.artist,
                        duration: track.duration,
                        url: track.url
                      });
                    }}
                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
                    title="Chỉnh sửa bài hát"
                  >
                    <Edit3 size={14} /> Sửa
                  </button>

                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => handleDeleteTrack(track.id)}
                    style={{ padding: '0.45rem', borderRadius: '6px' }}
                    title="Xóa bài hát"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Ảnh Hồ Sơ & Avatar */}
      {activeMediaSection === 'profile' && (
        <div style={{ maxWidth: '650px' }}>
          <form onSubmit={handleSaveAvatar} style={{
            background: 'rgba(18, 22, 32, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', margin: '0 0 1.25rem 0', fontFamily: 'var(--font-heading)' }}>
              Ảnh Đại Diện Cá Nhân (Profile Avatar)
            </h4>

            {/* Preview image */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #06d6a0',
                background: '#0e111a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Image size={36} color="var(--text-muted)" />
                )}
              </div>

              <div>
                <label className="form-label">Tải Ảnh Từ Máy Tính Lên:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileUpload}
                  style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Hỗ trợ PNG, JPG, WebP. Ảnh được nén tự động và lưu an toàn.
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Hoặc Dán Đường Link URL Ảnh:</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://.../avatar.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              <Save size={16} /> Lưu Ảnh Đại Diện Mới
            </button>
          </form>
        </div>
      )}

      {/* SECTION 3: Ảnh & Video Dự Án */}
      {activeMediaSection === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Chỉnh sửa nhanh ảnh bìa và link video demo của tất cả các dự án:
          </span>

          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{
                background: 'rgba(18, 22, 32, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              {/* Image thumbnail preview */}
              <div style={{
                width: '120px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#0a0d14',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {proj.image ? (
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Image size={24} color="var(--text-muted)" />
                )}
              </div>

              <div style={{ flex: 1, minWidth: '260px' }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>
                  {proj.title}
                </h4>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>URL Ảnh Bìa Dự Án:</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                      value={proj.image || ''}
                      onChange={(e) => updateProject(proj.id, { image: e.target.value })}
                      placeholder="https://.../thumb.jpg"
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>URL Video Demo (YouTube/MP4):</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                      value={proj.videoUrl || ''}
                      onChange={(e) => updateProject(proj.id, { videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>

                {/* Upload local image */}
                <div style={{ marginTop: '0.5rem' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        updateProject(proj.id, { image: ev.target.result });
                        showToast(`Đã cập nhật ảnh dự án "${proj.title}"!`);
                      };
                      reader.readAsDataURL(file);
                    }}
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 4: Media Sự Kiện */}
      {activeMediaSection === 'events' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Chỉnh sửa nhanh ảnh và video các sự kiện, chương trình MC, hoạt náo:
          </span>

          {events.map((evt) => (
            <div
              key={evt.id}
              style={{
                background: 'rgba(18, 22, 32, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '120px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#0a0d14',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {evt.image ? (
                  <img src={evt.image} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Image size={24} color="var(--text-muted)" />
                )}
              </div>

              <div style={{ flex: 1, minWidth: '260px' }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>
                  {evt.title}
                </h4>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>URL Ảnh Sự Kiện:</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                      value={evt.image || ''}
                      onChange={(e) => updateEvent(evt.id, { image: e.target.value })}
                      placeholder="https://.../event.jpg"
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>URL Video Clip Sự Kiện:</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                      value={evt.videoUrl || ''}
                      onChange={(e) => updateEvent(evt.id, { videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        updateEvent(evt.id, { image: ev.target.result });
                        showToast(`Đã cập nhật ảnh sự kiện "${evt.title}"!`);
                      };
                      reader.readAsDataURL(file);
                    }}
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
