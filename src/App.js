import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Breaking from './pages/Breaking';
import LocalNews from './pages/LocalNews';
import WorldNews from './pages/WorldNews';
import Weather from './pages/Weather';
import Traffic from './pages/Traffic';
import Sports from './pages/Sports';
import Lifestyle from './pages/Lifestyle';
import Shows from './pages/Shows';
import Happening from './pages/Happening';
import Videos from './pages/Videos';
import About from './pages/About';
import Contact from './pages/Contact';
import Advertise from './pages/Advertise';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breaking" element={<Breaking />} />
          <Route path="/local-news" element={<LocalNews />} />
          <Route path="/world-news" element={<WorldNews />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/happening" element={<Happening />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advertise" element={<Advertise />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
