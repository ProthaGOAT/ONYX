// ... imports keep same ...
import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Transaction } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import GlassCard from '../components/ui/GlassCard';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { TrendingUp, TrendingDown, Wallet, Plus, Zap, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const { format, currency } = useCurrency();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', amount: '', type: 'expense', category: 'General' });

  const fetchData = async () => {
    try {
      const { data } = await api.get('/transactions');
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await api.post('/transactions', { ...formData, amount: Number(formData.amount), date: new Date().toISOString() });
      await fetchData();
      setIsModalOpen(false);
      setFormData({ title: '', amount: '', type: 'expense', category: 'General' });
    } catch (err) { console.error(err); } finally { setFormLoading(false); }
  };

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  const chartData = transactions.slice(0, 7).reverse().map(t => ({
    name: new Date(t.date).toLocaleDateString(undefined, { weekday: 'short' }),
    amount: t.amount,
  }));

  if (loading) return <div className="text-white p-10 font-sans">Loading your dashboard...</div>;

  return (
    <>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white tracking-wide">
              Financial Overview
            </h1>
            <p className="text-gray-400 font-sans text-sm mt-1">
              Welcome back, {user?.name}
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-neon"
          >
            <Plus size={18} /> Add Transaction
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 border-t-4 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-xs font-sans uppercase tracking-wider">Net Worth</h3>
              <Wallet className="text-white/50" size={20} />
            </div>
            <div className="text-4xl font-bold font-sans text-white">{format(balance)}</div>
          </GlassCard>

          <GlassCard className="p-6 border-t-4 border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-xs font-sans uppercase tracking-wider">Total Income</h3>
              <TrendingUp className="text-green-400/50" size={20} />
            </div>
            <div className="text-4xl font-bold font-sans text-green-400">+{format(income)}</div>
          </GlassCard>

          <GlassCard className="p-6 border-t-4 border-accent/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-xs font-sans uppercase tracking-wider">Total Expenses</h3>
              <TrendingDown className="text-accent/50" size={20} />
            </div>
            <div className="text-4xl font-bold font-sans text-accent">-{format(expense)}</div>
          </GlassCard>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
          <div className="lg:col-span-2 h-full">
            <GlassCard className="p-6 flex flex-col h-full bg-gradient-to-b from-surface/80 to-black/80">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" /> Cash Flow ({currency})
                </h3>
              </div>
              <div className="flex-1 w-full h-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSplit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#333" tick={{fill: '#666', fontSize: 12}} />
                    <YAxis stroke="#333" tick={{fill: '#666', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorSplit)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <div className="h-full">
            <GlassCard className="p-6 h-full flex flex-col bg-surface/40">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">Recent Activity</h3>
              <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {transactions.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600">
                      <p className="text-sm font-sans">No transactions recorded yet.</p>
                    </div>
                ) : (
                    transactions.map((t) => (
                    <div key={t._id} className="flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all border-l-2 border-transparent hover:border-primary group">
                        <div>
                          <p className="font-medium text-white group-hover:text-primary transition-colors">{t.title}</p>
                          <p className="text-[10px] text-gray-500 font-sans">{new Date(t.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`font-bold font-sans ${t.type === 'income' ? 'text-green-400' : 'text-accent'}`}>
                        {t.type === 'income' ? '+' : '-'}{format(t.amount)}
                        </span>
                    </div>
                    ))
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Transaction">
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <Input 
            label="Description" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required 
            placeholder="e.g. Salary, Rent, Netflix"
          />
          <Input 
            label="Amount (USD Base)" 
            type="number" 
            value={formData.amount} 
            onChange={e => setFormData({...formData, amount: e.target.value})} 
            required 
            placeholder="0.00"
          />
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'expense'})}
              className={`p-3 rounded-lg border font-sans text-sm transition-all ${formData.type === 'expense' ? 'bg-accent/20 border-accent text-white' : 'border-white/10 text-gray-500 hover:bg-white/5'}`}
            >
              EXPENSE
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'income'})}
              className={`p-3 rounded-lg border font-sans text-sm transition-all ${formData.type === 'income' ? 'bg-green-500/20 border-green-500 text-white' : 'border-white/10 text-gray-500 hover:bg-white/5'}`}
            >
              INCOME
            </button>
          </div>

          <Input 
            label="Category" 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})} 
            placeholder="e.g. Utilities, Food"
          />

          <button 
            type="submit" 
            disabled={formLoading}
            className="w-full mt-4 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex justify-center items-center gap-2"
          >
            {formLoading ? <Loader2 className="animate-spin" /> : 'Save Entry'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;