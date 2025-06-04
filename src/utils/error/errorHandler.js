import { toast } from 'react-toastify';

const firebaseErrorMessages = {
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/invalid-credential': 'Invalid login credentials.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
};

const getFirebaseErrorMessage = (code) => firebaseErrorMessages[code];
export const handleFirebaseError = (error, context = 'An error occurred') => {
  const message = getFirebaseErrorMessage(error.code) || error.message;
  toast.error(`${context}: ${message}`);
  console.error('❌', context, '-', error.code ?? error.message);
};

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

// errorHandler.js
export const errorHandler = {
  general: handleError,
  firebase: handleFirebaseError,
  validation: handleValidationErrors,
};

export default errorHandler;
