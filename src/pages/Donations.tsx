import React from 'react';
import { Copy, Heart, Mail, Instagram } from 'lucide-react';

const Donations: React.FC = () => {
  const addresses = [
    { coin: 'Solana', address: 'FmRNX46H6BM8YTZjX5ygXaJqUVeNW7JMzAHuaBWDpQj4' },
    { coin: 'Ethereum', address: '0x09B5AC4eD8a6e4f9736B1Aba30F2Cbe95b3d2C8b' },
    { coin: 'Bitcoin', address: 'bc1pzf04fx2qgx3t72pr3n7m8jwjf0xepr9fcec949dl76zzxfnq9x8sjtfpkt' },
    { coin: 'Ethereum Base', address: '0x09B5AC4eD8a6e4f9736B1Aba30F2Cbe95b3d2C8b' },
    { coin: 'Sui', address: '0x3ae0095b9b9a4579df691bba01a85105d8f14ba9ba14bc4aa2077c5995f4ae85' },
    { coin: 'Polygon', address: '0x09B5AC4eD8a6e4f9736B1Aba30F2Cbe95b3d2C8b' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-obsidian text-platinum pt-32 px-6 pb-20">
      <div className="max-w-3xl mx-auto reveal-section">
        <div className="inline-flex items-center justify-center p-3 mb-6 mix-blend-screen bg-gold/5 rounded-full border border-gold/20 backdrop-blur-md">
          <Heart size={24} className="text-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Support <span className="gold-gradient-text italic">mio.ad</span></h1>
        
        <p className="text-platinum/60 text-lg font-light leading-relaxed mb-12">
          This platform is maintained entirely by community contributions. We do not sell ads, collect user data, or monetize traffic. Your donations allow us to keep the index updated, secure, and freely available to all sovereign individuals seeking financial privacy.
        </p>

        <div className="space-y-6">
          {addresses.map((item) => (
            <div key={item.address + item.coin} className="glass-panel p-6 border border-white/5 hover:border-gold/30 transition-colors duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-gold font-bold uppercase tracking-widest text-sm mb-2">{item.coin}</h3>
                <p className="font-mono text-sm text-platinum/70 break-all">{item.address}</p>
              </div>
              <button 
                onClick={() => copyToClipboard(item.address)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-gold hover:text-obsidian transition-all duration-300 font-bold uppercase tracking-widest text-xs rounded-none border border-white/10"
              >
                <Copy size={14} /> Copy
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-panel p-8 border border-white/5 text-center">
          <h2 className="text-xl font-serif text-platinum mb-4">Contact & Media</h2>
          <p className="text-platinum/60 font-light mb-2">Interested in this site? Let's get in touch.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <a href="mailto:admin@mio.ad" className="text-gold hover:text-gold/80 transition-colors uppercase tracking-widest text-sm font-bold flex items-center gap-2">
              <Mail size={16} /> admin@mio.ad
            </a>
            <a href="https://instagram.com/mio.mio.ad" target="_blank" rel="noreferrer" className="text-gold hover:text-gold/80 transition-colors uppercase tracking-widest text-sm font-bold flex items-center gap-2">
              <Instagram size={16} /> @mio.mio.ad
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
