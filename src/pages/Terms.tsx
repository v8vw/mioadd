import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-obsidian text-platinum pt-32 px-6 pb-20">
      <div className="max-w-3xl mx-auto reveal-section">
        <div className="inline-flex items-center justify-center p-3 mb-6 mix-blend-screen bg-gold/5 rounded-full border border-gold/20 backdrop-blur-md">
          <ShieldAlert size={24} className="text-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Terms of <span className="gold-gradient-text italic">Service</span></h1>
        
        <div className="space-y-8 text-platinum/60 font-light leading-relaxed">
          <section>
            <h2 className="text-gold font-bold uppercase tracking-widest text-sm mb-4">1. Zero Data Collection Policy</h2>
            <p>
              mio.ad processes strictly zero personal data. We do not use cookies, analytics, or trackers. We do not log IP addresses, search queries, or interaction metrics. We do not require registration or collect identifying information of any kind. Your visit to this index is entirely private and known only to you (and your ISP/VPN provider).
            </p>
          </section>

          <section>
            <h2 className="text-gold font-bold uppercase tracking-widest text-sm mb-4">2. Nature of the Index</h2>
            <p>
              This platform serves solely as an informational directory of third-party peer-to-peer exchanges and sovereign digital tools. We do not host, operate, or maintain any of the listed external platforms. We are not a financial service provider, nor do we offer financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-gold font-bold uppercase tracking-widest text-sm mb-4">3. No Liability</h2>
            <p>
              By using this directory, you acknowledge that interacting with decentralized protocols and unverified third-party platforms carries inherent risks. mio.ad and its maintainers assume zero liability for lost funds, compromised security, or any damages occurring from the use of linked external services. You are solely responsible for conducting your own research (DYOR) and ensuring extreme operational security.
            </p>
          </section>

          <section>
            <h2 className="text-gold font-bold uppercase tracking-widest text-sm mb-4">4. Community Supported</h2>
            <p>
              This repository of knowledge is completely free and sustained by the generosity of sovereign individuals like you. We profoundly appreciate donations which provide the essential resources needed to maintain domain hosting, resist censorship, and continue updating the index over time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
