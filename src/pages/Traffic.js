import React, { useState, useEffect } from 'react';
import { API_URL } from '../data';

function timeAgo(ts) {
  if (!ts) return '';
  const d = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (d < 60) return 'just now';
  if (d < 3600) return `${Math.floor(d / 60)} min ago`;
  return `${Math.floor(d / 3600)}h ago`;
}

export default function Traffic() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      fetch(`${API_URL}/api/traffic`)
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (d) setData(d); setLoading(false); })
        .catch(() => setLoading(false));

    load();
    const iv = setInterval(load, 5 * 60 * 1000); // refresh every 5 mins
    return () => clearInterval(iv);
  }, []);

  const routes = data?.routes || [];
  const heavy  = routes.filter(r => r.status === 'heavy');
  const updatedAgo = data?.updated ? timeAgo(data.updated) : null;

  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a3a1a,#0d2b0d)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#2d9e6b'}}/>
          <h1 style={{color:'#fff'}}>🚗 Live Traffic</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Real-time road conditions across Malta — updated every 5 minutes</p>
        </div>
      </div>
      <div className="page-wrap">
        {loading ? (
          <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Loading traffic data…</div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>

            {/* ROAD STATUS */}
            <div>
              <div className="sec-head">
                <div className="sec-accent" style={{background:'#2d9e6b'}}/>
                <h2>Road Status</h2>
              </div>
              <div style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',padding:'4px 14px',marginBottom:8}}>
                {routes.length === 0 ? (
                  <div style={{padding:20,color:'#aaa',textAlign:'center'}}>No data yet</div>
                ) : routes.map(r => (
                  <div key={r.name} className="traffic-route">
                    <span className="traffic-route-name">{r.name.split('(')[0].trim()}</span>
                    <span className={`traffic-badge ${r.status}`}>
                      {r.status === 'clear' ? '✓ Clear'
                       : r.status === 'slow' ? `~${r.delay} min`
                       : `⚠ Heavy ${r.delay > 0 ? `+${r.delay}min` : ''}`}
                    </span>
                  </div>
                ))}
              </div>
              {updatedAgo && (
                <div style={{fontSize:11,color:'#aaa',textAlign:'right'}}>
                  Updated {updatedAgo}
                </div>
              )}
            </div>

            {/* INCIDENTS / HEAVY ROUTES */}
            <div>
              <div className="sec-head">
                <div className="sec-accent" style={{background:'#CE1126'}}/>
                <h2>Active Incidents</h2>
              </div>
              {heavy.length === 0 ? (
                <div style={{background:'#f0faf5',borderRadius:12,border:'1px solid #c8e6c9',padding:20,textAlign:'center'}}>
                  <div style={{fontSize:28,marginBottom:8}}>✅</div>
                  <div style={{fontWeight:600,color:'#2d9e6b'}}>Roads are clear</div>
                  <div style={{fontSize:13,color:'#888',marginTop:4}}>No major incidents reported</div>
                </div>
              ) : heavy.map((r, i) => (
                <div key={i} style={{background:'#fff',borderRadius:12,border:'2px solid #fce4ec',padding:16,marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span className="traffic-badge heavy" style={{fontWeight:700,fontSize:12,letterSpacing:1}}>
                      ⚠ HEAVY TRAFFIC
                    </span>
                    <span style={{fontSize:11,color:'#aaa'}}>{updatedAgo}</span>
                  </div>
                  <div style={{fontWeight:600,fontSize:15,marginBottom:4}}>{r.name.split('(')[0].trim()}</div>
                  <div style={{fontSize:13,color:'#666'}}>
                    Expect delays of approximately <strong>{r.delay} minutes</strong>. Consider an alternative route.
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </>
  );
}
