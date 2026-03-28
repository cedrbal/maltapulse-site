import React from 'react';

export default function About() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-accent"/>
          <h1>ℹ️ About Malta Pulse</h1>
          <p>Malta's first 24/7 AI-powered news platform</p>
        </div>
      </div>
      <div className="page-wrap" style={{maxWidth:900}}>
        <div className="info-card" style={{marginBottom:24}}>
          <h2>🇲🇹 Our Story</h2>
          <p>Malta Pulse was founded with one mission: to give every person in Malta access to fast, accurate, and engaging news — 24 hours a day, 7 days a week.</p>
          <p>We combine the latest AI technology with passionate local journalism to bring you breaking news the moment it happens, along with weather, traffic, events, sports and lifestyle content that matters to the Maltese community.</p>
          <p>Whether you're stuck in traffic on the Mosta bypass or planning your weekend in Gozo — Malta Pulse has you covered.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:18,marginBottom:24}}>
          {[['24/7','Always on — news never sleeps'],['5 min','Update frequency for breaking news'],['7','AI agents working around the clock']].map(([val,label])=>(
            <div key={val} style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',padding:22,textAlign:'center'}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:44,color:'#CE1126'}}>{val}</div>
              <div style={{fontSize:13,color:'#666',lineHeight:1.4}}>{label}</div>
            </div>
          ))}
        </div>
        <div className="info-card">
          <h2>📬 Get In Touch</h2>
          <p>Have a news tip? Want to advertise? Or just want to say hello? We'd love to hear from you.</p>
          <p><strong>Email:</strong> hello@maltapulse.net</p>
          <p><strong>Facebook:</strong> <a href="https://facebook.com/MaltaPulse" target="_blank" rel="noreferrer" style={{color:'#1877F2'}}>facebook.com/MaltaPulse</a></p>
        </div>
      </div>
    </>
  );
}
