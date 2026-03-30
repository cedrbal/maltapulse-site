import React from 'react';

const PLANS = [
  { name:"Starter", price:"€199/mo", badge:null, features:["Banner ad on homepage","500+ daily impressions","Mobile optimised","Weekly performance report"] },
  { name:"Growth", price:"€499/mo", badge:"Most Popular", features:["Homepage hero placement","3,000+ daily impressions","Breaking news sidebar","Social media mention","Bi-weekly report"] },
  { name:"Premium", price:"€999/mo", badge:null, features:["Full-site exclusivity","10,000+ daily impressions","Sponsored article (2/month)","Facebook post mention","Dedicated account manager","Daily reports"] },
];

export default function Advertise() {
  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a1a1a,#CE1126)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#E8B922'}}/>
          <h1 style={{color:'#fff'}}>📣 Advertise With Us</h1>
          <p style={{color:'rgba(255,255,255,0.7)'}}>Reach thousands of Maltese readers every day with Malta Pulse</p>
        </div>
      </div>
      <div className="page-wrap">
        <div style={{textAlign:'center',maxWidth:640,margin:'0 auto 40px'}}>
          <h2 style={{fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:26,marginBottom:10}}>Why Advertise on Malta Pulse?</h2>
          <p style={{color:'#666',fontSize:14,lineHeight:1.7}}>Malta Pulse is Malta's fastest-growing 24/7 news platform. Our AI agents post breaking news around the clock, keeping readers engaged throughout the day — meaning your ad gets maximum exposure.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:40}}>
          {PLANS.map(p => (
            <div key={p.name} className={`adv-plan ${p.badge?'featured':''}`}>
              {p.badge && <div className="adv-plan-badge">{p.badge}</div>}
              <h3>{p.name}</h3>
              <div className="price">{p.price}</div>
              <ul>{p.features.map(f=><li key={f}>{f}</li>)}</ul>
              <button className="btn-submit" style={{background:p.badge?'#CE1126':'#1a1a1a'}}>Get Started →</button>
            </div>
          ))}
        </div>
        <div className="info-card" style={{textAlign:'center',maxWidth:600,margin:'0 auto'}}>
          <h2>Custom Packages</h2>
          <p>Need something specific? We offer custom advertising packages for brands of all sizes. Contact us at <strong>ads@maltapulse.net</strong> and we'll put together a proposal.</p>
        </div>
      </div>
    </>
  );
}
