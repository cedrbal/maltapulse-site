import React from 'react';
import { ARTICLES } from '../data';
import Sidebar from '../components/Sidebar';

export default function LocalNews() {
  const local = ARTICLES.filter(a => !['World News'].includes(a.cat));
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-accent"/>
          <h1>📰 Local News</h1>
          <p>Everything happening across Malta and Gozo — politics, business, community and more</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="two-col">
          <main>
            <div className="sec-head"><div className="sec-accent"/><h2>Malta News</h2></div>
            <div className="two-col-equal" style={{marginBottom:24}}>
              {local.map(a => (
                <div key={a.id} className={`art-card ${a.breaking?'breaking':''}`}>
                  <img src={a.img} alt="" className="art-card-img"/>
                  <div className="art-card-body">
                    <div className="art-card-cat">{a.icon} {a.cat}</div>
                    <div className="art-card-title">{a.title}</div>
                    <div className="art-card-excerpt">{a.excerpt}</div>
                    <div className="art-card-meta"><span>{a.time}</span></div>
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
