export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile)

export const isValidOtp = (otp) => /^\d{6}$/.test(otp)
