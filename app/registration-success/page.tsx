'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to onboarding after a brief delay to show success message
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-8">Регистрация успешна!</h1>
        <p className="text-lg text-center mb-4">Ваш email подтвержден. Теперь вы можете начать настройку аккаунта.</p>
        <p className="text-sm text-gray-600">Перенаправление на страницу настройки...</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    </main>
  );
}
