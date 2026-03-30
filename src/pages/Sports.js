import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const cardLink = { textDecoration:'none', color:'inherit' };

const SPORTS = [
  { id:1, cat:"Football", title:"Hibernians win BOV Premier League title with stunning 3-1 victory", excerpt:"Hibernians clinched the BOV Premier League title with a commanding win over Valletta FC at the National Stadium. Striker Miguel Dos Santos scored a hat-trick.", time:"1 hr ago", source:"Malta Sports", img:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80" },
  { id:2, cat:"Football", title:"Malta national team draws 1-1 with Estonia in friendly", excerpt:"The Maltese national side showed fighting spirit with a late equaliser from Brandon Paiber in their friendly match against Estonia.", time:"2 hrs ago", source:"BOV Premier League", img:"https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80" },
  { id:3, cat:"Athletics", title:"Maltese swimmer breaks national record at European Championships", excerpt:"Rebecca Camilleri shattered the Maltese national record in the 100m butterfly at the European Swimming Championships in Rome.", time:"5 hrs ago", source:"Malta Sports", img:"https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80" },
  { id:4, cat:"Motorsport", title:"Malta Motorsport Federation announces new rally circuit near Rabat", excerpt:"A brand new gravel rally circuit has been approved near Rabat, set to host the first Malta Rally Championship round next autumn.", time:"1 day ago", source:"Times of Malta", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
];

const FIXTURES = [
  { home:"Hibernians", away:"Valletta", date:"Sat 5 Apr", time:"20:00", comp:"BOV Premier League" },
  { home:"Floriana", away:"Balzan", date:"Sun 6 Apr", time:"17:30", comp:"BOV Premier League" },
  { home:"Malta", away:"Cyprus", date:"Wed 9 Apr", time:"20:45", comp:"UEFA Nations League" },
];

export default function Sports() {
  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#1a3a1a,#0d4a2a)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#2d9e6b'}}/>
          <h1 style={{color:'#fff'}}>⚽ Sports</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Malta sports news — football, athletics, motorsport and more</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="two-col">
          <main>
            <div className="sec-head"><div className="sec-accent" style={{background:'#2d9e6b'}}/><h2>Latest Sports News</h2></div>
            <div className="two-col-equal" style={{marginBottom:28}}>
              {SPORTS.map(a => (
                <Link key={a.id} to={`/article/${a.id}`} state={{article:a}} style={cardLink} className="art-card">
                  <img src={a.img} alt="" className="art-card-img"/>
                  <div className="art-card-body">
                    <div className="art-card-cat" style={{color:'#2d9e6b'}}>⚽ {a.cat}</div>
                    <div className="art-card-title">{a.title}</div>
                    <div className="art-card-excerpt">{a.excerpt}</div>
                    <div className="art-card-meta"><span>{a.time}</span></div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="sec-head"><div className="sec-accent" style={{background:'#2d9e6b'}}/><h2>Upcoming Fixtures</h2></div>
            <div style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',overflow:'hidden',marginBottom:28}}>
              {FIXTURES.map((f,i) => (
                <div key={i} style={{padding:'14px 18px',borderBottom:i<FIXTURES.length-1?'1px solid #E5E0D8':'none',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                  <div style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:15,flex:1,textAlign:'right'}}>{f.home}</div>
                  <div style={{background:'#2d9e6b',color:'#fff',fontWeight:800,fontSize:11,padding:'4px 10px',borderRadius:6,whiteSpace:'nowrap'}}>VS</div>
                  <div style={{fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:15,flex:1}}>{f.away}</div>
                  <div style={{textAlign:'right',minWidth:120}}>
                    <div style={{fontSize:12,fontWeight:600}}>{f.date} · {f.time}</div>
                    <div style={{fontSize:11,color:'#aaa'}}>{f.comp}</div>
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
