'use client'

import { useState, useEffect } from 'react'

export default function TransactionForm() {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('')
  const [suggestedCategory, setSuggestedCategory] = useState('')
  const [errors, setErrors] = useState<{amount?: string, date?: string, description?: string, type?: string, category?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const validateAmount = (amount: string) => {
    const num = parseFloat(amount)
    return !isNaN(num) && num > 0
  }

  const validateDate = (date: string) => {
    const d = new Date(date)
    return d instanceof Date && !isNaN(d.getTime()) && d <= new Date()
  }

  useEffect(() => {
    if (description && type && amount && validateAmount(amount)) {
      fetch('/api/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          type
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.category) {
            setSuggestedCategory(data.category)
            if (!category) setCategory(data.category)
          }
        })
        .catch(err => console.error('Categorization error:', err))
    }
  }, [description, type, amount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setMessage('')

    let hasErrors = false
    const newErrors: typeof errors = {}

    if (!validateAmount(amount)) {
      newErrors.amount = 'Amount must be a positive number'
      hasErrors = true
    }

    if (!validateDate(date)) {
      newErrors.date = 'Please enter a valid date not in the future'
      hasErrors = true
    }

    if (description.trim().length === 0) {
      newErrors.description = 'Description is required'
      hasErrors = true
    }

    if (!['income', 'expense'].includes(type)) {
      newErrors.type = 'Please select a valid type'
      hasErrors = true
    }

    if (!['personal', 'business'].includes(category)) {
      newErrors.category = 'Please select a valid category'
      hasErrors = true
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          date,
          description,
          type,
          category,
          suggestedCategory,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Transaction saved successfully!')
        setAmount('')
        setDate('')
        setDescription('')
        setType('expense')
        setCategory('')
        setSuggestedCategory('')
      } else {
        setMessage(data.error || 'Error saving transaction')
      }
    } catch (error) {
      setMessage('Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        {suggestedCategory && <p className="text-sm text-gray-500">Suggested: {suggestedCategory}</p>}
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select category</option>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Transaction'}
      </button>

      {message && <p className="mt-4 text-sm text-center text-green-600">{message}</p>}
    </form>
  )
}