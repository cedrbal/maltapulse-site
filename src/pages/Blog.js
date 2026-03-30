import React, { useState, useEffect } from 'react';
import { API_URL } from '../data';
import Sidebar from '../components/Sidebar';

function timeAgo(ts) {
  if (!ts) return '';
  const d = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (d < 3600) return `${Math.floor(d/60)} min ago`;
  if (d < 86400) return `${Math.floor(d/3600)}h ago`;
  return `${Math.floor(d/86400)} days ago`;
}

function renderMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/^### (.+)$/gm, '<h3 style="font-size:17px;font-weight:700;margin:20px 0 8px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#1a1a1a">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul style="margin:10px 0 10px 20px">${m}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:0 0 14px;line-height:1.75;color:#444">')
    .replace(/^/, '<p style="margin:0 0 14px;line-height:1.75;color:#444">')
    .replace(/$/, '</p>');
}

export default function Blog() {
  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/blog`)
      .then(r => r.ok ? r.json() : [])
      .then(d => { setPosts(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const CAT_COLORS = {
    Travel: '#1a6fb5', Culture: '#E8B922', Food: '#e91e8c',
    Guide: '#2d9e6b', History: '#7B2FBE', default: '#CE1126',
  };

  if (selected) {
    const color = CAT_COLORS[selected.category] || CAT_COLORS.default;
    return (
      <>
        <div className="page-hero" style={{background:`linear-gradient(135deg,${color}dd,${color}88)`}}>
          <div className="page-hero-inner">
            <div className="page-hero-accent" style={{background:'#fff'}}/>
            <div style={{color:'rgba(255,255,255,0.7)',fontSize:12,marginBottom:8}}>
              {selected.category} · {new Date(selected.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
            </div>
            <h1 style={{color:'#fff',fontSize:28,lineHeight:1.3}}>{selected.title}</h1>
            <p style={{color:'rgba(255,255,255,0.7)',marginTop:8}}>By {selected.author || 'Malta Pulse Editorial Team'}</p>
          </div>
        </div>
        <div className="page-wrap" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:32}}>
          <div>
            <button onClick={() => setSelected(null)} style={{background:'none',border:'1px solid #E5E0D8',borderRadius:8,padding:'8px 16px',cursor:'pointer',marginBottom:24,fontSize:13,color:'#666'}}>
              ← Back to Blog
            </button>
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #E5E0D8',padding:'28px 32px'}}>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
                {(selected.tags||[]).map(t => (
                  <span key={t} style={{background:'#F5F3F0',borderRadius:6,padding:'3px 10px',fontSize:12,color:'#666'}}>{t}</span>
                ))}
              </div>
              <div dangerouslySetInnerHTML={{__html: renderMarkdown(selected.content)}} />
            </div>
          </div>
          <Sidebar />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a3a1a,#0d2b0d)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#2d9e6b'}}/>
          <h1 style={{color:'#fff'}}>📝 Malta Pulse Blog</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Guides, tips and stories about life in Malta — updated regularly</p>
        </div>
      </div>
      <div className="page-wrap" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:32}}>
        <div>
          {loading ? (
            <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Loading articles…</div>
          ) : posts.length === 0 ? (
            <div style={{textAlign:'center',padding:60,color:'#aaa'}}>
              <div style={{fontSize:40,marginBottom:12}}>📝</div>
              <div>Blog posts are being generated — check back soon</div>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {/* Featured first post */}
              {posts[0] && (
                <div onClick={() => setSelected(posts[0])} style={{background:'#fff',borderRadius:16,border:'1px solid #E5E0D8',padding:28,cursor:'pointer',transition:'box-shadow 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.08)'}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
                  <div style={{display:'flex',gap:8,marginBottom:12}}>
                    <span style={{background:(CAT_COLORS[posts[0].category]||CAT_COLORS.default)+'20',color:CAT_COLORS[posts[0].category]||CAT_COLORS.default,fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:6,textTransform:'uppercase',letterSpacing:0.5}}>
                      {posts[0].category}
                    </span>
                    <span style={{fontSize:11,color:'#aaa'}}>{timeAgo(posts[0].publishedAt)}</span>
                  </div>
                  <h2 style={{fontWeight:800,fontSize:22,lineHeight:1.3,marginBottom:10,color:'#1a1a1a'}}>{posts[0].title}</h2>
                  <p style={{color:'#666',fontSize:14,lineHeight:1.6,marginBottom:14}}>{posts[0].excerpt}</p>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    {(posts[0].tags||[]).map(t=>(
                      <span key={t} style={{background:'#F5F3F0',borderRadius:6,padding:'2px 8px',fontSize:11,color:'#888'}}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {/* Rest of posts */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                {posts.slice(1).map(post => (
                  <div key={post.id} onClick={() => setSelected(post)} style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',padding:20,cursor:'pointer',transition:'box-shadow 0.15s'}}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.07)'}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
                    <div style={{display:'flex',gap:6,marginBottom:8,alignItems:'center'}}>
                      <span style={{background:(CAT_COLORS[post.category]||CAT_COLORS.default)+'20',color:CAT_COLORS[post.category]||CAT_COLORS.default,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:5,textTransform:'uppercase',letterSpacing:0.5}}>
                        {post.category}
                      </span>
                      <span style={{fontSize:11,color:'#bbb'}}>{timeAgo(post.publishedAt)}</span>
                    </div>
                    <h3 style={{fontWeight:700,fontSize:15,lineHeight:1.35,marginBottom:8,color:'#1a1a1a'}}>{post.title}</h3>
                    <p style={{color:'#888',fontSize:12,lineHeight:1.55}}>{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  );
}
