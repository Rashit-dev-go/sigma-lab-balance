import { useState } from 'react';
import { ErrorHandler, AppError } from '@/lib/error-handler';

interface AccountSetupStepProps {
  onComplete: () => void;
}

export default function AccountSetupStep({ onComplete }: AccountSetupStepProps) {
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currency: 'RUB',
  });
  const [consentData, setConsentData] = useState({
    privacyPolicy: false,
    termsOfService: false,
  });
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subSteps = [
    {
      title: 'Welcome to Balance',
      content: (
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Complete!</h3>
            <p className="text-gray-600">
              You've successfully authenticated using Yandex ID. Now let's set up your profile to get the most out of Balance.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Complete Your Profile',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Let's personalize your experience by completing your profile information.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your display name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled
                placeholder="Will be populated from Yandex ID"
              />
              <p className="text-xs text-gray-500 mt-1">Automatically populated from your Yandex account</p>
            </div>
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Currency
              </label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="RUB">Russian Ruble (RUB)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
          </form>
        </div>
      ),
    },
    {
      title: 'Security & Privacy',
      content: (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-900">Your data is secure</h4>
                <p className="text-blue-800 text-sm mt-1">
                  We use industry-standard encryption and Yandex's secure authentication to protect your financial data.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Secure authentication via Yandex ID</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">End-to-end encryption for all data</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Your data never leaves our secure servers</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Legal Agreements',
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Before you can start using Balance, you need to review and accept our legal agreements. These documents outline your rights and responsibilities when using our service.
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy-policy"
                  checked={consentData.privacyPolicy}
                  onChange={(e) => setConsentData({ ...consentData, privacyPolicy: e.target.checked })}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3">
                  <label htmlFor="privacy-policy" className="text-sm font-medium text-gray-900">
                    I have read and agree to the{' '}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Version 1.0 - Last updated October 24, 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms-of-service"
                  checked={consentData.termsOfService}
                  onChange={(e) => setConsentData({ ...consentData, termsOfService: e.target.checked })}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3">
                  <label htmlFor="terms-of-service" className="text-sm font-medium text-gray-900">
                    I have read and agree to the{' '}
                    <a
                      href="/terms-of-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Terms of Service
                    </a>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Version 1.0 - Last updated October 24, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> By accepting these agreements, you consent to the collection and processing of your financial data as described in our Privacy Policy. You can withdraw your consent at any time by contacting our support team.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = async () => {
    try {
      setError(null);
      setIsLoading(true);

      if (currentSubStep === 1) {
        // Validate form data
        if (!formData.name.trim()) {
          throw ErrorHandler.createAppError(
            'VALIDATION_ERROR',
            'Name is required',
            'Please enter your display name to continue.',
            400
          );
        }

        // Here you would typically save the profile data
        // For now, we'll just simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (currentSubStep === 3) {
        // Validate consent data
        if (!consentData.privacyPolicy || !consentData.termsOfService) {
          throw ErrorHandler.createAppError(
            'VALIDATION_ERROR',
            'All agreements must be accepted',
            'Please read and accept both the Privacy Policy and Terms of Service to continue.',
            400
          );
        }

        // Here you would record the consents
        // For now, we'll just simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (currentSubStep < subSteps.length - 1) {
        setCurrentSubStep(currentSubStep + 1);
      } else {
        // Complete account setup
        onComplete();
      }
    } catch (err) {
      const appError = ErrorHandler.handleError(err, 'AccountSetupStep.handleNext');
      setError(appError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    }
  };

  const canProceed = currentSubStep === 1 ? formData.name.trim() !== '' : 
                     currentSubStep === 3 ? (consentData.privacyPolicy && consentData.termsOfService) : true;

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

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-red-900">Error</h4>
              <p className="text-red-800 text-sm mt-1">{error.userMessage}</p>
            </div>
          </div>
        </div>
      )}

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
          disabled={currentSubStep === 0 || isLoading}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed || isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {currentSubStep === subSteps.length - 1 ? 'Complete Setup' : 'Next'}
        </button>
      </div>
    </div>
  );
}
