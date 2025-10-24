'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountSetupStep from '@/components/onboarding/AccountSetupStep';
import TransactionEntryStep from '@/components/onboarding/TransactionEntryStep';
import AICategorizationStep from '@/components/onboarding/AICategorizationStep';

type OnboardingStep = 'account-setup' | 'transaction-entry' | 'ai-categorization' | 'complete';

interface StepInfo {
  id: OnboardingStep;
  title: string;
  description: string;
  component: React.ComponentType<{ onComplete: () => void }>;
}

const steps: StepInfo[] = [
  {
    id: 'account-setup',
    title: 'Account Setup',
    description: 'Complete your profile and learn about authentication',
    component: AccountSetupStep,
  },
  {
    id: 'transaction-entry',
    title: 'Transaction Entry',
    description: 'Learn how to add your first transactions',
    component: TransactionEntryStep,
  },
  {
    id: 'ai-categorization',
    title: 'AI-Powered Categorization',
    description: 'Understand how AI helps categorize your transactions',
    component: AICategorizationStep,
  },
];

export default function OnboardingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<OnboardingStep>>(new Set());
  const router = useRouter();

  const currentStep = steps[currentStepIndex];
  const CurrentStepComponent = currentStep.component;

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep.id]));

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Onboarding complete - redirect to dashboard
      router.push('/dashboard');
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStepIndex || completedSteps.has(steps[stepIndex].id)) {
      setCurrentStepIndex(stepIndex);
    }
  };

  const progress = ((currentStepIndex + (completedSteps.size > currentStepIndex ? 1 : 0)) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Balance! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Let's get you set up to manage your finances effectively
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                disabled={!completedSteps.has(step.id) && index > currentStepIndex}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all ${
                  index === currentStepIndex
                    ? 'bg-blue-600 text-white shadow-lg'
                    : completedSteps.has(step.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } ${!completedSteps.has(step.id) && index > currentStepIndex ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                {completedSteps.has(step.id) ? '✓' : index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Step {currentStepIndex + 1}: {currentStep.title}
            </h2>
            <p className="text-gray-600">{currentStep.description}</p>
          </div>

          <CurrentStepComponent onComplete={handleStepComplete} />
        </div>

        {/* Step Indicators */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full ${
                  index < currentStepIndex || completedSteps.has(step.id)
                    ? 'bg-green-500'
                    : index === currentStepIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
