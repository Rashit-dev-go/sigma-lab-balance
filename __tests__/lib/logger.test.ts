import winston from 'winston';
import logger from '../../lib/logger';

// Mock winston
jest.mock('winston', () => ({
  createLogger: jest.fn(),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    errors: jest.fn(),
    json: jest.fn(),
    colorize: jest.fn(),
    simple: jest.fn(),
  },
  transports: {
    File: jest.fn(),
    Console: jest.fn(),
  },
}));

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create logger with correct configuration', () => {
    expect(winston.createLogger).toHaveBeenCalledWith({
      level: 'info',
      format: expect.any(Object), // combine mock
      defaultMeta: { service: 'balance-app' },
      transports: expect.arrayContaining([
        expect.any(Object), // File transport for error.log
        expect.any(Object), // File transport for combined.log
      ]),
    });
  });

  it('should add console transport in development', () => {
    // Since NODE_ENV is not set, it should add console
    const mockLogger = (winston.createLogger as jest.Mock).mock.results[0].value;
    expect(mockLogger.add).toHaveBeenCalledWith(
      expect.objectContaining({
        format: expect.any(Object),
      })
    );
  });

  it('should log messages', () => {
    const mockLogger = (winston.createLogger as jest.Mock).mock.results[0].value;

    logger.info('Test message', { key: 'value' });

    expect(mockLogger.info).toHaveBeenCalledWith('Test message', { key: 'value' });
  });
});
