export const API_URL = "https://everybody-quotations-laboratory-laundry.trycloudflare.com";

export async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/api/posts`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch posts:", e);
    return [];
  }
}

export async function fetchPostById(id) {
  try {
    const res = await fetch(`${API_URL}/api/posts/${id}`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch post:", e);
    return null;
  }
}

export async function fetchBreaking() {
  try {
    const res = await fetch(`${API_URL}/api/posts/breaking`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch breaking:", e);
    return [];
  }
}

const CAT_META = {
  "Breaking":   { icon: "🚨", color: "#CE1126", imgs: ["https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80","https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&q=80","https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80","https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80"] },
  "News":       { icon: "📰", color: "#1877F2", imgs: ["https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80","https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80","https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80"] },
  "Weather":    { icon: "🌤️", color: "#1877F2", imgs: ["https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=600&q=80","https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&q=80","https://images.unsplash.com/photo-1504608524841-42584120d693?w=600&q=80"] },
  "Traffic":    { icon: "🚗", color: "#FF6B35", imgs: ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80","https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80","https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=600&q=80"] },
  "Sports":     { icon: "⚽", color: "#2d9e6b", imgs: ["https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80","https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80","https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80","https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80"] },
  "Lifestyle":  { icon: "❤️", color: "#FF6B35", imgs: ["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80","https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80","https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80","https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80","https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80","https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"] },
  "World News": { icon: "🌍", color: "#7B2FBE", imgs: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80","https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=600&q=80","https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80","https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=600&q=80"] },
  "Culture":    { icon: "🎭", color: "#E8B922", imgs: ["https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80","https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80","https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80"] },
  "Health":     { icon: "🏥", color: "#2d9e6b", imgs: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80","https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80","https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"] },
};

export function mapPost(p, index = 0) {
  const cat = CAT_META[p.category] || CAT_META["News"];
  return {
    id: p.id,
    cat: p.category || "News",
    icon: cat.icon,
    color: cat.color,
    title: p.rawTitle,
    excerpt: p.generatedPost ? p.generatedPost.slice(0, 200).replace(/[\s.…]+$/, '') + '...' : '',
    fullText: p.generatedPost || '',
    time: timeAgo(p.timestamp),
    source: p.source,
    img: p.imageUrl || cat.imgs[index % cat.imgs.length],
    breaking: p.isBreaking,
  };
}

function timeAgo(timestamp) {
  if (!timestamp) return "Just now";
  const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  const mins = Math.floor(diff / 60);
  if (diff < 3600) return `${mins} ${mins === 1 ? 'min' : 'mins'} ago`;
  const hrs = Math.floor(diff / 3600);
  if (diff < 86400) return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'} ago`;
  const days = Math.floor(diff / 86400);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
}

export const ARTICLES = [
  { id:1, cat:"Breaking", icon:"🚨", color:"#CE1126", title:"Fatal accident on Mosta bypass — one dead, traffic halted", excerpt:"A two-vehicle collision on the Mosta bypass this morning has resulted in one fatality and serious injuries to two others.", time:"2 min ago", source:"Times of Malta", img:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", breaking:true },
  { id:2, cat:"News", icon:"📰", color:"#1877F2", title:"Record 3.2 million tourists expected in Malta this summer", excerpt:"Tourism authorities project a record-breaking summer season driven by increased direct flights from Germany, France and the UK.", time:"1 hr ago", source:"Malta Independent", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { id:3, cat:"Sports", icon:"⚽", color:"#2d9e6b", title:"Hibernians win BOV Premier League title with stunning 3-1 win", excerpt:"Hibernians FC clinched the BOV Premier League title last night with a commanding victory over Valletta FC.", time:"1 hr ago", source:"Malta Sports", img:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80" },
  { id:4, cat:"Lifestyle", icon:"❤️", color:"#FF6B35", title:"New rooftop bar opens in Valletta with 360° Grand Harbour views", excerpt:"Bastion Sky has opened on Republic Street offering panoramic views of the Grand Harbour and Marsamxett.", time:"2 hrs ago", source:"Lovin Malta", img:"https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&q=80" },
  { id:5, cat:"News", icon:"📰", color:"#1877F2", title:"Government announces €50M fund for first-time property buyers", excerpt:"Finance Minister unveils new scheme including interest subsidies and down payment grants for first-time buyers.", time:"3 hrs ago", source:"Malta Daily", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" },
  { id:6, cat:"World News", icon:"🌍", color:"#7B2FBE", title:"Major earthquake strikes Turkey — 6.8 magnitude, casualties reported", excerpt:"A powerful earthquake has struck central Turkey. Rescue teams are being deployed.", time:"30 min ago", source:"Reuters", img:"https://images.unsplash.com/photo-1590845947376-2638caa89309?w=600&q=80", breaking:true },
  { id:7, cat:"Culture", icon:"🎭", color:"#E8B922", title:"Valletta International Arts Festival kicks off this weekend", excerpt:"Over 60 events spanning theatre, music and visual arts across the historic bastions of Valletta.", time:"3 hrs ago", source:"MaltaToday", img:"https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80" },
  { id:8, cat:"Health", icon:"🏥", color:"#2d9e6b", title:"New state-of-the-art healthcare centre opening in Gozo", excerpt:"Health Minister confirms a new facility for Gozo will open before year-end.", time:"5 hrs ago", source:"Times of Malta", img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
];

export const SHOWS = [
  { id:1, name:"MFCC Summer Festival", venue:"MFCC, Ta' Qali", date:"Fri 4 Apr", time:"21:00", img:"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80", price:"€25" },
  { id:2, name:"Jazz Night at Valletta Waterfront", venue:"Valletta Waterfront", date:"Sat 5 Apr", time:"20:00", img:"https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80", price:"Free" },
  { id:3, name:"Malta Philharmonic Orchestra", venue:"Mediterranean Conference Centre", date:"Sun 6 Apr", time:"19:30", img:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80", price:"€15" },
  { id:4, name:"Ibiza Night at Cafe Del Mar", venue:"Cafe Del Mar, St Paul's Bay", date:"Fri 11 Apr", time:"22:00", img:"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80", price:"€10" },
  { id:5, name:"Mdina Silent City Tour", venue:"Mdina", date:"Sat 12 Apr", time:"18:00", img:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80", price:"€8" },
  { id:6, name:"Sunday Market at Ta' Qali", venue:"Ta' Qali National Park", date:"Sun 13 Apr", time:"09:00", img:"https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80", price:"Free" },
];

export const HAPPENING = [
  { id:1, title:"Carnival in Valletta", desc:"Malta's famous carnival returns with colourful floats, costumes and street performances across Valletta.", img:"https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80", cat:"Events" },
  { id:2, title:"Fishing Village Festival Marsaxlokk", desc:"The annual fishing village festival with fresh seafood, local crafts and live music at the famous Sunday market.", img:"https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&q=80", cat:"Culture" },
  { id:3, title:"Mnajdra Temples Equinox", desc:"Experience the magical equinox sunrise at Malta's prehistoric Mnajdra Temples — a UNESCO World Heritage Site.", img:"https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&q=80", cat:"Heritage" },
  { id:4, title:"Grand Master's Palace Tour", desc:"Special guided tours of the Grand Master's Palace in Valletta with access to usually closed rooms.", img:"https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=400&q=80", cat:"Tourism" },
];

export const TRAFFIC_ROUTES = [
  { name:"Regional Road (Birkirkara–Attard)", status:"clear", delay:0 },
  { name:"Mosta Bypass", status:"heavy", delay:25 },
  { name:"Coast Road (Sliema–Bugibba)", status:"slow", delay:12 },
  { name:"Msida–Valletta Arterial", status:"clear", delay:0 },
  { name:"Airport Link Road (Luqa)", status:"clear", delay:2 },
  { name:"Gozo Ferry Approach", status:"slow", delay:8 },
];

export const NAV_LINKS = [
  { path:"/", label:"Home", icon:"🏠" },
  { path:"/breaking", label:"Breaking News", icon:"🚨" },
  { path:"/local-news", label:"Local News", icon:"📰" },
  { path:"/world-news", label:"World News", icon:"🌍" },
  { path:"/weather", label:"Weather", icon:"🌤️" },
  { path:"/traffic", label:"Traffic", icon:"🚗" },
  { path:"/sports", label:"Sports", icon:"⚽" },
  { path:"/lifestyle", label:"Lifestyle & Food", icon:"❤️" },
  { path:"/shows", label:"Shows & Events", icon:"🎭" },
  { path:"/blog", label:"Blog", icon:"📝" },
  { path:"/happening", label:"What's Happening", icon:"✨" },
  { path:"/videos", label:"Videos", icon:"🎥" },
  { path:"/about", label:"About Us", icon:"ℹ️" },
  { path:"/contact", label:"Contact", icon:"📬" },
  { path:"/advertise", label:"Advertise With Us", icon:"📣" },
];