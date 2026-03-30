import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, mapPost } from '../data';
import Sidebar from '../components/Sidebar';

const cardLink = { textDecoration:'none', color:'inherit' };

export default function WorldNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(posts => {
      const world = posts.filter(p => p.category === 'World News');
      setArticles(world.map((p, i) => mapPost(p, i)));
      setLoading(false);
    });
  }, []);

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
            {loading ? (
              <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Loading…</div>
            ) : articles.length === 0 ? (
              <div style={{textAlign:'center',padding:40,color:'#aaa'}}>No world news articles yet.</div>
            ) : (
              <div className="two-col-equal">
                {articles.map(a => (
                  <Link key={a.id} to={`/article/${a.id}`} state={{article:a}} style={cardLink} className={`art-card ${a.breaking?'breaking':''}`}>
                    <img src={a.img} alt="" className="art-card-img" onError={e => { e.target.onerror = null; e.target.src = a.fallbackImg; }}/>
                    <div className="art-card-body">
                      <div className="art-card-cat" style={{color:'#7B2FBE'}}>{a.icon} {a.cat}</div>
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
