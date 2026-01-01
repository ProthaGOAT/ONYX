import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Transaction } from '../types';
import GlassCard from '../components/ui/GlassCard';
import { useCurrency } from '../context/CurrencyContext'; // <--- Import Context

const TransactionsPage = () => {
  const { format, currency } = useCurrency(); // <--- Get the global formatter
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions').then(res => setTransactions(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-display font-bold text-white tracking-widest">TRANSACTION HISTORY</h1>
        <div className="text-xs font-mono text-primary flex items-center gap-2">
           <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
           SHOWING IN {currency}
        </div>
      </div>

      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-gray-500 font-mono uppercase border-b border-white/10">
              <tr>
                <th className="pb-4">Date</th>
                <th className="pb-4">Description</th>
                <th className="pb-4">Category</th>
                <th className="pb-4 text-right">Amount ({currency})</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              {transactions.map(t => (
                <tr key={t._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="py-4 font-medium text-white">{t.title}</td>
                  <td className="py-4"><span className="bg-white/10 px-2 py-1 rounded text-xs">{t.category}</span></td>
                  <td className={`py-4 text-right font-mono font-bold ${t.type === 'income' ? 'text-green-400' : 'text-accent'}`}>
                    {/* Using format() here converts it automatically */}
                    {t.type === 'income' ? '+' : '-'}{format(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default TransactionsPage;