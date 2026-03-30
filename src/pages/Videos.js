import React from 'react';
import { ARTICLES } from '../data';

export default function Videos() {
  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a1a6b,#0d0d3a)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#1877F2'}}/>
          <h1 style={{color:'#fff'}}>🎥 Videos</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Watch the latest videos from Malta Pulse — news, events, lifestyle and more</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="sec-head"><div className="sec-accent" style={{background:'#1877F2'}}/><h2>Latest Videos</h2></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {[...ARTICLES,...ARTICLES].slice(0,9).map((a,i) => (
            <div key={i} className="video-card" style={{borderRadius:12}}>
              <img src={a.img} alt="" className="video-thumb" style={{height:165}} onError={e => { e.target.onerror = null; e.target.src = a.fallbackImg; }}/>
              <div className="play-btn" style={{width:44,height:44,fontSize:16}}>▶</div>
              <div className="video-title" style={{fontSize:14,padding:'10px 12px 12px'}}>{a.title}</div>
              <div style={{padding:'0 12px 12px',fontSize:11,color:'rgba(255,255,255,0.4)'}}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
