import React, { useState, useEffect } from 'react';
import { ARTICLES, TRAFFIC_ROUTES } from '../data';
import { API_URL } from '../data';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/weather`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d && d.locations && d.locations.length) setWeather(d); })
      .catch(() => {});
  }, []);

  const valletta = weather?.locations?.find(l => l.location === 'Valletta') || null;

  if (!valletta) return (
    <div className="weather-widget">
      <div className="weather-title">🌤️ Malta Weather</div>
      <div className="weather-temp">—°C</div>
      <div className="weather-desc">Loading...</div>
    </div>
  );

  const windIcon = valletta.wind_speed > 50 ? '💨' : '🌬️';
  const updatedMins = weather?.updated
    ? Math.round((Date.now() - new Date(weather.updated)) / 60000)
    : null;

  return (
    <div className="weather-widget">
      <div className="weather-title">🌤️ Malta Weather</div>
      <div className="weather-temp">{Math.round(valletta.temp)}°C</div>
      <div className="weather-desc">{valletta.conditions} · Valletta</div>
      <div className="weather-grid">
        <div className="weather-stat">
          <span className="weather-stat-val">{windIcon} {Math.round(valletta.wind_speed)}</span>
          <span className="weather-stat-label">km/h wind</span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat-val">{Math.round(valletta.humidity)}%</span>
          <span className="weather-stat-label">Humidity</span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat-val">{valletta.rain_prob ? Math.round(valletta.rain_prob) : 0}%</span>
          <span className="weather-stat-label">Rain chance</span>
        </div>
      </div>
      <div className="weather-updated">
        {updatedMins !== null ? `Updated ${updatedMins < 2 ? 'just now' : `${updatedMins} min ago`}` : 'Live data'}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside>
      <div className="sidebar-sticky">
        {/* WEATHER */}
        <WeatherWidget />

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
