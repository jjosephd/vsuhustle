import { toast } from 'react-toastify';

/**
 * Logs and displays an error message in a toast notification.
 *
 * @param {string | Error} error - The error message to display.
 * @param {string} [context] - An optional string to prefix the error message with.
 */
export const handleError = (error, context = '') => {
  // If the error is a string, just use it as is.
  // Otherwise, use the error message property from the Error object.
  const message = typeof error === 'string' ? error : error?.message;

  // If a context string is provided, prepend it to the error message with a colon.
  // This helps identify where the error came from.
  const formatted = context ? `${context}: ${message}` : message;

  // Log the formatted error message to the console.
  console.error(formatted);

  // Display the formatted error message in a toast notification.
  // This will show up as a red, dismissible notification at the top of the page.
  toast.error(formatted);
};

export function handleValidationErrors(errors) {
  const msg = 'Unable to submit listing. Please check the form for errors.';
  toast.error(msg);
}
