import { Link } from 'react-router-dom';
import CyberBackground from '../components/layout/CyberBackground';
import { ArrowRight, BarChart2, Globe, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white relative font-sans selection:bg-primary selection:text-white">
      <CyberBackground />
      
      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ONYX</h1>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">Sign In</Link>
          <Link to="/register" className="px-4 py-2 text-sm bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 mt-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
          <span className="text-xs font-mono text-primary">v2.0 NOW LIVE • GLOBAL CURRENCY SUPPORT</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
          Master Your Wealth <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-purple-500">In Any Currency.</span>
        </h2>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ONYX is the intelligent financial command center for the modern earner. 
          Track income, visualize growth, and simulate your future net worth across global markets.
        </p>

        <div className="flex justify-center mb-20">
          <Link to="/register" className="px-8 py-4 bg-primary hover:bg-primary/90 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-neon hover:scale-105">
            Start Tracking Free <ArrowRight size={20} />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: BarChart2, title: 'Smart Analytics', desc: 'Visualize your cash flow with interactive charts and automated net worth calculations.' },
            { icon: Globe, title: 'Multi-Currency', desc: 'Seamlessly switch your entire dashboard between USD, NGN, GBP, and more in one click.' },
            { icon: Shield, title: 'Secure & Private', desc: 'Bank-grade encryption ensures your financial data stays yours. No ads, no selling data.' },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 mt-32 border-t border-white/5 py-8 text-center text-gray-600 text-xs font-mono">
        &copy; {new Date().getFullYear()} ONYX FINANCIAL. BUILT BY ABRAHAM OGBOLE.
      </footer>
    </div>
  );
};

export default LandingPage;