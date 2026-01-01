import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  NGN: { symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  GHS: { symbol: '₵', name: 'Ghanaian Cedi', flag: '🇬🇭' },
  KES: { symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪' },
  ZAR: { symbol: 'R', name: 'South African Rand', flag: '🇿🇦' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
};

type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES;

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (amount: number) => string;
  rates: Record<string, number>;
  loading: boolean;
  availableCurrencies: typeof SUPPORTED_CURRENCIES;
  lastUpdated: string;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [lastUpdated, setLastUpdated] = useState<string>('Loading...');
  const [loading, setLoading] = useState(true);

  // Define the fetch function so we can call it manually
  const fetchRates = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      setRates(data.rates);
      
      // Get the real timestamp from the API or current time
      const date = new Date(data.date || Date.now()); 
      setLastUpdated(date.toLocaleDateString(undefined, { 
        year: 'numeric', month: 'long', day: 'numeric' 
      }));
      
    } catch (error) {
      console.error("Failed to fetch rates, using fallback", error);
      // Fallback values if offline
      setRates({ USD: 1, NGN: 1650, GBP: 0.79, EUR: 0.92, GHS: 13.5, KES: 145, ZAR: 19 });
      setLastUpdated('Offline / Estimated Mode');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const format = (amount: number) => {
    const rate = rates[currency] || 1;
    const value = amount * rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      format, 
      rates, 
      loading, 
      availableCurrencies: SUPPORTED_CURRENCIES,
      lastUpdated,
      refreshRates: fetchRates // Allow components to request update
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};