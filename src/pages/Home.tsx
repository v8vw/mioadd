/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Search, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  ExternalLink, 
  ShieldCheck, 
  Activity, 
  Shuffle, 
  Briefcase,
  Menu,
  X,
  ArrowRight,
  Lock,
  EyeOff,
  Zap,
  ChevronRight
} from 'lucide-react';
import { PLATFORMS } from '../constants';
import { Platform, Category } from '../types';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCurves = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(svgRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 40,
        repeat: -1
      });
      
      gsap.to('.curve-y', {
        y: 'random(-50, 50)',
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random'
        }
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0 mix-blend-screen mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)">
      <svg ref={svgRef} className="absolute h-full w-[200vw] left-0 top-0" viewBox="0 0 2000 1000" preserveAspectRatio="none">
        <g fill="none" strokeWidth="1.5">
          <path className="curve-y" d="M0,300 C300,400 400,200 700,300 C1000,400 1100,200 1400,300 C1700,400 1800,200 2000,300" stroke="rgba(212,175,55,0.4)" />
          <path className="curve-y" d="M0,500 C400,600 600,400 1000,500 C1400,600 1600,400 2000,500" stroke="rgba(255,255,255,0.2)" />
          <path className="curve-y" d="M0,700 C200,800 300,600 500,700 C700,800 800,600 1000,700 C1200,800 1300,600 1500,700 C1700,800 1800,600 2000,700" stroke="rgba(212,175,55,0.2)" strokeDasharray="10 20" />
          <path className="curve-y" d="M0,450 C350,250 650,650 1000,450 C1350,250 1650,650 2000,450" stroke="rgba(255,255,255,0.1)" />
          <path className="curve-y" d="M0,600 C500,750 500,450 1000,600 C1500,750 1500,450 2000,600" stroke="rgba(212,175,55,0.15)" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance (Supahero style mask reveal)
      const tl = gsap.timeline();
      tl.from('.hero-word', {
        y: 120,
        rotation: 10,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.5
      })
      .from(subRef.current, {
        y: 30,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1')
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.8');

      // Floating particles background effect
      gsap.to('.particle', {
        y: 'random(-150, 150)',
        x: 'random(-150, 150)',
        duration: 'random(15, 25)',
        repeat: -1,
        yoyo: true,
        ease: 'none',
        stagger: {
          amount: 8,
          from: 'random'
        }
      });

      // Mouse Follower
      const handleMouseMove = (e: MouseEvent) => {
        gsap.to(cursorFollowerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: 'power2.out'
        });
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Scroll reveals
      gsap.from('.reveal-section', {
        scrollTrigger: {
          trigger: '.reveal-section',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Magnetic Buttons
      const magneticButtons = document.querySelectorAll('.premium-button, .premium-button-filled');
      magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e: any) => {
          const { left, top, width, height } = btn.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;
          gsap.to(btn, {
            x: x * 20,
            y: y * 20,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion tab indicator naturally replaces the GSAP implementation.
  const filteredPlatforms = PLATFORMS.filter(p => {
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPlatforms = filteredPlatforms;

  return (
    <main className="relative width-full">
      <div className="noise-overlay" />
      
      {/* Interactive Cursor Follower */}
      <div 
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gold/5 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        <AnimatedCurves />
        
        {/* Background Particles & Luxury Glows */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle absolute w-1 h-1 bg-gold/30 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
          <div className="absolute top-1/4 left-1/4 w-[1200px] h-[1200px] bg-royal-purple/10 rounded-full blur-[200px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-deep-emerald/10 rounded-full blur-[180px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gold/30 bg-gold/5 mb-12 reveal-section shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <Lock size={14} className="text-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.5em] font-black text-gold">
              Institutional Privacy Layer
            </span>
          </div>
          
          <h1 
            ref={titleRef}
            className="text-7xl md:text-9xl font-serif font-light leading-[1.1] mb-12 tracking-tighter flex flex-col items-center"
          >
            <div className="overflow-hidden pb-4">
              <div className="hero-word inline-block">The</div>
              <span className="inline-block w-4 md:w-8" />
              <div className="hero-word inline-block">Sovereign</div>
            </div>
            <div className="overflow-hidden pb-4">
              <div className="hero-word inline-block italic gold-gradient-text font-medium">Digital</div>
              <span className="inline-block w-4 md:w-8" />
              <div className="hero-word inline-block italic gold-gradient-text font-medium">Index</div>
            </div>
          </h1>
          
          <p 
            ref={subRef}
            className="text-xl md:text-2xl text-platinum/40 max-w-3xl mx-auto mb-16 leading-relaxed font-light tracking-wide"
          >
            A curated intelligence ecosystem for high-net-worth private users. 
            Access premium platforms operating beyond identity constraints with absolute discretion.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.a 
              href="#directory"
              whileTap={{ scale: 0.95 }} 
              className="premium-button-filled inline-flex items-center group px-12 py-4"
            >
              Explore Directory
              <ChevronRight size={18} className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-500" />
            </motion.a>
          </div>
        </div>

        {/* Abstract Visual */}
        <div className="mt-32 max-w-7xl mx-auto px-6 opacity-30 reveal-section">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="grid grid-cols-12 gap-4 mt-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-24 border-l border-white/5" />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Value Section */}
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <ValueProp 
              icon={<ShieldCheck className="text-gold" size={32} />}
              title="Verified Anonymity"
              desc="Every platform undergoes rigorous multi-layer audits for true non-KYC compliance."
            />
            <ValueProp 
              icon={<Activity className="text-gold" size={32} />}
              title="Global Liquidity"
              desc="Access deep liquidity pools across verified private financial nodes."
            />
            <ValueProp 
              icon={<Shuffle className="text-gold" size={32} />}
              title="Cross-Chain Intel"
              desc="Seamlessly navigate private infrastructure across all major blockchain networks."
            />
            <ValueProp 
              icon={<EyeOff className="text-gold" size={32} />}
              title="Discreet Access"
              desc="Zero-knowledge indexing. Your search patterns remain your private intelligence."
            />
          </div>
        </div>
      </section>

      {/* Platform Directory */}
      <section id="directory" ref={platformsRef} className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="reveal-section">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">The Index</h2>
            <p className="text-platinum/30 max-w-lg text-lg leading-relaxed">
              A comprehensive directory of verified private financial platforms. 
              Curation meets absolute sovereignty.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 reveal-section">
            {/* Search */}
            <div className="relative group">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search the directory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/[0.03] border border-white/10 rounded-none py-4 pl-14 pr-8 text-sm focus:outline-none focus:border-gold/40 transition-all w-full md:w-80 backdrop-blur-md"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="relative flex bg-white/[0.03] border border-white/10 p-1 backdrop-blur-md overflow-hidden">
              {['All', 'Exchange', 'Wallet', 'Casino', 'P2P'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilterCategory(cat as any)}
                  className={`relative z-10 px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${filterCategory === cat ? 'text-gold' : 'text-platinum/40 hover:text-platinum'}`}
                >
                  {filterCategory === cat && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-gold/10 border border-gold/20 z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{ borderRadius: "2px" }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-4 transition-all duration-500 ${viewMode === 'grid' ? 'bg-gold text-obsidian shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'text-platinum/30 hover:text-platinum'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-4 transition-all duration-500 ${viewMode === 'table' ? 'bg-gold text-obsidian shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'text-platinum/30 hover:text-platinum'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key="grid"
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {displayedPlatforms.map((platform) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    key={platform.id}
                  >
                    <PlatformCard platform={platform} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="glass-panel overflow-x-auto rounded-xl"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.4em] text-platinum/30">
                    <th className="px-10 py-8 font-black">Platform</th>
                    <th className="px-10 py-8 font-black">Category</th>
                    <th className="px-10 py-8 font-black">Assets</th>
                    <th className="px-10 py-8 font-black">Trust Score</th>
                    <th className="px-10 py-8 font-black text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {displayedPlatforms.map((platform) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        key={platform.id} 
                        className="border-b border-white/5 hover:bg-gold/5 transition-all duration-500 group"
                      >
                        <td className="px-10 py-8">
                          <div className="font-serif text-xl mb-1 group-hover:gold-gradient-text transition-all duration-500">{platform.name}</div>
                          <div className="text-[10px] uppercase tracking-widest text-platinum/20">{platform.tags[0]}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 text-platinum/50">
                            {platform.category}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex gap-3">
                            {platform.supportedAssets.map(asset => (
                              <span key={asset} className="text-[10px] font-black text-gold/40 group-hover:text-gold transition-colors">{asset}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" style={{ width: `${platform.trustScore * 10}%` }} />
                            </div>
                            <span className="text-xs font-black text-gold">{platform.trustScore}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <a 
                            href={platform.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            title={`Open ${platform.name}`}
                            className="inline-block text-platinum/20 hover:text-gold transition-all duration-500 transform hover:scale-125"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 text-center reveal-section">
          <p className="text-[10px] uppercase tracking-[0.3em] text-platinum/30">
            Showing all {displayedPlatforms.length} platforms
          </p>
        </div>
      </section>
    </main>
  );
}

const ValueProp: React.FC<{ icon: ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-section group perspective-1000"
    >
      <div className="w-20 h-20 glass-panel flex items-center justify-center mb-10 group-hover:border-gold/40 transition-all duration-700">
        {icon}
      </div>
      <h3 className="text-2xl font-serif mb-5 group-hover:gold-gradient-text transition-all duration-500">{title}</h3>
      <p className="text-base text-platinum/30 leading-relaxed font-light">{desc}</p>
    </div>
  );
}

const PlatformCard: React.FC<{ platform: Platform }> = ({ platform }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      scale: 1.02,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="platform-card glass-panel p-10 group hover:border-gold/30 transition-all duration-700 flex flex-col h-full relative overflow-hidden perspective-1000"
    >
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all duration-700" />
      
      <div className="flex justify-between items-start mb-10 relative z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] font-black px-4 py-1.5 bg-gold/5 border border-gold/20 text-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]">
          {platform.category}
        </span>
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-gold/40" />
          <span className="text-sm font-black text-gold">{platform.trustScore}</span>
        </div>
      </div>
      
      <h3 className="text-3xl font-serif mb-6 group-hover:gold-gradient-text transition-all duration-700 tracking-tight">
        {platform.name}
      </h3>
      
      <p className="text-base text-platinum/30 leading-relaxed mb-10 flex-1 font-light">
        {platform.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {platform.tags.map(tag => (
          <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-bold text-platinum/20 border border-white/5 px-3 py-1.5 bg-white/[0.02]">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
        <div className="flex gap-4">
          {platform.supportedAssets.map(asset => (
            <span key={asset} className="text-[11px] font-black text-platinum/10 group-hover:text-gold/60 transition-all duration-500">
              {asset}
            </span>
          ))}
        </div>
        <a 
          href={platform.url} 
          target="_blank" 
          rel="noreferrer"
          title={`Open ${platform.name}`}
          className="text-platinum/20 hover:text-gold transition-all duration-500 transform hover:scale-125"
        >
          <ExternalLink size={22} />
        </a>
      </div>
    </div>
  );
}

const ToolCard: React.FC<{ tool: any }> = ({ tool }) => {
  return null; // Tools removed as requested
}
