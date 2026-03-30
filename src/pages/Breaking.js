import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../data';
import Sidebar from '../components/Sidebar';

const cardLink = { textDecoration:'none', color:'inherit' };

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
              <Link key={a.id} to={`/article/${a.id}`} state={{article:a}} style={{...cardLink,marginBottom:16,display:'flex',flexDirection:'column'}} className="art-card breaking">
                <img src={a.img} alt="" className="art-card-img"/>
                <div className="art-card-body">
                  <div className="art-card-cat" style={{color:'#CE1126'}}>🔴 {a.cat}</div>
                  <div className="art-card-title" style={{fontSize:24}}>{a.title}</div>
                  <div className="art-card-excerpt">{a.excerpt}</div>
                  <div className="art-card-meta"><span>{a.time}</span></div>
                </div>
              </Link>
            ))}
            <div className="sec-head" style={{marginTop:24}}><div className="sec-accent"/><h2>Latest Updates</h2></div>
            {rest.map(a => (
              <Link key={a.id} to={`/article/${a.id}`} state={{article:a}} style={cardLink} className="list-card">
                <img src={a.img} alt=""/>
                <div>
                  <div className="list-card-cat">{a.icon} {a.cat}</div>
                  <div className="list-card-title">{a.title}</div>
                  <div className="list-card-meta">{a.time}</div>
                </div>
              </Link>
            ))}
          </main>
          <Sidebar/>
        </div>
      </div>
    </>
  );
}
