import React from 'react';
import { HAPPENING } from '../data';

const MORE = [
  { id:5, title:"Gozo Eco Trail Weekend", desc:"A guided eco trail across Gozo's stunning countryside, organised by Nature Trust Malta.", img:"https://images.unsplash.com/photo-1471958680802-1345a694ba6d?w=400&q=80", cat:"Outdoors" },
  { id:6, title:"Valletta Food Market Every Friday", desc:"Fresh local produce, artisan food and street food every Friday morning at Merchants Street.", img:"https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80", cat:"Food" },
  { id:7, title:"Blue Lagoon Day Trip from Valletta", desc:"Daily ferries to Comino's Blue Lagoon now running. Book in advance — spots sell out fast!", img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", cat:"Tourism" },
  { id:8, title:"Vintage Car Show at Ta' Qali", desc:"Malta's biggest vintage car show returns with over 150 vehicles on display. Free entry.", img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80", cat:"Cars" },
];

export default function Happening() {
  const all = [...HAPPENING, ...MORE];
  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#b35a00,#8B1A1A)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#E8B922'}}/>
          <h1 style={{color:'#fff'}}>✨ What's Happening in Malta</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Discover the best things to do, see and experience across the Maltese islands</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="sec-head"><div className="sec-accent" style={{background:'#FF6B35'}}/><h2>This Week in Malta</h2></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18,marginBottom:32}}>
          {all.map(h => (
            <div key={h.id} className="hap-card">
              <img src={h.img} alt={h.title}/>
              <div className="hap-card-body">
                <div className="hap-card-cat">{h.cat}</div>
                <div className="hap-card-title">{h.title}</div>
                <div className="hap-card-desc">{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
