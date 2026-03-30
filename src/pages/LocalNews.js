import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, mapPost } from '../data';
import Sidebar from '../components/Sidebar';

const cardLink = { textDecoration:'none', color:'inherit' };

export default function LocalNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(posts => {
      const local = posts.filter(p => p.category !== 'World News');
      setArticles(local.map((p, i) => mapPost(p, i)));
      setLoading(false);
    });
  }, []);

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
            {loading ? (
              <div style={{textAlign:'center',padding:60,color:'#aaa'}}>Loading…</div>
            ) : articles.length === 0 ? (
              <div style={{textAlign:'center',padding:40,color:'#aaa'}}>No articles yet.</div>
            ) : (
              <div className="two-col-equal" style={{marginBottom:24}}>
                {articles.map(a => (
                  <Link key={a.id} to={`/article/${a.id}`} state={{article:a}} style={cardLink} className={`art-card ${a.breaking?'breaking':''}`}>
                    <img src={a.img} alt="" className="art-card-img"/>
                    <div className="art-card-body">
                      <div className="art-card-cat">{a.icon} {a.cat}</div>
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
