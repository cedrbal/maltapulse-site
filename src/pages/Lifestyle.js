import React from 'react';
import Sidebar from '../components/Sidebar';

const LIFE = [
  { id:1, cat:"Food & Drink", title:"10 best new restaurants to try in Malta this spring", excerpt:"From a hidden gem in Marsaxlokk to a rooftop spot in Valletta, Malta's dining scene is absolutely on fire right now.", time:"3 hrs ago", source:"Lovin Malta", img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
  { id:2, cat:"Lifestyle", title:"New rooftop bar opens in Valletta with 360° Grand Harbour views", excerpt:"Bastion Sky has opened on Republic Street offering panoramic views of the Grand Harbour, Marsamxett and Floriana.", time:"2 hrs ago", source:"Lovin Malta", img:"https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&q=80" },
  { id:3, cat:"Fashion", title:"Maltese designer wins prestigious European fashion award", excerpt:"Valletta-born designer Sara Grech has won the Rising Star award at the European Fashion Awards in Milan.", time:"1 day ago", source:"Malta Daily", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { id:4, cat:"Health", title:"New gym opens in Sliema with state-of-the-art facilities", excerpt:"FitNation Sliema has opened its doors with 2,000 sq metres of gym space, a pool and wellness spa.", time:"2 days ago", source:"Malta Independent", img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
];

export default function Lifestyle() {
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
            <div className="two-col-equal">
              {LIFE.map(a => (
                <div key={a.id} className="art-card">
                  <img src={a.img} alt="" className="art-card-img"/>
                  <div className="art-card-body">
                    <div className="art-card-cat" style={{color:'#FF6B35'}}>❤️ {a.cat}</div>
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
