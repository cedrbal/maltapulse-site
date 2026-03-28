import React from 'react';
import { SHOWS } from '../data';

export default function Shows() {
  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#4a1a6b,#1a1a6b)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#E8B922'}}/>
          <h1 style={{color:'#fff'}}>🎭 Shows & Events in Malta</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Concerts, theatre, festivals and nightlife — everything happening on the island</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="sec-head"><div className="sec-accent" style={{background:'#E8B922'}}/><h2>This Week</h2></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginBottom:32}} className="shows-grid-inner">
          {SHOWS.map(s => (
            <div key={s.id} className="show-card">
              <img src={s.img} alt={s.name}/>
              <div className="show-card-body">
                <div className="show-date">{s.date} · {s.time}</div>
                <div className="show-name">{s.name}</div>
                <div className="show-venue">📍 {s.venue}</div>
                <span className="show-price">{s.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="newsletter">
          <h3>Never Miss a Show 🎭</h3>
          <p>Get weekly event picks delivered to your inbox every Thursday</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email"/>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
}
