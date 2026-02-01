/**
 * Password Validation Utilities
 *
 * Provides functions to validate password requirements for signup and password reset flows.
 * Requirements: lowercase, uppercase, digit, special symbol, minimum 8 characters
 */

export const hasLowercase = (password: string): boolean => /[a-z]/.test(password);

export const hasUppercase = (password: string): boolean => /[A-Z]/.test(password);

export const hasDigit = (password: string): boolean => /\d/.test(password);

export const hasSymbol = (password: string): boolean => /[!@#$%^&*(),.?":{}|<>]/.test(password);

export const hasMinLength = (password: string, minLength = 8): boolean =>
	password.length >= minLength;

/**
 * Checks if a password meets all validation requirements
 * @param password - The password string to validate
 * @returns true if password is valid, false otherwise
 */
export const isPasswordValid = (password: string): boolean => {
	return (
		hasLowercase(password) &&
		hasUppercase(password) &&
		hasDigit(password) &&
		hasSymbol(password) &&
		hasMinLength(password)
	);
};
