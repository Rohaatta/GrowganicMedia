import React, { useState, useEffect } from 'react';
import { Video, Award, Inbox, Plus, Trash2, Edit2, LogOut, Check, Eye } from 'lucide-react';

export default function AdminDashboard({ token, username, onLogout }) {
  const [activeTab, setActiveTab] = useState('videos');
  const [videos, setVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Responsive breakpoint tracking
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Form States
  const [videoForm, setVideoForm] = useState({ id: null, title: '', category: 'shorts', videoUrl: '', thumbnailUrl: '', duration: '', views: '' });
  const [testForm, setTestForm] = useState({ id: null, clientName: '', clientCompany: '', clientAvatar: '', quote: '', videoUrl: '', thumbnailUrl: '' });
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [isEditingTest, setIsEditingTest] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Fetch videos
      const vidRes = await fetch('https://growganicmedia-backend.vercel.app/api/videos');
      const vidData = await vidRes.json();
      setVideos(Array.isArray(vidData) ? vidData : []);

      // Fetch testimonials
      const testRes = await fetch('https://growganicmedia-backend.vercel.app/api/testimonials');
      const testData = await testRes.json();
      setTestimonials(Array.isArray(testData) ? testData : []);

      // Fetch inquiries
      const inqRes = await fetch('https://growganicmedia-backend.vercel.app/api/inquiries', { headers });
      const inqData = await inqRes.json();
      setInquiries(Array.isArray(inqData) ? inqData : []);
    } catch (err) {
      console.error('Error fetching dashboard data', err);
      showMsg('error', 'Failed to fetch data from backend. Make sure server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  // --- VIDEO OPERATIONS ---
  const handleSaveVideo = async (e) => {
    e.preventDefault();
    const url = isEditingVideo 
      ? `https://growganicmedia-backend.vercel.app/api/videos/${videoForm.id}`
      : 'https://growganicmedia-backend.vercel.app/api/videos';
    const method = isEditingVideo ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(videoForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save video');

      showMsg('success', isEditingVideo ? 'Video updated successfully!' : 'New video added successfully!');
      setVideoForm({ id: null, title: '', category: 'shorts', videoUrl: '', thumbnailUrl: '', duration: '', views: '' });
      setIsEditingVideo(false);
      fetchData();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`https://growganicmedia-backend.vercel.app/api/videos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      showMsg('success', 'Video deleted.');
      fetchData();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const startEditVideo = (video) => {
    setVideoForm(video);
    setIsEditingVideo(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- TESTIMONIAL OPERATIONS ---
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    const url = isEditingTest 
      ? `https://growganicmedia-backend.vercel.app/api/testimonials/${testForm.id}`
      : 'https://growganicmedia-backend.vercel.app/api/testimonials';
    const method = isEditingTest ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save testimonial');

      showMsg('success', isEditingTest ? 'Testimonial updated!' : 'Testimonial added!');
      setTestForm({ id: null, clientName: '', clientCompany: '', clientAvatar: '', quote: '', videoUrl: '', thumbnailUrl: '' });
      setIsEditingTest(false);
      fetchData();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial review?')) return;
    try {
      const res = await fetch(`https://growganicmedia-backend.vercel.app/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      showMsg('success', 'Testimonial deleted.');
      fetchData();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const startEditTest = (test) => {
    setTestForm(test);
    setIsEditingTest(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- INQUIRY OPERATIONS ---
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this user inquiry submission?')) return;
    try {
      const res = await fetch(`https://growganicmedia-backend.vercel.app/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      showMsg('success', 'Inquiry deleted.');
      fetchData();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const s = getStyles(isMobile);

  return (
    <div style={s.dashboardContainer} className="container admin-dashboard">
      {/* Top Header */}
      <div style={s.topHeader}>
        <div>
          <h2 style={s.headerTitle}>Agency Control Hub</h2>
          <p style={{ fontSize: '0.9rem' }}>Logged in as: <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{username}</span></p>
        </div>
        <button className="btn btn-secondary" onClick={onLogout} style={s.logoutBtn}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Global alert message */}
      {message.text && (
        <div style={{
          ...s.messageBox,
          backgroundColor: message.type === 'success' ? 'rgba(39, 201, 63, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderColor: message.type === 'success' ? '#27c93f' : '#ef4444',
          color: message.type === 'success' ? '#27c93f' : '#ef4444',
        }}>
          {message.text}
        </div>
      )}

      {/* Stats Summary Panel */}
      <div style={s.statsGrid}>
        <div className="glass-card" style={s.statCard}>
          <div style={s.statIconWrapper}><Video size={20} color="var(--color-accent)" /></div>
          <div>
            <span style={s.statLabel}>Total Portfolio Videos</span>
            <h3 style={s.statValue}>{videos.length}</h3>
          </div>
        </div>
        <div className="glass-card" style={s.statCard}>
          <div style={s.statIconWrapper}><Award size={20} color="var(--color-accent)" /></div>
          <div>
            <span style={s.statLabel}>Video Testimonials</span>
            <h3 style={s.statValue}>{testimonials.length}</h3>
          </div>
        </div>
        
      </div>

      {/* Tab Selectors */}
      <div style={s.tabsContainer} className="admin-tabs-scroll">
        <button 
          onClick={() => { setActiveTab('videos'); setMessage({ type: '', text: '' }); }}
          style={activeTab === 'videos' ? s.activeTab : s.tab}
        >
          <Video size={16} /> Portfolio Videos ({videos.length})
        </button>
        <button 
          onClick={() => { setActiveTab('testimonials'); setMessage({ type: '', text: '' }); }}
          style={activeTab === 'testimonials' ? s.activeTab : s.tab}
        >
          <Award size={16} /> Testimonials ({testimonials.length})
        </button>
       
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '3rem' }}>Updating dashboard records...</div>}

      {/* TAB CONTENT: VIDEOS */}
      {!loading && activeTab === 'videos' && (
        <div style={s.tabGrid}>
          {/* Add / Edit Form */}
          <div className="glass-card" style={s.formCard}>
            <h3>{isEditingVideo ? 'Edit Video Details' : 'Add New Video'}</h3>
            <form onSubmit={handleSaveVideo} style={s.form}>
              <div style={s.formGroup}>
                <label style={s.label}>Video Title</label>
                <input 
                  type="text" 
                  value={videoForm.title} 
                  onChange={(e) => setVideoForm({...videoForm, title: e.target.value})} 
                  placeholder="e.g. Modern Gym Workout Reel" 
                  style={s.input} 
                  required 
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Category</label>
                <select 
  value={videoForm.category} 
  onChange={(e) => setVideoForm({...videoForm, category: e.target.value})}
  style={s.input}
>
  <option value="shorts">Shorts / Reels (Vertical)</option>
  <option value="youtube">YouTube Long-form (Horizontal)</option>
</select>
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Direct Video URL (MP4)</label>
                <input 
                  type="url" 
                  value={videoForm.videoUrl} 
                  onChange={(e) => setVideoForm({...videoForm, videoUrl: e.target.value})} 
                  placeholder="https://assets.mixkit.co/..." 
                  style={s.input} 
                  required 
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Thumbnail Image URL</label>
                <input 
                  type="url" 
                  value={videoForm.thumbnailUrl} 
                  onChange={(e) => setVideoForm({...videoForm, thumbnailUrl: e.target.value})} 
                  placeholder="https://images.unsplash.com/..." 
                  style={s.input} 
                />
              </div>
              <div style={s.formRow}>
                <div style={s.formGroup}>
                  <label style={s.label}>Duration</label>
                  <input 
                    type="text" 
                    value={videoForm.duration} 
                    onChange={(e) => setVideoForm({...videoForm, duration: e.target.value})} 
                    placeholder="0:30" 
                    style={s.input} 
                  />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Views Tag</label>
                  <input 
                    type="text" 
                    value={videoForm.views} 
                    onChange={(e) => setVideoForm({...videoForm, views: e.target.value})} 
                    placeholder="120K" 
                    style={s.input} 
                  />
                </div>
              </div>
              <div style={s.formActions}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <Check size={16} /> {isEditingVideo ? 'Save Changes' : 'Publish Video'}
                </button>
                {isEditingVideo && (
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setIsEditingVideo(false);
                      setVideoForm({ id: null, title: '', category: 'shorts', videoUrl: '', thumbnailUrl: '', duration: '', views: '' });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Videos */}
          <div style={s.listContainer}>
            <h3>Active Showcase Items</h3>
            {videos.length === 0 ? (
              <p style={{ marginTop: '1rem' }}>No videos added yet.</p>
            ) : (
              <div style={s.listItems}>
                {videos.map(video => (
                  <div key={video.id} className="glass-card" style={s.listItem}>
                    <img 
                      src={video.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop"} 
                      alt="" 
                      style={s.listThumb}
                    />
                    <div style={s.listItemInfo}>
                      <h4 style={s.listTitle}>{video.title}</h4>
                      <span style={s.listTag}>{video.category} • {video.duration || '0:30'}</span>
                    </div>
                    <div style={s.listItemActions}>
                      <button onClick={() => startEditVideo(video)} style={s.editBtn} title="Edit"><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteVideo(video.id)} style={s.deleteBtn} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: TESTIMONIALS */}
      {!loading && activeTab === 'testimonials' && (
        <div style={s.tabGrid}>
          {/* Add / Edit Testimonial Form */}
          <div className="glass-card" style={s.formCard}>
            <h3>{isEditingTest ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
            <form onSubmit={handleSaveTestimonial} style={s.form}>
              <div style={s.formGroup}>
                <label style={s.label}>Client Name</label>
                <input 
                  type="text" 
                  value={testForm.clientName} 
                  onChange={(e) => setTestForm({...testForm, clientName: e.target.value})} 
                  placeholder="Sarah Jenkins" 
                  style={s.input} 
                  required 
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Client Company / Channel</label>
                <input 
                  type="text" 
                  value={testForm.clientCompany} 
                  onChange={(e) => setTestForm({...testForm, clientCompany: e.target.value})} 
                  placeholder="e.g. Creator Hub" 
                  style={s.input} 
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Client Avatar URL</label>
                <input 
                  type="url" 
                  value={testForm.clientAvatar} 
                  onChange={(e) => setTestForm({...testForm, clientAvatar: e.target.value})} 
                  placeholder="https://images.unsplash.com/..." 
                  style={s.input} 
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Written Quote Summary</label>
                <textarea 
                  value={testForm.quote} 
                  onChange={(e) => setTestForm({...testForm, quote: e.target.value})} 
                  placeholder="Highly recommend Hassan! High clickthrough, clean audio..." 
                  style={{...s.input, minHeight: '80px'}} 
                  required 
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Feedback Video URL (MP4)</label>
                <input 
                  type="url" 
                  value={testForm.videoUrl} 
                  onChange={(e) => setTestForm({...testForm, videoUrl: e.target.value})} 
                  placeholder="https://assets.mixkit.co/..." 
                  style={s.input} 
                  required 
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Video Thumbnail URL</label>
                <input 
                  type="url" 
                  value={testForm.thumbnailUrl} 
                  onChange={(e) => setTestForm({...testForm, thumbnailUrl: e.target.value})} 
                  placeholder="https://images.unsplash.com/..." 
                  style={s.input} 
                />
              </div>
              <div style={s.formActions}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <Check size={16} /> {isEditingTest ? 'Save Review' : 'Create Review'}
                </button>
                {isEditingTest && (
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setIsEditingTest(false);
                      setTestForm({ id: null, clientName: '', clientCompany: '', clientAvatar: '', quote: '', videoUrl: '', thumbnailUrl: '' });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Testimonials */}
          <div style={s.listContainer}>
            <h3>Active Client Feedback</h3>
            {testimonials.length === 0 ? (
              <p style={{ marginTop: '1rem' }}>No testimonials added yet.</p>
            ) : (
              <div style={s.listItems}>
                {testimonials.map(test => (
                  <div key={test.id} className="glass-card" style={s.listItem}>
                    <img 
                      src={test.clientAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop"} 
                      alt="" 
                      style={{ ...s.listThumb, borderRadius: '50%' }}
                    />
                    <div style={s.listItemInfo}>
                      <h4 style={s.listTitle}>{test.clientName}</h4>
                      <span style={s.listTag}>{test.clientCompany || 'Independent'}</span>
                    </div>
                    <div style={s.listItemActions}>
                      <button onClick={() => startEditTest(test)} style={s.editBtn} title="Edit"><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteTestimonial(test.id)} style={s.deleteBtn} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
}

// Styles are now generated dynamically based on screen size (isMobile)
const getStyles = (isMobile) => ({
  dashboardContainer: {
    paddingTop: isMobile ? '1.5rem' : '3rem',
    paddingBottom: isMobile ? '3rem' : '6rem',
    paddingLeft: isMobile ? '1rem' : undefined,
    paddingRight: isMobile ? '1rem' : undefined,
  },
  topHeader: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? '1rem' : 0,
    marginBottom: isMobile ? '1.5rem' : '2.5rem',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1.5rem',
  },
  headerTitle: {
    fontSize: isMobile ? '1.3rem' : undefined,
    wordBreak: 'break-word',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'center' : 'flex-start',
  },
  messageBox: {
    padding: '0.8rem 1.2rem',
    border: '1px solid',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: isMobile ? '1.5rem' : '2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: isMobile ? '0.8rem' : '1.5rem',
    marginBottom: isMobile ? '1.5rem' : '3rem',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.6rem' : '1rem',
    padding: isMobile ? '1rem' : '1.5rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '16px',
  },
  statIconWrapper: {
    width: isMobile ? '32px' : '40px',
    height: isMobile ? '32px' : '40px',
    borderRadius: '8px',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(59, 130, 246, 0.1)',
    flexShrink: 0,
  },
  statLabel: {
    fontSize: isMobile ? '0.65rem' : '0.75rem',
    color: 'var(--color-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statValue: {
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: 800,
    color: '#ffffff',
    marginTop: '0.2rem',
  },
  tabsContainer: {
    display: 'flex',
    gap: '0.8rem',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1px',
    marginBottom: isMobile ? '1.5rem' : '2.5rem',
    flexWrap: isMobile ? 'nowrap' : 'wrap',
    overflowX: isMobile ? 'auto' : 'visible',
    WebkitOverflowScrolling: 'touch',
  },
  tab: {
    background: 'none',
    border: 'none',
    color: 'var(--color-secondary)',
    padding: isMobile ? '0.7rem 0.9rem' : '0.8rem 1.2rem',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  activeTab: {
    background: 'none',
    border: 'none',
    color: 'var(--color-accent)',
    padding: isMobile ? '0.7rem 0.9rem' : '0.8rem 1.2rem',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
    borderBottom: '2px solid var(--color-accent)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  tabGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
    gap: isMobile ? '2rem' : '3rem',
  },
  formCard: {
    padding: isMobile ? '1.2rem' : '2rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '16px',
    height: 'fit-content',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    marginTop: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
    gap: '1rem',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--color-secondary)',
  },
  input: {
    backgroundColor: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '0.65rem 0.9rem',
    color: '#ffffff',
    fontSize: '16px', // 16px prevents iOS Safari auto-zoom on focus
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  formActions: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '0.8rem',
    marginTop: '0.5rem',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  listItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginTop: '1rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.7rem' : '1rem',
    padding: isMobile ? '0.7rem 0.9rem' : '0.8rem 1.2rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
  },
  listThumb: {
    width: isMobile ? '38px' : '46px',
    height: isMobile ? '38px' : '46px',
    objectFit: 'cover',
    borderRadius: '6px',
    backgroundColor: '#111',
    flexShrink: 0,
  },
  listItemInfo: {
    flex: 1,
    minWidth: 0,
  },
  listTitle: {
    fontSize: isMobile ? '0.82rem' : '0.9rem',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listTag: {
    fontSize: isMobile ? '0.68rem' : '0.75rem',
    color: '#64748b',
    marginTop: '0.1rem',
    display: 'block',
    textTransform: 'uppercase',
  },
  listItemActions: {
    display: 'flex',
    gap: '0.5rem',
    flexShrink: 0,
  },
  editBtn: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  deleteBtn: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  inquiriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  emptyInquiries: {
    padding: '3rem',
    textAlign: 'center',
    color: 'var(--color-secondary)',
    borderRadius: '16px',
  },
  inquiriesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inquiryCard: {
    padding: isMobile ? '1.2rem' : '2rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '16px',
  },
  inquiryHeader: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'flex-start',
    gap: isMobile ? '0.6rem' : 0,
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  inquiryName: {
    fontSize: isMobile ? '0.95rem' : '1.05rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  inquiryEmail: {
    fontSize: '0.85rem',
    color: 'var(--color-accent)',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },
  inquiryMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  inquiryDate: {
    fontSize: '0.78rem',
    color: '#64748b',
  },
  inquiryDeleteBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    padding: '2px',
  },
  inquiryMessage: {
    fontSize: isMobile ? '0.88rem' : '0.95rem',
    color: '#e2e8f0',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
  }
});

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .editBtn:hover {
      background-color: var(--color-accent) !important;
      color: white !important;
    }
    .deleteBtn:hover {
      background-color: #ef4444 !important;
      color: white !important;
    }
    .inquiryDeleteBtn:hover {
      opacity: 1 !important;
    }
    select {
      appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24Hz' fill='none'/></svg>");
      background-repeat: no-repeat;
      background-position: right 10px center;
      padding-right: 30px !important;
    }
    .admin-tabs-scroll::-webkit-scrollbar {
      height: 4px;
    }
    .admin-tabs-scroll::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.15);
      border-radius: 4px;
    }
    @media (max-width: 768px) {
      .admin-dashboard .glass-card {
        width: 100%;
        box-sizing: border-box;
      }
      .admin-dashboard input,
      .admin-dashboard textarea,
      .admin-dashboard select {
        font-size: 16px !important;
      }
    }
    @media (max-width: 480px) {
      .admin-dashboard h2 {
        font-size: 1.15rem !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}