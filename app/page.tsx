import RegistrationForm from '@/components/RegistrationForm'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <nav className="mb-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 underline">
          Dashboard
        </Link>
      </nav>
      <h1 className="text-4xl font-bold mb-8">Регистрация пользователя</h1>
      <RegistrationForm />
    </main>
  )
}
