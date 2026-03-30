import React, { useState, useEffect } from 'react';
import { API_URL } from '../data';

function conditionEmoji(cond) {
  if (!cond) return '🌤️';
  const c = cond.toLowerCase();
  if (c.includes('thunder') || c.includes('storm')) return '⛈️';
  if (c.includes('snow') || c.includes('sleet') || c.includes('ice')) return '❄️';
  if (c.includes('rain') || c.includes('shower') || c.includes('drizzle')) return '🌧️';
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return '🌫️';
  if (c.includes('wind')) return '💨';
  if (c.includes('overcast') || c.includes('cloudy')) return '☁️';
  if (c.includes('partly') || c.includes('mostly cloudy')) return '⛅';
  return '☀️';
}

function timeAgo(ts) {
  if (!ts) return null;
  const mins = Math.round((Date.now() - new Date(ts)) / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export default function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      fetch(`${API_URL}/api/weather`)
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (d) setData(d); setLoading(false); })
        .catch(() => setLoading(false));
    load();
    const iv = setInterval(load, 10 * 60 * 1000); // refresh every 10 min
    return () => clearInterval(iv);
  }, []);

  const locations = data?.locations || [];
  const primary = locations.find(l => l.location === 'Valletta') || locations[0] || null;
  const updatedAgo = timeAgo(data?.updated);

  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a6fb5,#0d4a8a)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#E8B922'}}/>
          <h1 style={{color:'#fff'}}>🌤️ Malta Weather</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Live conditions across Malta and Gozo — updated hourly</p>
        </div>
      </div>

      <div className="page-wrap">
        {loading ? (
          <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Loading weather data…</div>
        ) : !primary ? (
          <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Weather data unavailable</div>
        ) : (
          <>
            {/* CURRENT CONDITIONS - PRIMARY */}
            <div style={{background:'linear-gradient(135deg,#1a6fb5,#0d4a8a)',borderRadius:18,padding:28,color:'#fff',marginBottom:24}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
                <div>
                  <div style={{fontSize:11,letterSpacing:2,opacity:0.6,textTransform:'uppercase',marginBottom:4}}>
                    Current Conditions · {primary.location}
                  </div>
                  <div style={{fontWeight:700,fontSize:72,lineHeight:1,fontFamily:"'Inter',sans-serif"}}>
                    {Math.round(primary.temp)}°C
                  </div>
                  <div style={{fontSize:22,fontWeight:600,marginBottom:10}}>
                    {conditionEmoji(primary.conditions)} {primary.conditions}
                  </div>
                  {updatedAgo && (
                    <div style={{fontSize:12,opacity:0.5}}>Updated {updatedAgo}</div>
                  )}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,alignContent:'center'}}>
                  {[
                    ['💨','Wind',`${Math.round(primary.wind_speed)} km/h`],
                    ['💧','Humidity',`${Math.round(primary.humidity)}%`],
                    ['🌧️','Rain Chance',`${Math.round(primary.rain_prob || 0)}%`],
                    ['🌡️','Feels Like',`${Math.round(primary.feels_like || primary.temp)}°C`],
                  ].map(([icon,label,val]) => (
                    <div key={label} style={{background:'rgba(255,255,255,0.12)',borderRadius:10,padding:'10px 12px'}}>
                      <div style={{fontSize:18}}>{icon}</div>
                      <div style={{fontSize:11,opacity:0.55,textTransform:'uppercase',letterSpacing:1}}>{label}</div>
                      <div style={{fontSize:14,fontWeight:700}}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ALL LOCATIONS */}
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #E5E0D8',padding:20,marginBottom:24}}>
              <div className="sec-head" style={{marginBottom:16,paddingBottom:10}}>
                <div className="sec-accent" style={{background:'#1a6fb5'}}/>
                <h2>All Locations</h2>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
                {locations.map(l => (
                  <div key={l.location} style={{background:'#F8F7F5',borderRadius:12,padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:15}}>{l.location}</div>
                      <div style={{fontSize:13,color:'#666',marginTop:2}}>
                        {conditionEmoji(l.conditions)} {l.conditions}
                      </div>
                      <div style={{fontSize:12,color:'#999',marginTop:4}}>
                        💨 {Math.round(l.wind_speed)} km/h &nbsp;·&nbsp; 💧 {Math.round(l.humidity)}%
                        {l.rain_prob > 0 ? ` · 🌧️ ${Math.round(l.rain_prob)}%` : ''}
                      </div>
                    </div>
                    <div style={{fontWeight:700,fontSize:34,color:'#1a6fb5',fontFamily:"'Inter',sans-serif"}}>
                      {Math.round(l.temp)}°
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WIND & RAIN ALERTS */}
            {(primary.wind_speed > 50 || primary.rain_prob > 60) && (
              <div style={{background:'#fff8e1',borderRadius:14,border:'2px solid #E8B922',padding:18,marginBottom:24}}>
                <div style={{fontWeight:700,fontSize:15,color:'#b8860b',marginBottom:8}}>⚠️ Weather Advisory</div>
                <div style={{fontSize:13,color:'#666',lineHeight:1.6}}>
                  {primary.wind_speed > 50 && <div>• Strong winds of {Math.round(primary.wind_speed)} km/h — caution advised at sea and exposed areas.</div>}
                  {primary.rain_prob > 60 && <div>• High probability of rain ({Math.round(primary.rain_prob)}%) — carry an umbrella.</div>}
                </div>
              </div>
            )}

            {/* DATA SOURCE NOTE */}
            <div style={{textAlign:'center',fontSize:11,color:'#bbb',marginTop:8}}>
              Live data via Tomorrow.io · Updates every hour
              {updatedAgo && ` · Last updated ${updatedAgo}`}
            </div>
          </>
        )}
      </div>
    </>
  );
}
