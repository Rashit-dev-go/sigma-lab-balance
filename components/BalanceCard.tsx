import React from 'react';

interface BalanceCardProps {
  totalBalance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ totalBalance }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalBalance);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Balance</h2>
      <p className={`text-3xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formattedBalance}
      </p>
    </div>
  );
};

export default BalanceCard;
