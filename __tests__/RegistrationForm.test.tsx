import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegistrationForm from '../components/RegistrationForm'

// Mock fetch
global.fetch = jest.fn()

describe('RegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders registration form', () => {
    render(<RegistrationForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/подтвердите пароль/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument()
  })

  it('validates email format', async () => {
    render(<RegistrationForm />)
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /зарегистрироваться/i })

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Введите корректный email')).toBeInTheDocument()
    })
  })

  it('validates password strength', async () => {
    render(<RegistrationForm />)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/пароль/i)
    const submitButton = screen.getByRole('button', { name: /зарегистрироваться/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'weak' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/пароль должен содержать/i)).toBeInTheDocument()
    })
  })

  it('validates password confirmation', async () => {
    render(<RegistrationForm />)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/пароль/i)
    const confirmInput = screen.getByLabelText(/подтвердите пароль/i)
    const submitButton = screen.getByRole('button', { name: /зарегистрироваться/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } })
    fireEvent.change(confirmInput, { target: { value: 'DifferentPass123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument()
    })
  })

  it('submits form successfully', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Регистрация успешна!' })
    } as Response)

    render(<RegistrationForm />)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/пароль/i)
    const confirmInput = screen.getByLabelText(/подтвердите пароль/i)
    const submitButton = screen.getByRole('button', { name: /зарегистрироваться/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } })
    fireEvent.change(confirmInput, { target: { value: 'StrongPass123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', password: 'StrongPass123' })
      }))
    })

    await waitFor(() => {
      expect(screen.getByText('Регистрация успешна! Проверьте email для подтверждения.')).toBeInTheDocument()
    })
  })
})
