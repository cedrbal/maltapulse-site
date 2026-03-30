import React, { useState, useEffect } from 'react';
import { API_URL } from '../data';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// Malta Public Holidays 2026
const HOLIDAYS = [
  { date:'2026-01-01', name:"New Year's Day", emoji:'🎆', type:'holiday', desc:"The new year begins with celebrations, fireworks, and family gatherings across Malta." },
  { date:'2026-02-10', name:"Feast of St Paul's Shipwreck", emoji:'⛵', type:'holiday', desc:"Malta commemorates St Paul's shipwreck on the island in 60 AD, with a grand procession through Valletta's baroque streets carrying the relic of the saint's wristbone." },
  { date:'2026-03-19', name:"Feast of St Joseph", emoji:'🌸', type:'holiday', desc:"The feast of St Joseph, patron of workers and families, is marked with religious services and traditional celebrations across the island." },
  { date:'2026-03-31', name:"Freedom Day", emoji:'🇲🇹', type:'holiday', desc:"Malta marks the 1979 departure of foreign military forces. Ceremonies are held at the Freedom Monument in Birgu (Vittoriosa), with the President presiding." },
  { date:'2026-04-03', name:"Good Friday", emoji:'✝️', type:'holiday', desc:"One of Malta's most solemn days. Elaborate passion processions with life-size statues depicting the Stations of the Cross are held in towns across the island, drawing thousands of spectators." },
  { date:'2026-05-01', name:"Workers' Day", emoji:'✊', type:'holiday', desc:"International Workers' Day is celebrated with marches and events organised by Malta's trade unions and political parties." },
  { date:'2026-06-07', name:"Sette Giugno", emoji:'🎗️', type:'holiday', desc:"Malta remembers the 1919 uprising when four Maltese were killed by British troops during bread riots — a defining moment in the push for self-governance and independence." },
  { date:'2026-06-29', name:"L-Imnarja (Feast of SS Peter & Paul)", emoji:'🌿', type:'holiday', desc:"One of Malta's oldest and most beloved feasts. The traditional folk festival at Buskett Gardens features rabbit stew, folk music, and horse and donkey races in Rabat on the morning of 29 June." },
  { date:'2026-08-15', name:"Feast of the Assumption", emoji:'🌹', type:'holiday', desc:"Our Lady's Assumption is celebrated with spectacular feasts in six villages simultaneously: Mosta, Gudja, Ghaxaq, Mqabba, Qrendi, and Attard — all erupting with fireworks and band marches." },
  { date:'2026-09-08', name:"Victory Day", emoji:'🏆', type:'holiday', desc:"Malta commemorates the end of the Great Siege of 1565 and the 1942 WWII siege. A traditional regatta is held in Grand Harbour, Valletta, with colourful boat races between the Three Cities." },
  { date:'2026-09-21', name:"Independence Day", emoji:'🇲🇹', type:'holiday', desc:"Malta celebrates its independence from Britain, granted on 21 September 1964. Military parades, concerts, and national ceremonies are held across the country." },
  { date:'2026-12-08', name:"Feast of the Immaculate Conception", emoji:'🕊️', type:'holiday', desc:"A public holiday honouring the Virgin Mary, marked with religious ceremonies and a special mass at St John's Co-Cathedral in Valletta." },
  { date:'2026-12-13', name:"Republic Day", emoji:'🏛️', type:'holiday', desc:"Malta celebrates becoming a republic on 13 December 1974. Official ceremonies are held at the Palace in Valletta's Republic Square." },
  { date:'2026-12-25', name:"Christmas Day", emoji:'🎄', type:'holiday', desc:"Christmas in Malta is deeply religious and festive — Midnight Mass, elaborate nativity cribs (presepji) in every town, and family gatherings with traditional pastizzi and imbuljuta (chestnut drink)." },
];

// Malta Village Festas 2026 (major ones)
const FESTAS = [
  { date:'2026-01-10', village:'Valletta', name:"St Paul's Shipwreck Festa", emoji:'⛵', type:'festa', desc:"The titular parish feast of Valletta, celebrated with a grand procession carrying the statue of St Paul through the capital's baroque streets. One of the most photographed processions in Malta." },
  { date:'2026-02-07', village:'Qormi', name:"St Sebastian Festa", emoji:'🎯', type:'festa', desc:"Qormi, Malta's bread-baking village, celebrates its patron saint with fireworks, band marches, and a colourful street procession." },
  { date:'2026-04-19', village:'Żejtun', name:"St Catherine Feast", emoji:'⭐', type:'festa', desc:"Żejtun's traditional St Catherine feast with outdoor celebrations, decorations, and a solemn procession through the old town's narrow streets." },
  { date:'2026-05-03', village:'Siġġiewi', name:"St Nicholas Feast", emoji:'🎁', type:'festa', desc:"The village of Siġġiewi honours St Nicholas with fireworks, band marches, and street festivities in one of Malta's most charming rural settings." },
  { date:'2026-05-10', village:'Ħamrun', name:"St Cajetan Feast", emoji:'✝️', type:'festa', desc:"Ħamrun's feast of St Cajetan — one of the most colourful celebrations in the Greater Valletta area, with rival band clubs and spectacular street decorations." },
  { date:'2026-05-17', village:'Gharghur', name:"St Bartholomew Feast", emoji:'🌾', type:'festa', desc:"The quiet hilltop village of Gharghur comes alive with its annual St Bartholomew feast, offering panoramic views of the fireworks over the northern valleys." },
  { date:'2026-05-24', village:'Mellieħa', name:"Our Lady of Victories Feast", emoji:'🕊️', type:'festa', desc:"Mellieħa celebrates its patroness at one of Malta's most picturesque festa locations, perched high above Mellieħa Bay. The statue is said to be painted by St Luke himself." },
  { date:'2026-06-14', village:'Naxxar', name:"Our Lady of Victories Feast", emoji:'🏆', type:'festa', desc:"Naxxar's Our Lady of Victories feast draws pilgrims from across the island to the stunning baroque parish church on the hilltop." },
  { date:'2026-06-21', village:"St Julian's", name:"St Julian Feast", emoji:'🎣', type:'festa', desc:"St Julian's celebrates its patron with a seaside procession along the promenade and a spectacular waterfront fireworks display over Balluta Bay." },
  { date:'2026-07-05', village:'Qrendi', name:"St Catherine Feast", emoji:'⭐', type:'festa', desc:"The small village of Qrendi holds one of Malta's most intimate and charming village feasts, near the famous Ħaġar Qim temples." },
  { date:'2026-07-12', village:'Birgu (Vittoriosa)', name:"St Lawrence Feast", emoji:'🔥', type:'festa', desc:"The historic walled city of Birgu celebrates St Lawrence with one of the most atmospheric feasts in Malta — fireworks light up Grand Harbour as boats sail below." },
  { date:'2026-08-02', village:"St Paul's Bay", name:"St Paul's Feast", emoji:'⛵', type:'festa', desc:"A spectacular seaside feast with fireworks reflecting over St Paul's Bay and a procession of the saint's statue — the site where St Paul himself is said to have been shipwrecked." },
  { date:'2026-08-09', village:'Sliema', name:"Our Lady of Mount Carmel Feast", emoji:'🏔️', type:'festa', desc:"Sliema's Carmelite feast is one of the busiest on the island, drawing enormous crowds to the seafront for the procession and fireworks over Marsamxett Harbour." },
  { date:'2026-08-14', village:'Mosta', name:"Assumption Eve Celebrations", emoji:'🌹', type:'festa', desc:"The eve of Mosta's grand Assumption feast — the famous Rotunda dome is illuminated and fireworks burst from the rooftops of this iconic church." },
  { date:'2026-08-16', village:'Gudja', name:"Assumption Feast", emoji:'🌹', type:'festa', desc:"Gudja celebrates Our Lady's Assumption with traditional fireworks, street decorations, and a solemn procession around the village square." },
  { date:'2026-08-23', village:'Żurrieq', name:"St Catherine Feast", emoji:'⭐', type:'festa', desc:"Żurrieq's annual feast of St Catherine with village decorations, live band music, and fireworks over the south of Malta." },
  { date:'2026-09-06', village:'Xagħra (Gozo)', name:"Our Lady of Victories Feast", emoji:'🏆', type:'festa', desc:"Xagħra in Gozo celebrates near the famous Ggantija Temples — a procession through the village square with Gozitan fireworks and traditional music." },
  { date:'2026-09-13', village:'Naxxar', name:"Birth of Our Lady Feast", emoji:'🌸', type:'festa', desc:"Naxxar uniquely celebrates two feasts a year — this second one marks the Nativity of Our Lady with the village again decorated and illuminated." },
  { date:'2026-10-11', village:'Żabbar', name:"Our Lady of Graces Feast", emoji:'🌹', type:'festa', desc:"Żabbar's beloved feast of Our Lady of Graces at the magnificent sanctuary, celebrated with a grand procession and one of Malta's finest fireworks displays." },
  { date:'2026-11-01', village:'All Malta', name:"All Saints Day (Jum il-Qaddisin)", emoji:'🕯️', type:'festa', desc:"Maltese families visit cemeteries to light candles in memory of loved ones. Traditional sweets — qagħaq tal-għasel (honey ring pastries) — are sold at every bakery." },
  { date:'2026-11-15', village:'Birkirkara', name:"St Helen Feast", emoji:'✝️', type:'festa', desc:"Malta's most populous town celebrates St Helen — mother of Emperor Constantine — with one of the island's grandest festa traditions and elaborate street decorations." },
  { date:'2026-12-06', village:'Siġġiewi', name:"St Nicholas Winter Feast", emoji:'🎅', type:'festa', desc:"A warm winter celebration of St Nicholas in Siġġiewi, with festive lighting, family activities, and the spirit of the Christmas season." },
  { date:'2026-12-08', village:'Valletta', name:"Immaculate Conception Procession", emoji:'🕊️', type:'festa', desc:"A solemn procession through Valletta's streets marking the Feast of the Immaculate Conception — the baroque capital at its most atmospheric in winter light." },
];

const TYPE_COLORS = {
  holiday: '#CE1126',
  festa:   '#E8B922',
  event:   '#1a6fb5',
  paid:    '#2d9e6b',
};

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseShowDate(dateStr) {
  if (!dateStr || dateStr === 'Coming soon') return null;
  try {
    const cleaned = dateStr.replace(/^[A-Za-z]+\s+/, '').trim();
    const yr = new Date().getFullYear();
    const d = new Date(`${cleaned} ${yr}`);
    if (!isNaN(d.getTime())) return d;
  } catch {}
  return null;
}

function EventCalendar({ allEvents }) {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(toDateStr(today));

  const prevMonth = () => { if (month === 0) { setYear(y=>y-1); setMonth(11); } else setMonth(m=>m-1); };
  const nextMonth = () => { if (month === 11) { setYear(y=>y+1); setMonth(0); } else setMonth(m=>m+1); };

  // Build event map
  const eventMap = {};
  allEvents.forEach(ev => {
    if (!eventMap[ev.date]) eventMap[ev.date] = [];
    eventMap[ev.date].push(ev);
  });

  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const rawFirstDay  = new Date(year, month, 1).getDay(); // 0=Sun
  const firstDayMon  = rawFirstDay === 0 ? 6 : rawFirstDay - 1; // Mon=0

  const cells = [];
  for (let i = 0; i < firstDayMon; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const todayStr = toDateStr(today);
  const selectedEvents = eventMap[selected] || [];
  const selObj = new Date(selected + 'T00:00:00');
  const selLabel = selObj.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  return (
    <div>
      {/* Month Nav */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <button onClick={prevMonth} style={{background:'none',border:'1px solid #E5E0D8',borderRadius:8,padding:'6px 16px',cursor:'pointer',fontSize:18,lineHeight:1}}>‹</button>
        <h3 style={{margin:0,fontSize:20,fontWeight:700}}>{MONTH_NAMES[month]} {year}</h3>
        <button onClick={nextMonth} style={{background:'none',border:'1px solid #E5E0D8',borderRadius:8,padding:'6px 16px',cursor:'pointer',fontSize:18,lineHeight:1}}>›</button>
      </div>

      {/* Day Labels */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,marginBottom:4}}>
        {DAY_NAMES.map(d => (
          <div key={d} style={{textAlign:'center',fontSize:11,fontWeight:700,color:'#888',padding:'4px 0',textTransform:'uppercase',letterSpacing:1}}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2}}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const dayEvs = eventMap[ds] || [];
          const isToday = ds === todayStr;
          const isSel   = ds === selected;

          return (
            <div key={ds} onClick={() => setSelected(ds)} style={{
              minHeight:58,borderRadius:8,padding:'6px 4px 4px',cursor:'pointer',
              background: isSel ? '#CE1126' : isToday ? '#FFF0F0' : '#fff',
              border: isSel ? '2px solid #CE1126' : isToday ? '2px solid rgba(206,17,38,0.4)' : '1px solid #E5E0D8',
              transition:'background 0.12s',
            }}>
              <div style={{textAlign:'center',fontSize:13,fontWeight:isSel||isToday?700:400,color:isSel?'#fff':isToday?'#CE1126':'#333',marginBottom:3}}>{day}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:2,justifyContent:'center'}}>
                {dayEvs.slice(0,3).map((ev,j) => (
                  <div key={j} style={{width:6,height:6,borderRadius:'50%',background:isSel?'rgba(255,255,255,0.7)':TYPE_COLORS[ev.type]||'#888'}} />
                ))}
                {dayEvs.length > 3 && <div style={{fontSize:8,color:isSel?'rgba(255,255,255,0.6)':'#aaa'}}>+{dayEvs.length-3}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{display:'flex',gap:16,marginTop:12,flexWrap:'wrap'}}>
        {[['holiday','#CE1126','Public Holiday'],['festa','#E8B922','Festa'],['event','#1a6fb5','Events'],['paid','#2d9e6b','Paid Events']].map(([t,c,l]) => (
          <div key={t} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'#666'}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:c}} />{l}
          </div>
        ))}
      </div>

      {/* Selected Day Panel */}
      <div style={{marginTop:24,borderTop:'1px solid #E5E0D8',paddingTop:20}}>
        <div style={{fontWeight:700,fontSize:16,marginBottom:14,color:'#333'}}>📅 {selLabel}</div>
        {selectedEvents.length === 0 ? (
          <div style={{background:'#f9f9f7',borderRadius:12,padding:20,textAlign:'center',color:'#bbb',border:'1px dashed #E5E0D8'}}>No events on this day</div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {selectedEvents.map((ev, i) => (
              <div key={i} style={{background:'#fff',borderRadius:12,border:'1px solid #E5E0D8',borderLeft:`4px solid ${TYPE_COLORS[ev.type]||'#888'}`,padding:'14px 16px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{fontSize:28,flexShrink:0,lineHeight:1,paddingTop:2}}>{ev.emoji || '📌'}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:5,flexWrap:'wrap'}}>
                    <span style={{fontWeight:700,fontSize:15}}>{ev.name}</span>
                    {ev.village && <span style={{fontSize:11,background:'#f0f0f0',borderRadius:6,padding:'2px 8px',color:'#666',flexShrink:0}}>📍 {ev.village}</span>}
                    {ev.time && <span style={{fontSize:11,color:'#888',flexShrink:0}}>⏰ {ev.time}</span>}
                    <span style={{fontSize:10,background:TYPE_COLORS[ev.type]||'#888',color:'#fff',borderRadius:6,padding:'2px 8px',textTransform:'uppercase',letterSpacing:0.5,flexShrink:0}}>{ev.type}</span>
                  </div>
                  {ev.desc && <div style={{fontSize:13,color:'#555',lineHeight:1.6}}>{ev.desc}</div>}
                  <div style={{display:'flex',gap:12,marginTop:ev.desc?8:0,alignItems:'center',flexWrap:'wrap'}}>
                    {ev.price && ev.price !== 'See details' && ev.price !== 'Free' && (
                      <span style={{fontWeight:700,color:'#2d9e6b',fontSize:13}}>🎟️ {ev.price}</span>
                    )}
                    {ev.url && ev.type !== 'holiday' && ev.type !== 'festa' && (
                      <a href={ev.url} target="_blank" rel="noreferrer" style={{fontSize:12,color:'#1a6fb5',textDecoration:'none'}}>Read more →</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Shows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      fetch(`${API_URL}/api/shows`)
        .then(r => r.ok ? r.json() : [])
        .then(d => { setShows(Array.isArray(d) ? d : []); setLoading(false); })
        .catch(() => setLoading(false));
    load();
    const iv = setInterval(load, 60 * 60 * 1000); // refresh every hour
    return () => clearInterval(iv);
  }, []);

  // Build all events for calendar
  const scraped = shows.map(s => {
    const d = parseShowDate(s.date);
    if (!d) return null;
    const isPaid = s.price && s.price !== 'See details' && s.price !== 'Free' && s.price !== '';
    return {
      date:    toDateStr(d),
      name:    s.name,
      emoji:   s.type === 'Culture' ? '🎭' : s.type === 'Arts' ? '🎨' : s.type === 'Tourism' ? '🏖️' : '🎉',
      type:    isPaid ? 'paid' : 'event',
      desc:    '',
      time:    s.time || '',
      venue:   s.venue,
      url:     s.url,
      price:   s.price,
      img:     s.img,
      source:  s.source,
      soldOut: s.soldOut || false,
    };
  }).filter(Boolean);

  const allEvents = [...HOLIDAYS, ...FESTAS, ...scraped].sort((a,b) => a.date.localeCompare(b.date));

  // Paid events section: scraped shows with real prices, plus any holiday/festa could be free
  const paidEvents = shows.filter(s => s.price && s.price !== 'See details' && s.price !== 'Free' && s.price.trim() !== '');

  return (
    <>
      <div className="page-hero" style={{background:'linear-gradient(135deg,#4a1a6b,#1a1a6b)'}}>
        <div className="page-hero-inner">
          <div className="page-hero-accent" style={{background:'#E8B922'}}/>
          <h1 style={{color:'#fff'}}>🎭 Events Calendar</h1>
          <p style={{color:'rgba(255,255,255,0.6)'}}>Malta's complete guide — festas, public holidays, shows, concerts and more</p>
        </div>
      </div>

      <div className="page-wrap">

        {/* CALENDAR */}
        <div style={{background:'#fff',borderRadius:18,border:'1px solid #E5E0D8',padding:24,marginBottom:32}}>
          {loading ? (
            <div style={{textAlign:'center',padding:48,color:'#aaa'}}>Loading events…</div>
          ) : (
            <EventCalendar allEvents={allEvents} />
          )}
        </div>

        {/* PAID EVENTS */}
        <div className="sec-head">
          <div className="sec-accent" style={{background:'#2d9e6b'}}/>
          <h2>🎟️ Paid Events & Tickets</h2>
        </div>

        {paidEvents.length === 0 ? (
          <div style={{background:'#f9f9f7',borderRadius:12,padding:28,textAlign:'center',color:'#bbb',border:'1px dashed #E5E0D8',marginBottom:32}}>
            <div style={{fontSize:32,marginBottom:8}}>🎟️</div>
            <div style={{fontWeight:600,color:'#aaa'}}>No paid events listed at the moment</div>
            <div style={{fontSize:13,marginTop:4}}>Check back soon — events are updated automatically</div>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginBottom:32}} className="shows-grid-inner">
            {paidEvents.map(s => (
              <div key={s.id} style={{background:'#fff',borderRadius:14,border:'1px solid #E5E0D8',overflow:'hidden',boxShadow:'0 2px 10px rgba(0,0,0,0.06)',display:'flex',flexDirection:'column'}}>
                <div style={{position:'relative'}}>
                  <img src={s.img} alt={s.name} style={{width:'100%',height:170,objectFit:'cover'}} />
                  {s.soldOut && (
                    <div style={{position:'absolute',top:10,right:10,background:'#CE1126',color:'#fff',fontWeight:700,fontSize:11,borderRadius:6,padding:'4px 10px',letterSpacing:1}}>
                      SOLD OUT
                    </div>
                  )}
                  <div style={{position:'absolute',bottom:10,left:10,background:'rgba(0,0,0,0.65)',color:'#fff',fontSize:10,borderRadius:6,padding:'3px 8px'}}>
                    {s.type}
                  </div>
                </div>
                <div style={{padding:14,flex:1,display:'flex',flexDirection:'column'}}>
                  <div style={{fontSize:11,color:'#888',marginBottom:4}}>{s.date}{s.time ? ` · ${s.time}` : ''}</div>
                  <div style={{fontWeight:700,fontSize:14,lineHeight:1.35,marginBottom:4,flex:1}}>{s.name}</div>
                  <div style={{fontSize:12,color:'#666',marginBottom:10}}>📍 {s.venue}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontWeight:700,color:'#2d9e6b',fontSize:16}}>{s.price}</span>
                    {s.soldOut ? (
                      <span style={{background:'#CE1126',color:'#fff',borderRadius:8,padding:'7px 14px',fontWeight:700,fontSize:12}}>SOLD OUT</span>
                    ) : s.url ? (
                      <a href={s.url} target="_blank" rel="noreferrer"
                         style={{background:'#2d9e6b',color:'#fff',borderRadius:8,padding:'7px 14px',fontWeight:700,fontSize:12,textDecoration:'none'}}>
                        Buy Tickets →
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NEWSLETTER */}
        <div className="newsletter">
          <h3>Never Miss an Event 🎭</h3>
          <p>Get weekly event picks and festa updates delivered to your inbox every Thursday</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email"/>
            <button>Subscribe</button>
          </div>
        </div>

      </div>
    </>
  );
}
