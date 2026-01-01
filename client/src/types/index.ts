export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}