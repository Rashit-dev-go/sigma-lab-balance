import logger from './logger';

export interface AppError {
  code: string;
  message: string;
  userMessage: string;
  statusCode: number;
}

export class AppError extends Error implements AppError {
  code: string;
  userMessage: string;
  statusCode: number;

  constructor(code: string, message: string, userMessage: string, statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.userMessage = userMessage;
    this.statusCode = statusCode;
  }
}

export class ErrorHandler {
  static handleError(error: unknown, context?: string): AppError {
    logger.error('Error occurred', { error, context });

    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return new AppError(
          'NETWORK_ERROR',
          error.message,
          'Network connection error. Please check your internet connection and try again.',
          0
        );
      }

      if (error.message.includes('validation') || error.message.includes('required')) {
        return new AppError(
          'VALIDATION_ERROR',
          error.message,
          'Please check your input and try again.',
          400
        );
      }

      // Generic error
      return new AppError(
        'UNKNOWN_ERROR',
        error.message,
        'An unexpected error occurred. Please try again.',
        500
      );
    }

    // Handle non-Error objects
    return new AppError(
      'UNKNOWN_ERROR',
      String(error),
      'An unexpected error occurred. Please try again.',
      500
    );
  }

  static createAppError(
    code: string,
    message: string,
    userMessage: string,
    statusCode: number = 500
  ): AppError {
    return new AppError(code, message, userMessage, statusCode);
  }

  static handleFormValidation(errors: Record<string, string[]>): AppError {
    const firstError = Object.values(errors)[0]?.[0] || 'Validation failed';
    return new AppError(
      'FORM_VALIDATION_ERROR',
      `Form validation failed: ${firstError}`,
      firstError,
      400
    );
  }
}

// Common error types
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

// User-friendly error messages
export const ErrorMessages = {
  [ErrorCodes.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ErrorCodes.NETWORK_ERROR]: 'Network connection error. Please check your internet connection and try again.',
  [ErrorCodes.AUTHENTICATION_ERROR]: 'Please sign in to continue.',
  [ErrorCodes.AUTHORIZATION_ERROR]: 'You do not have permission to perform this action.',
  [ErrorCodes.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorCodes.SERVER_ERROR]: 'Server error. Please try again later.',
  [ErrorCodes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
} as const;
