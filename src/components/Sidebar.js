import React from 'react';
import { ARTICLES, TRAFFIC_ROUTES } from '../data';

export default function Sidebar() {
  return (
    <aside>
      <div className="sidebar-sticky">
        {/* WEATHER */}
        <div className="weather-widget">
          <div className="weather-title">🌤️ Malta Weather</div>
          <div className="weather-temp">28°C</div>
          <div className="weather-desc">Sunny & clear · Grand Harbour</div>
          <div className="weather-grid">
            <div className="weather-stat"><span className="weather-stat-val">32°</span><span className="weather-stat-label">High</span></div>
            <div className="weather-stat"><span className="weather-stat-val">65%</span><span className="weather-stat-label">Humidity</span></div>
            <div className="weather-stat"><span className="weather-stat-val">UV 8</span><span className="weather-stat-label">Index</span></div>
          </div>
          <div className="weather-updated">Updated 5 min ago</div>
        </div>

        {/* TRAFFIC */}
        <div className="traffic-widget">
          <div className="sec-head" style={{marginBottom:10,paddingBottom:8}}>
            <div className="sec-accent" style={{background:'#2d9e6b'}} />
            <h2 style={{fontSize:15}}>🚗 Live Traffic</h2>
          </div>
          {TRAFFIC_ROUTES.slice(0,4).map(r => (
            <div key={r.name} className="traffic-route">
              <span className="traffic-route-name">{r.name.split('(')[0].trim()}</span>
              <span className={`traffic-badge ${r.status}`}>
                {r.status === 'clear' ? '✓ Clear' : r.status === 'slow' ? `~${r.delay}min` : `⚠ Heavy`}
              </span>
            </div>
          ))}
          <div style={{fontSize:10,color:'#aaa',marginTop:8}}>Updated 3 min ago · Google Maps</div>
        </div>

        {/* FACEBOOK */}
        <div className="fb-widget">
          <div className="fb-widget-header">
            <div className="fb-icon">f</div>
            <h3>Malta Pulse</h3>
          </div>
          <div className="fb-stat">Follow us for live updates, breaking news and more 🇲🇹</div>
          <a href="https://facebook.com/MaltaPulse" target="_blank" rel="noreferrer" className="btn-follow">👍 Follow on Facebook</a>
        </div>

        {/* TRENDING */}
        <div className="sidebar-card">
          <div className="sec-head" style={{marginBottom:12,paddingBottom:8}}>
            <div className="sec-accent" />
            <h2 style={{fontSize:15}}>🔥 Trending</h2>
          </div>
          <ul className="trending-list">
            {ARTICLES.slice(0,5).map((a,i) => (
              <li key={a.id} className="trending-item">
                <div className="trending-num">0{i+1}</div>
                <div>
                  <div className="trending-title">{a.title}</div>
                  <div className="trending-meta">{a.cat} · {a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
