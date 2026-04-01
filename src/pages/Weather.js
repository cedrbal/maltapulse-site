import React, { useState, useEffect } from 'react';
import { API_URL } from '../data';

const BEACHES = [
  { name: 'Golden Bay',       area: 'Mellieha',   type: 'Sandy',  img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
  { name: "Mellieħa Bay",     area: 'Mellieha',   type: 'Sandy',  img: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80' },
  { name: 'Blue Lagoon',      area: 'Comino',     type: 'Rocky',  img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80' },
  { name: "Għajn Tuffieħa",   area: 'Mellieha',   type: 'Sandy',  img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80' },
  { name: "St Peter's Pool",  area: 'Marsaxlokk', type: 'Rocky',  img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80' },
  { name: 'Armier Bay',       area: 'Mellieha',   type: 'Sandy',  img: 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=600&q=80' },
  { name: 'Gnejna Bay',       area: 'Mgarr',      type: 'Sandy',  img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80' },
  { name: 'Pretty Bay',       area: 'Birżebbuġa', type: 'Sandy',  img: 'https://images.unsplash.com/photo-1484821582734-6692f8b6e8f5?w=600&q=80' },
  { name: 'Marsalforn',       area: 'Gozo',       type: 'Rocky',  img: 'https://images.unsplash.com/photo-1528629297340-d1d466945dc5?w=600&q=80' },
  { name: "St George's Bay",  area: 'St Julian\'s', type: 'Sandy', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
];

const RATING_COLOR = {
  'Perfect':  '#2d9e6b',
  'Good':     '#1877F2',
  'Fair':     '#E8B922',
  'Poor':     '#CE1126',
  'Closed':   '#888',
};

const RATING_EMOJI = {
  'Perfect': '🏆',
  'Good':    '👍',
  'Fair':    '⚠️',
  'Poor':    '❌',
  'Closed':  '🚫',
};

function conditionEmoji(cond) {
  if (!cond) return '☀️';
  const c = cond.toLowerCase();
  if (c.includes('thunder')) return '⛈️';
  if (c.includes('rain') || c.includes('drizzle')) return '🌧️';
  if (c.includes('fog')) return '🌫️';
  if (c.includes('cloudy') || c.includes('overcast')) return '☁️';
  if (c.includes('partly')) return '⛅';
  return '☀️';
}

function timeAgo(ts) {
  if (!ts) return null;
  const mins = Math.round((Date.now() - new Date(ts)) / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export default function Beaches() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      fetch(`${API_URL}/api/beaches`)
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (d) setData(d); setLoading(false); })
        .catch(() => setLoading(false));
    load();
    const iv = setInterval(load, 30 * 60 * 1000);
    return () => clearInterval(iv);
  }, []);

  const weather  = data?.weather || null;
  const beaches  = data?.beaches || [];
  const summary  = data?.summary || '';
  const rating   = data?.overall_rating || '';
  const updated  = timeAgo(data?.updated);

  // Map recommended beach names to BEACHES list for images
  const enriched = beaches.map(b => {
    const meta = BEACHES.find(x => x.name.toLowerCase().includes(b.name.toLowerCase().split(' ')[0])) || BEACHES[0];
    return { ...b, img: meta.img, area: meta.area, type: meta.type };
  });

  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#006994,#0099cc)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#F5C842'}}/>
          <h1 style={{color:'#fff'}}>🏖️ Best Beaches Today</h1>
          <p style={{color:'rgba(255,255,255,0.7)'}}>
            Today's top beaches in Malta — updated every 3 hours based on live conditions
          </p>
        </div>
      </div>

      <div className="page-wrap">
        {loading ? (
          <div style={{textAlign:'center',padding:80,color:'#aaa'}}>Checking beach conditions…</div>
        ) : !data ? (
          <div style={{textAlign:'center',padding:80,color:'#aaa'}}>Beach data unavailable. Check back soon.</div>
        ) : (
          <>
            {/* WEATHER STRIP */}
            {weather && (
              <div style={{background:'linear-gradient(135deg,#006994,#0099cc)',borderRadius:16,padding:'20px 24px',color:'#fff',marginBottom:24,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
                <div>
                  <div style={{fontSize:11,opacity:0.6,textTransform:'uppercase',letterSpacing:2,marginBottom:4}}>
                    Current Malta Conditions
                  </div>
                  <div style={{fontSize:32,fontWeight:700,fontFamily:"'Inter',sans-serif"}}>
                    {conditionEmoji(weather.conditions)} {Math.round(weather.temp)}°C &nbsp;
                    <span style={{fontSize:16,fontWeight:400,opacity:0.8}}>{weather.conditions}</span>
                  </div>
                </div>
                <div style={{display:'flex',gap:20}}>
                  {[
                    ['💨', `${Math.round(weather.wind_speed || 0)} km/h`, 'Wind'],
                    ['🌧️', `${Math.round(weather.rain_prob || 0)}%`, 'Rain'],
                    ['💧', `${Math.round(weather.humidity || 0)}%`, 'Humidity'],
                  ].map(([icon, val, label]) => (
                    <div key={label} style={{textAlign:'center'}}>
                      <div style={{fontSize:20}}>{icon}</div>
                      <div style={{fontWeight:700,fontSize:16}}>{val}</div>
                      <div style={{fontSize:11,opacity:0.6}}>{label}</div>
                    </div>
                  ))}
                </div>
                {updated && (
                  <div style={{fontSize:11,opacity:0.45,alignSelf:'flex-end'}}>Updated {updated}</div>
                )}
              </div>
            )}

            {/* OVERALL RATING */}
            {rating && (
              <div style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',padding:'18px 24px',marginBottom:24}}>
                <div style={{fontWeight:700,fontSize:18,color:'#1a1a1a',marginBottom:8}}>
                  {conditionEmoji(weather?.conditions)} {rating}
                </div>
                {summary && (
                  <p style={{color:'#555',fontSize:15,lineHeight:1.7,margin:0}}>{summary}</p>
                )}
              </div>
            )}

            {/* BEACH CARDS */}
            {enriched.length > 0 && (
              <>
                <div className="sec-head" style={{marginBottom:16}}>
                  <div className="sec-accent" style={{background:'#006994'}}/>
                  <h2>Today's Top Beaches</h2>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:20,marginBottom:32}}>
                  {enriched.map((b, i) => (
                    <div key={i} style={{background:'#fff',borderRadius:16,border:'1px solid #E5E0D8',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                      <div style={{position:'relative',height:160,overflow:'hidden'}}>
                        <img
                          src={b.img}
                          alt={b.name}
                          style={{width:'100%',height:'100%',objectFit:'cover'}}
                          onError={e => { e.target.onerror=null; e.target.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'; }}
                        />
                        <div style={{
                          position:'absolute',top:10,right:10,
                          background: RATING_COLOR[b.rating] || '#1877F2',
                          color:'#fff',borderRadius:8,padding:'4px 10px',
                          fontSize:12,fontWeight:700
                        }}>
                          {RATING_EMOJI[b.rating]} {b.rating}
                        </div>
                        {i === 0 && (
                          <div style={{position:'absolute',top:10,left:10,background:'#F5C842',color:'#1a1a1a',borderRadius:8,padding:'4px 10px',fontSize:11,fontWeight:700}}>
                            ⭐ TODAY'S PICK
                          </div>
                        )}
                      </div>
                      <div style={{padding:'14px 18px'}}>
                        <div style={{fontWeight:700,fontSize:17,marginBottom:2}}>{b.name}</div>
                        <div style={{fontSize:12,color:'#999',marginBottom:8}}>📍 {b.area} · {b.type}</div>
                        <div style={{fontSize:13,color:'#555',lineHeight:1.6}}>{b.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ALL BEACHES QUICK VIEW */}
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #E5E0D8',padding:20,marginBottom:24}}>
              <div className="sec-head" style={{marginBottom:14}}>
                <div className="sec-accent" style={{background:'#006994'}}/>
                <h2>All Malta Beaches</h2>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
                {BEACHES.map(b => (
                  <div key={b.name} style={{background:'#F8F7F5',borderRadius:10,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:14}}>{b.name}</div>
                      <div style={{fontSize:12,color:'#999'}}>📍 {b.area} · {b.type}</div>
                    </div>
                    <div style={{fontSize:18}}>🏖️</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{textAlign:'center',fontSize:11,color:'#bbb',marginTop:4}}>
              Powered by Tomorrow.io weather data · Recommendations updated every 3 hours
            </div>
          </>
        )}
      </div>
    </>
  );
}
