import React from 'react';
import { TRAFFIC_ROUTES } from '../data';

const INCIDENTS = [
  { type:'Accident', loc:'Mosta Bypass', desc:'Two-vehicle collision — lanes blocked. Emergency services on scene. Expect 25+ min delays.', severity:'heavy', time:'08:43' },
  { type:'Roadworks', loc:'Regional Road, Birkirkara', desc:'Ongoing roadworks near Birkirkara junction. One lane closed 07:00–17:00 weekdays.', severity:'slow', time:'07:00' },
  { type:'Event', loc:'Valletta, Republic Street', desc:'Arts Festival setup causing temporary road closures around St George\'s Square until 18:00.', severity:'slow', time:'09:00' },
];

export default function Traffic() {
  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a3a1a,#0d2b0d)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#2d9e6b'}}/>
          <h1 style={{color:'#fff'}}>🚗 Live Traffic</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Real-time road conditions across Malta and Gozo — updated every 5 minutes</p>
        </div>
      </div>
      <div className="page-wrap">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          {/* ROUTES */}
          <div>
            <div className="sec-head">
              <div className="sec-accent" style={{background:'#2d9e6b'}}/>
              <h2>Road Status</h2>
            </div>
            <div style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',padding:'4px 14px',marginBottom:18}}>
              {TRAFFIC_ROUTES.map(r => (
                <div key={r.name} className="traffic-route">
                  <span className="traffic-route-name">{r.name}</span>
                  <span className={`traffic-badge ${r.status}`}>
                    {r.status==='clear'?'✓ Clear':r.status==='slow'?`~${r.delay} min delay`:'⚠ Heavy traffic'}
                  </span>
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:'#aaa',textAlign:'right'}}>Updated 3 min ago · via Google Maps API</div>
          </div>

          {/* INCIDENTS */}
          <div>
            <div className="sec-head">
              <div className="sec-accent" style={{background:'#CE1126'}}/>
              <h2>Active Incidents</h2>
            </div>
            {INCIDENTS.map((inc,i) => (
              <div key={i} style={{background:'#fff',borderRadius:12,border:`2px solid ${inc.severity==='heavy'?'#fce4ec':inc.severity==='slow'?'#fff3e0':'#e8f5e9'}`,padding:16,marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span className={`traffic-badge ${inc.severity}`} style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:12,letterSpacing:1}}>{inc.type.toUpperCase()}</span>
                  <span style={{fontSize:11,color:'#aaa'}}>{inc.time}</span>
                </div>
                <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>{inc.loc}</div>
                <div style={{fontSize:12,color:'#666',lineHeight:1.55}}>{inc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
