const API_URL = "http://77.42.91.193:5000";

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

export function mapPost(p) {
  const catMap = {
    "Breaking": { icon: "🚨", color: "#CE1126" },
    "News": { icon: "📰", color: "#1877F2" },
    "Weather": { icon: "🌤️", color: "#1877F2" },
    "Traffic": { icon: "🚗", color: "#FF6B35" },
    "Sports": { icon: "⚽", color: "#2d9e6b" },
    "Lifestyle": { icon: "❤️", color: "#FF6B35" },
    "World News": { icon: "🌍", color: "#7B2FBE" },
    "Culture": { icon: "🎭", color: "#E8B922" },
    "Health": { icon: "🏥", color: "#2d9e6b" },
  };
  const cat = catMap[p.category] || { icon: "📰", color: "#1877F2" };
  return {
    id: p.id,
    cat: p.category || "News",
    icon: cat.icon,
    color: cat.color,
    title: p.rawTitle,
    excerpt: p.generatedPost?.slice(0, 200) + "...",
    time: timeAgo(p.timestamp),
    source: p.source,
    img: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80`,
    breaking: p.isBreaking,
  };
}

function timeAgo(timestamp) {
  if (!timestamp) return "Just now";
  const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export const SHOWS = [
  { id:1, name:"MFCC Summer Festival", venue:"MFCC, Ta' Qali", date:"Fri 4 Apr", time:"21:00", img:"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80", price:"€25" },
  { id:2, name:"Jazz Night at Valletta Waterfront", venue:"Valletta Waterfront", date:"Sat 5 Apr", time:"20:00", img:"https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80", price:"Free" },
  { id:3, name:"Malta Philharmonic Orchestra", venue:"Mediterranean Conference Centre", date:"Sun 6 Apr", time:"19:30", img:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80", price:"€15" },
  { id:4, name:"Ibiza Night at Cafe Del Mar", venue:"Cafe Del Mar, St Paul's Bay", date:"Fri 11 Apr", time:"22:00", img:"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80", price:"€10" },
  { id:5, name:"Mdina Silent City Tour", venue:"Mdina", date:"Sat 12 Apr", time:"18:00", img:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80", price:"€8" },
  { id:6, name:"Sunday Market at Ta' Qali", venue:"Ta' Qali National Park", date:"Sun 13 Apr", time:"09:00", img:"https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80", price:"Free" },
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
  { path:"/happening", label:"What's Happening", icon:"✨" },
  { path:"/videos", label:"Videos", icon:"🎥" },
  { path:"/about", label:"About Us", icon:"ℹ️" },
  { path:"/contact", label:"Contact", icon:"📬" },
  { path:"/advertise", label:"Advertise With Us", icon:"📣" },
  export const TRAFFIC_ROUTES = [
  { name:"Regional Road (Birkirkara–Attard)", status:"clear", delay:0 },
  { name:"Mosta Bypass", status:"heavy", delay:25 },
  { name:"Coast Road (Sliema–Bugibba)", status:"slow", delay:12 },
  { name:"Msida–Valletta Arterial", status:"clear", delay:0 },
  { name:"Airport Link Road (Luqa)", status:"clear", delay:2 },
  { name:"Gozo Ferry Approach", status:"slow", delay:8 },
];