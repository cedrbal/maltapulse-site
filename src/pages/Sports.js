import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, mapPost } from '../data';
import Sidebar from '../components/Sidebar';

const cardLink = { textDecoration:'none', color:'inherit' };

const FIXTURES = [
  { home:"Hibernians", away:"Valletta",  date:"Sat 5 Apr",  time:"20:00", comp:"BOV Premier League" },
  { home:"Floriana",   away:"Balzan",    date:"Sun 6 Apr",  time:"17:30", comp:"BOV Premier League" },
  { home:"Malta",      away:"Cyprus",    date:"Wed 9 Apr",  time:"20:45", comp:"UEFA Nations League" },
];

export default function Sports() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(posts => {
      const sports = posts.filter(p => p.category === 'Sports');
      setArticles(sports.map((p, i) => mapPost(p, i)));
      setLoading(false);
    });
  }, []);

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
            {loading ? (
              <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Loading…</div>
            ) : articles.length === 0 ? (
              <div style={{textAlign:'center',padding:40,color:'#aaa'}}>No sports articles yet.</div>
            ) : (
              <div className="two-col-equal" style={{marginBottom:28}}>
                {articles.map(a => (
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
            )}
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
