'use client';

import { useState, useEffect } from 'react';
import BalanceCard from '@/components/BalanceCard';
import TransactionList from '@/components/TransactionList';
import IncomeExpenseChart from '@/components/IncomeExpenseChart';

interface DashboardData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  recentTransactions: {
    id: string;
    amount: number;
    description: string;
    type: 'income' | 'expense';
    category: string | null;
    date: string;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Financial Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 lg:col-span-1">
            <BalanceCard totalBalance={data.totalBalance} />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <IncomeExpenseChart totalIncome={data.totalIncome} totalExpenses={data.totalExpenses} />
          </div>
        </div>

        <TransactionList transactions={data.recentTransactions} />
      </div>
    </div>
  );
}
