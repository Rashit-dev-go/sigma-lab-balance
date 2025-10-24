import { useState } from 'react';

interface TransactionEntryStepProps {
  onComplete: () => void;
}

export default function TransactionEntryStep({ onComplete }: TransactionEntryStepProps) {
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [sampleTransaction, setSampleTransaction] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense',
  });

  const subSteps = [
    {
      title: 'Understanding Transactions',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Transactions are the foundation of your financial tracking. Each transaction represents money coming in (income) or going out (expenses).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h4 className="font-medium text-green-900">Income</h4>
              </div>
              <p className="text-green-800 text-sm">
                Money you receive: salary, freelance work, investments, gifts, etc.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <h4 className="font-medium text-red-900">Expenses</h4>
              </div>
              <p className="text-red-800 text-sm">
                Money you spend: groceries, rent, entertainment, bills, etc.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Transaction Form Fields',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Every transaction needs these key pieces of information to be properly tracked.
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Amount</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    The monetary value of the transaction. Use positive numbers only - the type field determines if it's income or expense.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Date</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    When the transaction occurred. This helps with accurate financial reporting and trends.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Description</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    A clear description of what the transaction was for. Be specific to help with categorization.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Type</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Whether this is money coming in (income) or going out (expense).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Try Adding a Transaction',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Now let's practice adding a transaction. Fill out the form below with a real or sample transaction.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Sample Transaction Form</h4>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={sampleTransaction.amount}
                    onChange={(e) => setSampleTransaction({ ...sampleTransaction, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={sampleTransaction.date}
                    onChange={(e) => setSampleTransaction({ ...sampleTransaction, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <input
                  type="text"
                  value={sampleTransaction.description}
                  onChange={(e) => setSampleTransaction({ ...sampleTransaction, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What was this transaction for?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="income"
                      checked={sampleTransaction.type === 'income'}
                      onChange={(e) => setSampleTransaction({ ...sampleTransaction, type: e.target.value as 'income' | 'expense' })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Income</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="expense"
                      checked={sampleTransaction.type === 'expense'}
                      onChange={(e) => setSampleTransaction({ ...sampleTransaction, type: e.target.value as 'income' | 'expense' })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Expense</span>
                  </label>
                </div>
              </div>
            </form>

            <div className="mt-4 p-3 bg-white border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Preview:</strong> {sampleTransaction.type === 'income' ? '+' : '-'}${sampleTransaction.amount || '0.00'} - {sampleTransaction.description || 'No description'} ({sampleTransaction.date})
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSubStep < subSteps.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
    } else {
      // Complete transaction entry tutorial
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    }
  };

  const canProceed = currentSubStep !== 2 || (
    sampleTransaction.amount &&
    sampleTransaction.description &&
    sampleTransaction.date
  );

  return (
    <div>
      {/* Sub-step indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {subSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <= currentSubStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {subSteps[currentSubStep].title}
        </h3>
        {subSteps[currentSubStep].content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentSubStep === 0}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentSubStep === subSteps.length - 1 ? 'Complete Tutorial' : 'Next'}
        </button>
      </div>
    </div>
  );
}
