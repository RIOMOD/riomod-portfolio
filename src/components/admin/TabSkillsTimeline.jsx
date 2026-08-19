import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { Zap, Clock, Plus, Trash2, Save, ArrowUpDown } from 'lucide-react';

export default function TabSkillsTimeline() {
  const { skills, timeline, updateSkills, updateTimeline } = usePortfolioData();
  const [skillsList, setSkillsList] = useState(skills);
  const [timelineList, setTimelineList] = useState(timeline);
  const [activeSubTab, setActiveSubTab] = useState('skills'); // 'skills' | 'timeline'

  // Skills handlers
  const handleSkillChange = (index, field, value) => {
    const updated = [...skillsList];
    updated[index] = { ...updated[index], [field]: field === 'level' ? Number(value) : value };
    setSkillsList(updated);
  };

  const addSkill = () => {
    setSkillsList((prev) => [
      ...prev,
      { name: 'Kỹ năng mới', level: 85, category: 'Technical' }
    ]);
  };

  const removeSkill = (index) => {
    setSkillsList((prev) => prev.filter((_, i) => i !== index));
  };

  const saveSkills = (e) => {
    e.preventDefault();
    updateSkills(skillsList);
  };

  // Timeline handlers
  const handleTimelineChange = (index, field, value) => {
    const updated = [...timelineList];
    updated[index] = { ...updated[index], [field]: value };
    setTimelineList(updated);
  };

  const handleTimelineHighlightChange = (index, textValue) => {
    const updated = [...timelineList];
    updated[index] = {
      ...updated[index],
      highlights: textValue.split('\n').map((h) => h.trim()).filter(Boolean)
    };
    setTimelineList(updated);
  };

  const addTimelineItem = () => {
    setTimelineList((prev) => [
      {
        period: `${new Date().getFullYear()} - HIỆN TẠI`,
        phase: 'GIAI ĐOẠN MỚI',
        title: 'Chức danh / Hoạt động mới',
        description: 'Mô tả tóm tắt kinh nghiệm và đóng góp...',
        icon: 'Briefcase',
        highlights: ['Thành tích nổi bật 1', 'Thành tích nổi bật 2']
      },
      ...prev
    ]);
  };

  const removeTimelineItem = (index) => {
    setTimelineList((prev) => prev.filter((_, i) => i !== index));
  };

  const saveTimeline = (e) => {
    e.preventDefault();
    updateTimeline(timelineList);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
        <button
          type="button"
          className={`filter-btn ${activeSubTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('skills')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Zap size={16} /> Quản Lý Kỹ Năng ({skillsList.length})
        </button>
        <button
          type="button"
          className={`filter-btn ${activeSubTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('timeline')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Clock size={16} /> Quản Lý Dòng Thời Gian ({timelineList.length})
        </button>
      </div>

      {activeSubTab === 'skills' ? (
        <form onSubmit={saveSkills}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Điều chỉnh % độ thành thạo và phân nhóm cho từng kỹ năng
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={addSkill} className="btn-secondary" style={{ padding: '0.5rem 0.9rem' }}>
                <Plus size={15} /> Thêm Kỹ Năng
              </button>
              <button type="submit" className="btn-primary">
                <Save size={15} /> Lưu Kỹ Năng
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {skillsList.map((sk, idx) => (
              <div key={idx} className="admin-card" style={{ padding: '0.85rem 1.25rem', gap: '1rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ flex: 2 }}
                  value={sk.name || ''}
                  onChange={(e) => handleSkillChange(idx, 'name', e.target.value)}
                  placeholder="Tên kỹ năng..."
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={sk.level || 80}
                    onChange={(e) => handleSkillChange(idx, 'level', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', width: '38px', textAlign: 'right' }}>
                    {sk.level}%
                  </span>
                </div>

                <select
                  className="form-select"
                  style={{ width: '160px' }}
                  value={sk.category || 'Technical'}
                  onChange={(e) => handleSkillChange(idx, 'category', e.target.value)}
                >
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Media & Events">Media & Events</option>
                  <option value="Technical">Technical</option>
                  <option value="Operations">Operations</option>
                </select>

                <button
                  type="button"
                  onClick={() => removeSkill(idx)}
                  className="btn-danger"
                  style={{ padding: '0.55rem' }}
                  title="Xóa kỹ năng"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </form>
      ) : (
        <form onSubmit={saveTimeline}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Quản lý các cột mốc học tập, làm việc và giải thưởng
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={addTimelineItem} className="btn-secondary" style={{ padding: '0.5rem 0.9rem' }}>
                <Plus size={15} /> Thêm Cột Mốc Mới
              </button>
              <button type="submit" className="btn-primary">
                <Save size={15} /> Lưu Dòng Thời Gian
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {timelineList.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(18, 21, 29, 0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}>
                    CỘT MỐC #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTimelineItem(idx)}
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                  >
                    <Trash2 size={14} /> Xóa Cột Mốc
                  </button>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Khoảng Thời Gian (Period)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.period || ''}
                      onChange={(e) => handleTimelineChange(idx, 'period', e.target.value)}
                      placeholder="VD: 2024 - HIỆN TẠI"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tên Giai Đoạn (Phase)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.phase || ''}
                      onChange={(e) => handleTimelineChange(idx, 'phase', e.target.value)}
                      placeholder="VD: NÂNG CAO TRÌNH ĐỘ CHUYÊN MÔN"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tiêu Đề / Chức Danh</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.title || ''}
                    onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)}
                    placeholder="VD: Kỹ sư CNTT - PTIT..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mô Tả Tóm Tắt</label>
                  <textarea
                    className="form-textarea"
                    style={{ minHeight: '60px' }}
                    value={item.description || ''}
                    onChange={(e) => handleTimelineChange(idx, 'description', e.target.value)}
                    placeholder="Mô tả công việc hoặc thành tựu chính..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Các Điểm Nổi Bật (Mỗi dòng một mục)</label>
                  <textarea
                    className="form-textarea"
                    style={{ minHeight: '60px' }}
                    value={(item.highlights || []).join('\n')}
                    onChange={(e) => handleTimelineHighlightChange(idx, e.target.value)}
                    placeholder="Điểm nổi bật 1...&#10;Điểm nổi bật 2..."
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
}
