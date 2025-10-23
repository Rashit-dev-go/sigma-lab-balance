import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionForm from '@/components/TransactionForm';

// Mock fetch
global.fetch = jest.fn();

describe('TransactionForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<TransactionForm />);

    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Transaction' })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<TransactionForm />);

    const submitButton = screen.getByRole('button', { name: 'Save Transaction' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Amount must be a positive number')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid date not in the future')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
  });

  it('validates positive amount', async () => {
    render(<TransactionForm />);

    const amountInput = screen.getByLabelText('Amount');
    fireEvent.change(amountInput, { target: { value: '-10' } });

    const submitButton = screen.getByRole('button', { name: 'Save Transaction' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Amount must be a positive number')).toBeInTheDocument();
    });
  });

  it('validates date not in future', async () => {
    render(<TransactionForm />);

    const dateInput = screen.getByLabelText('Date');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    fireEvent.change(dateInput, { target: { value: futureDate.toISOString().split('T')[0] } });

    const submitButton = screen.getByRole('button', { name: 'Save Transaction' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid date not in the future')).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '1' }),
    });

    render(<TransactionForm />);

    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test transaction' } });
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'expense' } });

    const submitButton = screen.getByRole('button', { name: 'Save Transaction' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 100,
          date: '2023-01-01',
          description: 'Test transaction',
          type: 'expense',
        }),
      });
      expect(screen.getByText('Transaction saved successfully!')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'API Error' }),
    });

    render(<TransactionForm />);

    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test transaction' } });
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'expense' } });

    const submitButton = screen.getByRole('button', { name: 'Save Transaction' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });
});
