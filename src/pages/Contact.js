import React, { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-accent"/>
          <h1>📬 Contact Us</h1>
          <p>Got a news tip, question or just want to say hello?</p>
        </div>
      </div>
      <div className="page-wrap" style={{maxWidth:900}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          <div className="info-card">
            <h2>Send us a Message</h2>
            {sent ? (
              <div style={{background:'#e8f5e9',border:'1px solid #a5d6a7',borderRadius:10,padding:18,textAlign:'center',marginTop:16}}>
                <div style={{fontSize:32,marginBottom:8}}>✅</div>
                <div style={{fontWeight:600}}>Message sent! We'll get back to you soon.</div>
              </div>
            ) : (
              <>
                <div className="form-group" style={{marginTop:16}}>
                  <label>Your Name</label>
                  <input type="text" placeholder="John Borg"/>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com"/>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select><option>News Tip</option><option>General Enquiry</option><option>Advertising</option><option>Partnership</option><option>Other</option></select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell us what's on your mind..."/>
                </div>
                <button className="btn-submit" onClick={()=>setSent(true)}>Send Message →</button>
              </>
            )}
          </div>
          <div>
            <div className="info-card" style={{marginBottom:18}}>
              <h2>📧 Email</h2>
              <p>hello@maltapulse.net</p>
            </div>
            <div className="info-card" style={{marginBottom:18}}>
              <h2>📱 Facebook</h2>
              <p><a href="https://facebook.com/MaltaPulse" target="_blank" rel="noreferrer" style={{color:'#1877F2'}}>facebook.com/MaltaPulse</a></p>
            </div>
            <div className="info-card">
              <h2>💡 News Tips</h2>
              <p>See something newsworthy? Send us a tip and we'll investigate.</p>
              <p style={{marginTop:8,fontWeight:600,color:'#CE1126'}}>tips@maltapulse.net</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
