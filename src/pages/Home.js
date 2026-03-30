import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, mapPost, SHOWS } from '../data';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(posts => {
      setArticles(posts.map(mapPost));
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{textAlign:'center',padding:80,color:'#fff'}}>Loading Malta Pulse...</div>;

  const hero = articles[0];
  const side3 = articles.slice(1, 4);
  const grid4 = articles.slice(0, 4);
  const more4 = articles.slice(4);

  if (!hero) return <div style={{textAlign:'center',padding:80,color:'#fff'}}>No approved articles yet. Approve some posts in the dashboard!</div>;

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-main">
            <img src={hero.img} alt={hero.title} />
            <div className="hero-main-content">
              <div className="cat-badge" style={{background:'#CE1126',color:'#fff'}}>🔴 {hero.cat}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:32,color:'#fff',lineHeight:1.15,marginBottom:8}}>{hero.title}</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.5)'}}>{hero.time}</div>
            </div>
          </div>
          <div className="hero-sidebar">
            {side3.map(a => (
              <div key={a.id} className="hero-side-card">
                <img src={a.img} alt="" className="hero-side-img" />
                <div>
                  <div className="hero-side-cat">{a.icon} {a.cat}</div>
                  <div className="hero-side-title">{a.title}</div>
                  <div className="hero-side-meta">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-wrap">
        <div className="two-col">
          <main>
            {/* LATEST NEWS */}
            <div className="sec-head">
              <div className="sec-accent" style={{background:'#CE1126'}} />
              <h2>Latest News</h2>
              <Link to="/local-news" className="sec-link">See all →</Link>
            </div>
            <div className="two-col-equal" style={{marginBottom:32}}>
              {grid4.map(a => (
                <div key={a.id} className={`art-card ${a.breaking ? 'breaking' : ''}`}>
                  <img src={a.img} alt="" className="art-card-img" />
                  <div className="art-card-body">
                    <div className="art-card-cat">{a.icon} {a.cat}</div>
                    <div className="art-card-title">{a.title}</div>
                    <div className="art-card-excerpt">{a.excerpt}</div>
                    <div className="art-card-meta"><span>{a.time}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* MORE NEWS */}
            <div className="sec-head">
              <div className="sec-accent" style={{background:'#7B2FBE'}} />
              <h2>More News</h2>
              <Link to="/local-news" className="sec-link">See all →</Link>
            </div>
            <div style={{marginBottom:32}}>
              {more4.map(a => (
                <div key={a.id} className="list-card">
                  <img src={a.img} alt="" />
                  <div>
                    <div className="list-card-cat">{a.icon} {a.cat}</div>
                    <div className="list-card-title">{a.title}</div>
                    <div className="list-card-meta">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* SHOWS */}
            <div className="sec-head">
              <div className="sec-accent" style={{background:'#E8B922'}} />
              <h2>Shows & Events</h2>
              <Link to="/shows" className="sec-link">See all →</Link>
            </div>
            <div className="two-col-equal" style={{marginBottom:32}}>
              {SHOWS.slice(0,4).map(s => (
                <div key={s.id} className="show-card">
                  <img src={s.img} alt={s.name} />
                  <div className="show-card-body">
                    <div className="show-date">{s.date} · {s.time}</div>
                    <div className="show-name">{s.name}</div>
                    <div className="show-venue">📍 {s.venue}</div>
                    <span className="show-price">{s.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* NEWSLETTER */}
            <div className="newsletter">
              <h3>Stay in the Loop 🇲🇹</h3>
              <p>Malta's top stories delivered to your inbox every morning. Free, always.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button>Subscribe</button>
              </div>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}