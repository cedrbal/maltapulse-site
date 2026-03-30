import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchPostById, mapPost } from '../data';

// Strip markdown artifacts and render as clean paragraphs
function cleanArticle(text) {
  const cleaned = text
    .replace(/#{1,6}\s*/g, '')          // remove # headings
    .replace(/\*\*([^*]+)\*\*/g, '$1') // remove **bold**
    .replace(/\*([^*]+)\*/g, '$1')     // remove *italic*
    .replace(/_{2}([^_]+)_{2}/g, '$1') // remove __bold__
    .replace(/#\w+/g, '')              // remove #hashtags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove [links](url)
    .trim();

  const paragraphs = cleaned
    .split(/\n\n+/)
    .map(p => p.replace(/\n/g, ' ').trim())
    .filter(p => p.length > 0);

  return paragraphs.map((p, i) => (
    <p key={i} style={{marginBottom: i < paragraphs.length - 1 ? '1.4em' : 0}}>
      {p}
    </p>
  ));
}

export default function Article() {
  const { id } = useParams();
  const { state } = useLocation();
  const [article, setArticle] = useState(state?.article || null);
  const [loading, setLoading] = useState(!state?.article);

  useEffect(() => {
    if (!state?.article) {
      fetchPostById(id).then(post => {
        if (post) setArticle(mapPost(post));
        setLoading(false);
      });
    }
  }, [id, state]);

  if (loading) return <div style={{textAlign:'center',padding:80,color:'#fff'}}>Loading...</div>;
  if (!article) return (
    <div style={{textAlign:'center',padding:80,color:'#fff'}}>
      <p>Article not found.</p>
      <Link to="/" style={{color:'#CE1126'}}>← Back to home</Link>
    </div>
  );

  const accentColor = article.color || '#CE1126';

  return (
    <>
      <div className="page-hero" style={{minHeight:320,position:'relative',overflow:'hidden',padding:0}}>
        <img
          src={article.img}
          alt=""
          style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.35}}
        />
        <div style={{position:'relative',zIndex:1,maxWidth:860,margin:'0 auto',padding:'48px 24px 40px'}}>
          <div className="cat-badge" style={{background:accentColor,color:'#fff',marginBottom:16}}>
            {article.icon} {article.cat}
          </div>
          <h1 style={{fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:'clamp(24px,4vw,38px)',color:'#fff',lineHeight:1.2,marginBottom:16}}>
            {article.title}
          </h1>
          <div style={{fontSize:13,color:'rgba(255,255,255,0.55)'}}>{article.time}</div>
        </div>
      </div>

      <div className="page-wrap" style={{maxWidth:860}}>
        <Link to="/" style={{display:'inline-flex',alignItems:'center',gap:6,color:'#666',fontSize:13,marginBottom:28}}>
          ← Back to home
        </Link>
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #E5E0D8',padding:'32px 36px',lineHeight:1.8,fontSize:16,color:'#1a1a1a'}}>
          {cleanArticle(article.fullText || article.excerpt || 'No content available.')}
        </div>
      </div>
    </>
  );
}
