import { useState } from 'react';

interface AICategorizationStepProps {
  onComplete: () => void;
}

export default function AICategorizationStep({ onComplete }: AICategorizationStepProps) {
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const sampleTransactions = [
    {
      id: '1',
      description: 'Grocery Store Purchase',
      amount: -85.50,
      aiCategory: 'Food & Dining',
      confidence: 0.95,
    },
    {
      id: '2',
      description: 'Monthly Rent Payment',
      amount: -1200.00,
      aiCategory: 'Housing',
      confidence: 0.98,
    },
    {
      id: '3',
      description: 'Coffee Shop',
      amount: -4.75,
      aiCategory: 'Food & Dining',
      confidence: 0.87,
    },
    {
      id: '4',
      description: 'Salary Deposit',
      amount: 2500.00,
      aiCategory: 'Income',
      confidence: 0.99,
    },
  ];

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Income',
    'Other',
  ];

  const subSteps = [
    {
      title: 'How AI Categorization Works',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Balance uses artificial intelligence to automatically categorize your transactions based on their descriptions.
            This saves you time and helps you understand your spending patterns.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-900">Smart Categorization</h4>
                <p className="text-blue-800 text-sm mt-1">
                  Our AI analyzes transaction descriptions, merchant names, and patterns to suggest the most appropriate category.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Learns from your transaction patterns</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Provides confidence scores for suggestions</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">You can always override AI suggestions</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Sample AI Categorization',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Here are some sample transactions with AI-generated categories. Notice how the AI analyzes the description to suggest the right category.
          </p>

          <div className="space-y-4">
            {sampleTransactions.map((transaction) => (
              <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                    <p className="text-sm text-gray-600">
                      Amount: <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">{transaction.aiCategory}</div>
                    <div className="text-xs text-gray-500">{Math.round(transaction.confidence * 100)}% confidence</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">AI Suggestion</span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200">
                      ✓ Accept
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200">
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Override AI Suggestions',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Sometimes the AI might not get it exactly right. You can always override the AI's suggestion and choose a different category.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h4 className="font-medium text-yellow-900">Your Overrides Help Improve AI</h4>
                <p className="text-yellow-800 text-sm mt-1">
                  When you correct AI categorizations, it helps the system learn and provide better suggestions for future transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-gray-900">ATM Withdrawal</h4>
                <p className="text-sm text-gray-600">Amount: -$100.00</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-red-600 line-through">Banking</div>
                <div className="text-sm font-medium text-blue-600">Cash Withdrawal</div>
                <div className="text-xs text-gray-500">Your correction</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Select a different category for this transaction:
          </p>

          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-3 text-sm border rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'AI Accuracy Tracking',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Balance tracks how accurate the AI categorization is for your transactions. This helps improve the system over time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">Overall Accuracy</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">127</div>
              <div className="text-sm text-gray-600">AI Corrections</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">23</div>
              <div className="text-sm text-gray-600">Categories Learned</div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">How Accuracy Improves</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• <strong>Pattern Recognition:</strong> AI learns from your transaction patterns and merchant names</p>
              <p>• <strong>User Corrections:</strong> Your overrides teach the system better categorization rules</p>
              <p>• <strong>Confidence Scoring:</strong> Transactions with uncertain categorizations are flagged for review</p>
              <p>• <strong>Continuous Learning:</strong> The system improves with each transaction you add</p>
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
      // Complete AI categorization tutorial
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    }
  };

  const canProceed = currentSubStep !== 2 || selectedCategory !== '';

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
