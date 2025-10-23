import { categorizeTransaction } from '@/lib/yandex-gpt';

// Mock fetch
global.fetch = jest.fn();

describe('categorizeTransaction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.YANDEX_IAM_TOKEN = 'test-token';
    process.env.YANDEX_FOLDER_ID = 'test-folder';
  });

  it('should return correct category for valid response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        result: {
          alternatives: [
            {
              message: {
                text: 'personal',
              },
            },
          ],
        },
      }),
    });

    const result = await categorizeTransaction('Grocery shopping', 50, 'expense');
    expect(result).toBe('personal');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw error for invalid category', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        result: {
          alternatives: [
            {
              message: {
                text: 'invalid',
              },
            },
          ],
        },
      }),
    });

    await expect(categorizeTransaction('Test', 100, 'income')).rejects.toThrow('Invalid category from AI');
  });

  it('should throw error if credentials missing', async () => {
    delete process.env.YANDEX_IAM_TOKEN;
    await expect(categorizeTransaction('Test', 100, 'income')).rejects.toThrow('YandexGPT credentials not configured');
  });
});
