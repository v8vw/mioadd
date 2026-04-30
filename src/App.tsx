import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Donations from './pages/Donations';
import Terms from './pages/Terms';

function Nav() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group cursor-pointer">
          <svg className="w-10 h-10 text-gold group-hover:scale-110 transition-transform duration-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 30 A 45 45 0 1 0 90 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="90" cy="30" r="4" fill="currentColor"/>
            <circle cx="90" cy="70" r="4" fill="currentColor"/>
            <path d="M 30 45 V 70 M 30 45 C 30 35, 45 35, 45 45 V 70 M 45 45 C 45 35, 60 35, 60 45 V 70" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 35 70 C 45 70, 55 60, 65 45 L 75 35" stroke="#0f1115" strokeWidth="10" strokeLinecap="round" />
            <path d="M 35 70 C 45 70, 55 60, 65 45 L 75 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 55 35 H 75 V 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-2xl font-serif font-bold tracking-[0.3em] uppercase gold-gradient-text">
            mio.ad
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-16">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.4em] text-platinum/40 hover:text-gold transition-all duration-500 hover:tracking-[0.6em]">
            Home
          </Link>
          <Link to="/donations" className="text-[10px] font-bold uppercase tracking-[0.4em] text-platinum/40 hover:text-gold transition-all duration-500 hover:tracking-[0.6em]">
            Donations
          </Link>
          <Link to="/terms" className="text-[10px] font-bold uppercase tracking-[0.4em] text-platinum/40 hover:text-gold transition-all duration-500 hover:tracking-[0.6em]">
            Terms
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-12 text-center border-t border-white/5 bg-obsidian relative flex flex-col items-center gap-6">
      <svg className="w-8 h-8 text-gold/30 hover:text-gold transition-colors duration-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 30 A 45 45 0 1 0 90 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="90" cy="30" r="4" fill="currentColor"/>
        <circle cx="90" cy="70" r="4" fill="currentColor"/>
        <path d="M 30 45 V 70 M 30 45 C 30 35, 45 35, 45 45 V 70 M 45 45 C 45 35, 60 35, 60 45 V 70" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 35 70 C 45 70, 55 60, 65 45 L 75 35" stroke="#0f1115" strokeWidth="10" strokeLinecap="round" />
        <path d="M 35 70 C 45 70, 55 60, 65 45 L 75 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M 55 35 H 75 V 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-platinum/40">
        <Link to="/donations" className="hover:text-gold transition-colors">Donations</Link>
        <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
      </div>
      <div className="flex flex-col items-center max-w-2xl text-center px-6 gap-4">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-platinum/20 leading-relaxed">
          Disclaimer: We are purely an informational index. We do not offer financial advice and are not responsible for any kind of losses or gains incurred from using third-party services.
        </span>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-platinum/20">
          © 2026 mio.ad. Engineered for the Sovereign.
        </span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-obsidian selection:bg-gold selection:text-obsidian overflow-x-hidden mesh-gradient">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
