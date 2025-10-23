import React from 'react';

interface IncomeExpenseChartProps {
  totalIncome: number;
  totalExpenses: number;
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ totalIncome, totalExpenses }) => {
  const max = Math.max(totalIncome, totalExpenses) || 1;
  const incomeHeight = (totalIncome / max) * 100;
  const expenseHeight = (totalExpenses / max) * 100;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Income vs Expenses</h2>
      <div className="flex items-end justify-center space-x-8 h-64">
        <div className="flex flex-col items-center">
          <div
            className="bg-green-500 w-16 rounded-t"
            style={{ height: `${incomeHeight}%` }}
          ></div>
          <p className="mt-2 text-sm font-medium text-gray-700">Income</p>
          <p className="text-lg font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="bg-red-500 w-16 rounded-t"
            style={{ height: `${expenseHeight}%` }}
          ></div>
          <p className="mt-2 text-sm font-medium text-gray-700">Expenses</p>
          <p className="text-lg font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
