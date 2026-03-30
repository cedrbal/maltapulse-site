import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, mapPost } from '../data';
import Sidebar from '../components/Sidebar';

const cardLink = { textDecoration:'none', color:'inherit' };

export default function Lifestyle() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(posts => {
      const life = posts.filter(p => p.category === 'Lifestyle');
      setArticles(life.map((p, i) => mapPost(p, i)));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#8B1A6B,#c0392b)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#E8B922'}}/>
          <h1 style={{color:'#fff'}}>❤️ Lifestyle & Food</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Food, fashion, health and the best of Maltese living</p>
        </div>
      </div>
      <div className="page-wrap">
        <div className="two-col">
          <main>
            <div className="sec-head"><div className="sec-accent" style={{background:'#FF6B35'}}/><h2>Lifestyle</h2></div>
            {loading ? (
              <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Loading…</div>
            ) : articles.length === 0 ? (
              <div style={{textAlign:'center',padding:40,color:'#aaa'}}>No lifestyle articles yet.</div>
            ) : (
              <div className="two-col-equal">
                {articles.map(a => (
                  <Link key={a.id} to={`/article/${a.id}`} state={{article:a}} style={cardLink} className="art-card">
                    <img src={a.img} alt="" className="art-card-img"/>
                    <div className="art-card-body">
                      <div className="art-card-cat" style={{color:'#FF6B35'}}>❤️ {a.cat}</div>
                      <div className="art-card-title">{a.title}</div>
                      <div className="art-card-excerpt">{a.excerpt}</div>
                      <div className="art-card-meta"><span>{a.time}</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
          <Sidebar/>
        </div>
      </div>
    </>
  );
}
