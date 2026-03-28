import React from 'react';
import { ARTICLES } from '../data';
import Sidebar from '../components/Sidebar';

const WORLD = [
  { id:10, cat:"World News", icon:"🌍", color:"#7B2FBE", title:"Major earthquake strikes Turkey — 6.8 magnitude, rescue teams deployed", excerpt:"A powerful 6.8 magnitude earthquake has struck central Turkey causing widespread damage. International rescue teams are being deployed as casualty numbers rise.", time:"30 min ago", source:"Reuters · BBC · AP", img:"https://images.unsplash.com/photo-1590845947376-2638caa89309?w=600&q=80", breaking:true },
  { id:11, cat:"World News", icon:"🌍", color:"#7B2FBE", title:"EU announces new €2 billion climate fund targeting Mediterranean nations", excerpt:"Malta and other Mediterranean member states stand to benefit significantly from the new EU green transition fund announced in Brussels.", time:"2 hrs ago", source:"Reuters", img:"https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=600&q=80" },
  { id:12, cat:"World News", icon:"🌍", color:"#7B2FBE", title:"Global oil prices drop 8% on surprise OPEC production announcement", excerpt:"Oil markets tumbled after OPEC+ surprised traders with a larger-than-expected production increase, sending Brent crude below $75 per barrel.", time:"4 hrs ago", source:"AP · Bloomberg", img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80" },
  { id:13, cat:"World News", icon:"🌍", color:"#7B2FBE", title:"Italy announces new visa-free travel agreement with 15 countries", excerpt:"The agreement, which includes several North African nations, is expected to boost tourism across the Mediterranean including Malta as a transit hub.", time:"6 hrs ago", source:"CNN · Al Jazeera", img:"https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&q=80" },
];

export default function WorldNews() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#7B2FBE'}}/>
          <h1>🌍 World News</h1>
          <p>International news curated for Malta — what matters to us from around the globe</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="two-col">
          <main>
            <div className="sec-head"><div className="sec-accent" style={{background:'#7B2FBE'}}/><h2>International Headlines</h2></div>
            <div className="two-col-equal">
              {WORLD.map(a => (
                <div key={a.id} className={`art-card ${a.breaking?'breaking':''}`}>
                  <img src={a.img} alt="" className="art-card-img"/>
                  <div className="art-card-body">
                    <div className="art-card-cat" style={{color:'#7B2FBE'}}>{a.icon} {a.cat}</div>
                    <div className="art-card-title">{a.title}</div>
                    <div className="art-card-excerpt">{a.excerpt}</div>
                    <div className="art-card-meta"><span>{a.source}</span><span style={{color:'#ddd'}}>·</span><span>{a.time}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </main>
          <Sidebar/>
        </div>
      </div>
    </>
  );
}
