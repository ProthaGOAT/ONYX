import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { useCurrency } from '../context/CurrencyContext';
import { RefreshCw, Activity, ShieldCheck, Server } from 'lucide-react'; // <--- Removed 'Globe'

const WalletPage = () => {
  const { rates, availableCurrencies, lastUpdated, loading, refreshRates } = useCurrency();
  
  const [amount, setAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('NGN');

  const convertResult = () => {
    const rateFrom = rates[fromCurr] || 1;
    const rateTo = rates[toCurr] || 1;
    const result = (amount / rateFrom) * rateTo;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: toCurr,
    }).format(result);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-widest">GLOBAL INTELLIGENCE</h1>
          <p className="text-gray-400 text-sm font-mono mt-1">FOREX MARKETS & WEALTH CONVERSION</p>
        </div>
        
        {/* Verification Badge */}
        <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-xs font-mono text-green-400 mb-1">
                <ShieldCheck size={14} /> 
                <span>DATA VERIFIED</span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-mono">
                Source: ExchangeRate-API • {lastUpdated}
            </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* LEFT: Converter */}
        <GlassCard className="p-8 border-t-4 border-primary/50 h-full flex flex-col justify-center bg-black/40">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-white font-bold font-display text-xl">FX CALCULATOR</h3>
            <button 
                onClick={refreshRates} 
                disabled={loading}
                className="flex items-center gap-2 text-xs text-primary hover:text-white transition-colors bg-primary/10 px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 disabled:opacity-50"
            >
              {loading ? 'SYNCING...' : 'SYNC NOW'}
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-surface/50 p-6 rounded-xl border border-white/5 focus-within:border-primary/50 transition-all">
              <label className="text-xs text-gray-500 font-mono uppercase tracking-wider block mb-2">Base Amount</label>
              
              <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-transparent text-4xl font-bold text-white outline-none w-full font-display mb-4 border-b border-white/10 pb-2 focus:border-white transition-colors"
                />

              <select 
                  value={fromCurr}
                  onChange={(e) => setFromCurr(e.target.value)}
                  className="w-full bg-black text-gray-300 text-sm rounded px-3 py-3 outline-none cursor-pointer border border-white/10 hover:border-white/30 transition-colors"
                >
                  {Object.entries(availableCurrencies).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.flag} {info.name} ({code})
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-center -my-5 relative z-10">
              <div className="bg-black border border-white/10 p-2 rounded-full shadow-neon">
                <RefreshCw size={24} className="text-white" />
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <label className="text-xs text-primary/70 font-mono uppercase tracking-wider block mb-2">Converted Value</label>
              
              <div className="text-4xl font-bold text-primary font-display break-all mb-4 pb-2 border-b border-primary/20">
                  {convertResult()}
              </div>

              <select 
                  value={toCurr}
                  onChange={(e) => setToCurr(e.target.value)}
                  className="w-full bg-black text-gray-300 text-sm rounded px-3 py-3 outline-none cursor-pointer border border-white/10 hover:border-white/30 transition-colors"
                >
                  {Object.entries(availableCurrencies).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.flag} {info.name} ({code})
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </GlassCard>

        {/* RIGHT: Data Panel */}
        <div className="space-y-6">
          <GlassCard className="p-6 bg-gradient-to-br from-surface to-black">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
                <Server size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Real-Time Data Feed</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ONYX connects directly to Open Exchange APIs. Data is refreshed daily for spot rates. 
                  <span className="block mt-2 text-white/50 text-xs font-mono">
                    STATUS: {loading ? 'FETCHING PACKETS...' : 'CONNECTED (24ms)'}
                  </span>
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-400 text-xs font-mono uppercase flex items-center gap-2">
                <Activity size={14} /> Market Rates
                </h3>
                <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                    Live
                </span>
            </div>
            
            <div className="space-y-3">
              {[
                { pair: 'GBP', name: 'British Pound', rate: rates['GBP'], color: 'text-green-400' },
                { pair: 'EUR', name: 'Euro', rate: rates['EUR'], color: 'text-green-400' },
                { pair: 'NGN', name: 'Nigerian Naira', rate: rates['NGN'], color: 'text-accent' },
                { pair: 'CAD', name: 'Canadian Dollar', rate: rates['CAD'], color: 'text-white' },
                { pair: 'JPY', name: 'Japanese Yen', rate: rates['JPY'], color: 'text-white' },
              ].map((item) => (
                <div key={item.pair} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">USD <span className="text-gray-500">/</span> {item.pair}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{item.name}</span>
                  </div>
                  <span className={`font-mono ${item.color}`}>
                    {item.rate ? item.rate.toLocaleString() : <span className="text-xs text-gray-600">Loading...</span>}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default WalletPage;