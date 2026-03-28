import React from 'react';

const FORECAST = [
  { day:'Today', icon:'☀️', high:28, low:21, desc:'Sunny' },
  { day:'Tue', icon:'⛅', high:26, low:20, desc:'Partly cloudy' },
  { day:'Wed', icon:'🌤️', high:29, low:22, desc:'Mostly sunny' },
  { day:'Thu', icon:'🔥', high:35, low:26, desc:'Very hot' },
  { day:'Fri', icon:'⛅', high:30, low:23, desc:'Partly cloudy' },
  { day:'Sat', icon:'🌧️', high:24, low:19, desc:'Showers' },
  { day:'Sun', icon:'☀️', high:27, low:20, desc:'Sunny' },
];

export default function Weather() {
  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a6fb5,#0d4a8a)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#E8B922'}}/>
          <h1 style={{color:'#fff'}}>🌤️ Malta Weather</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Live conditions and 7-day forecast for Malta and Gozo</p>
        </div>
      </div>
      <div className="page-wrap">
        {/* CURRENT */}
        <div style={{background:'linear-gradient(135deg,#1a6fb5,#0d4a8a)',borderRadius:18,padding:28,color:'#fff',marginBottom:24,display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          <div>
            <div style={{fontSize:11,letterSpacing:2,opacity:0.6,textTransform:'uppercase',marginBottom:4}}>Current Conditions · Grand Harbour</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:80,lineHeight:1}}>28°C</div>
            <div style={{fontSize:18,fontWeight:600,marginBottom:12}}>☀️ Sunny & Clear</div>
            <div style={{fontSize:13,opacity:0.7}}>Feels like 31°C · UV Index: Very High (8)</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,alignContent:'center'}}>
            {[['💨','Wind','14 km/h NE'],['💧','Humidity','65%'],['👁️','Visibility','10 km'],['🌊','Sea Temp','22°C'],['🌅','Sunrise','06:12'],['🌇','Sunset','19:48']].map(([icon,label,val])=>(
              <div key={label} style={{background:'rgba(255,255,255,0.12)',borderRadius:10,padding:'10px 12px'}}>
                <div style={{fontSize:18}}>{icon}</div>
                <div style={{fontSize:11,opacity:0.55,textTransform:'uppercase',letterSpacing:1}}>{label}</div>
                <div style={{fontSize:14,fontWeight:700}}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-DAY */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #E5E0D8',padding:20,marginBottom:24}}>
          <div className="sec-head" style={{marginBottom:16,paddingBottom:10}}>
            <div className="sec-accent" style={{background:'#1a6fb5'}}/>
            <h2>7-Day Forecast</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8}}>
            {FORECAST.map(d => (
              <div key={d.day} style={{textAlign:'center',padding:'12px 6px',borderRadius:10,background:d.day==='Today'?'#E8F4FD':'transparent'}}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:6,color:d.day==='Today'?'#1a6fb5':'#666'}}>{d.day}</div>
                <div style={{fontSize:28,marginBottom:6}}>{d.icon}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:18}}>{d.high}°</div>
                <div style={{fontSize:12,color:'#aaa'}}>{d.low}°</div>
                <div style={{fontSize:10,color:'#999',marginTop:4}}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* GOZO */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
          {[{loc:'Valletta',temp:28,desc:'Sunny'},{loc:'Sliema',temp:27,desc:'Sunny'},{loc:'Gozo (Victoria)',temp:26,desc:'Breezy'},{loc:'Marsaxlokk',temp:29,desc:'Hot & sunny'}].map(l=>(
            <div key={l.loc} style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',padding:18,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:600,fontSize:15}}>{l.loc}</div>
                <div style={{fontSize:13,color:'#666',marginTop:2}}>{l.desc}</div>
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:36,color:'#1a6fb5'}}>{l.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
