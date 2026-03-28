import React from 'react';
import { ARTICLES } from '../data';
import Sidebar from '../components/Sidebar';

export default function Breaking() {
  const breaking = ARTICLES.filter(a => a.breaking);
  const rest = ARTICLES.filter(a => !a.breaking);
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#CE1126'}}/>
          <h1>🚨 Breaking News</h1>
          <p>Live updates from Malta and around the world — updated every 5 minutes by our AI agents</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="two-col">
          <main>
            <div className="sec-head"><div className="sec-accent" style={{background:'#CE1126'}}/><h2>Breaking Now</h2></div>
            {breaking.map(a => (
              <div key={a.id} className="art-card breaking" style={{marginBottom:16,display:'flex',gap:0,flexDirection:'column'}}>
                <img src={a.img} alt="" className="art-card-img"/>
                <div className="art-card-body">
                  <div className="art-card-cat" style={{color:'#CE1126'}}>🔴 {a.cat}</div>
                  <div className="art-card-title" style={{fontSize:24}}>{a.title}</div>
                  <div className="art-card-excerpt">{a.excerpt}</div>
                  <div className="art-card-meta"><span>{a.source}</span><span style={{color:'#ddd'}}>·</span><span>{a.time}</span></div>
                </div>
              </div>
            ))}
            <div className="sec-head" style={{marginTop:24}}><div className="sec-accent"/><h2>Latest Updates</h2></div>
            {rest.map(a => (
              <div key={a.id} className="list-card">
                <img src={a.img} alt=""/>
                <div>
                  <div className="list-card-cat">{a.icon} {a.cat}</div>
                  <div className="list-card-title">{a.title}</div>
                  <div className="list-card-meta">{a.source} · {a.time}</div>
                </div>
              </div>
            ))}
          </main>
          <Sidebar/>
        </div>
      </div>
    </>
  );
}
