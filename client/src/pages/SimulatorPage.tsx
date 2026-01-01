import { useState, useMemo } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Calculator, TrendingUp } from 'lucide-react';

const SimulatorPage = () => {
  // Simulation State
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7); // 7% APY (S&P 500 average)
  const [years, setYears] = useState(10);

  // Logic: Calculate Compound Interest
  const data = useMemo(() => {
    let currentBalance = initial;
    let totalContributed = initial;
    const result = [];

    for (let i = 0; i <= years; i++) {
      result.push({
        year: `Year ${i}`,
        balance: Math.round(currentBalance),
        principal: totalContributed,
      });

      // Add monthly contributions * 12
      totalContributed += monthly * 12;
      // Apply Interest (Annual compouding for simplicity)
      currentBalance = (currentBalance + (monthly * 12)) * (1 + rate / 100);
    }
    return result;
  }, [initial, monthly, rate, years]);

  const finalAmount = data[data.length - 1].balance;
  const totalInvested = data[data.length - 1].principal;
  const interestEarned = finalAmount - totalInvested;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-xl text-primary">
          <Calculator size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-widest">FUTURE-SIGHT</h1>
          <p className="text-gray-400 text-sm font-mono">WEALTH PROJECTION ENGINE</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <GlassCard className="p-6 space-y-8 h-fit">
          <h3 className="text-primary font-mono text-sm uppercase mb-4 border-b border-white/10 pb-2">Configuration</h3>
          
          {/* Initial Deposit Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Starting Balance</span>
              <span className="text-white font-bold font-mono">${initial.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="0" max="100000" step="1000" 
              value={initial} onChange={(e) => setInitial(Number(e.target.value))}
              className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Monthly Contribution</span>
              <span className="text-white font-bold font-mono">${monthly.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="0" max="5000" step="50" 
              value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Annual Return (APY)</span>
              <span className="text-white font-bold font-mono">{rate}%</span>
            </div>
            <input 
              type="range" min="1" max="15" step="0.5" 
              value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time Horizon</span>
              <span className="text-white font-bold font-mono">{years} Years</span>
            </div>
            <input 
              type="range" min="1" max="40" step="1" 
              value={years} onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </GlassCard>

        {/* Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-3 gap-4">
            <GlassCard className="p-4 text-center">
              <p className="text-xs text-gray-500 uppercase">Invested</p>
              <p className="text-xl font-bold text-white">${totalInvested.toLocaleString()}</p>
            </GlassCard>
            <GlassCard className="p-4 text-center border-primary/30 border">
              <p className="text-xs text-primary uppercase">Interest Earned</p>
              <p className="text-xl font-bold text-primary">+${interestEarned.toLocaleString()}</p>
            </GlassCard>
            <GlassCard className="p-4 text-center bg-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-20">
                {/* ICON USED HERE TO FIX ERROR */}
                <TrendingUp size={40} className="text-green-400" />
              </div>
              <p className="text-xs text-green-400 uppercase relative z-10">Projected Total</p>
              <p className="text-2xl font-bold text-green-400 relative z-10">${finalAmount.toLocaleString()}</p>
            </GlassCard>
          </div>

          {/* The Chart */}
          <GlassCard className="p-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#666" tick={{fill: '#666'}} />
                <YAxis stroke="#666" tick={{fill: '#666'}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="balance" name="Total Wealth" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorBalance)" />
                <Area type="monotone" dataKey="principal" name="Cash Invested" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPrincipal)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;