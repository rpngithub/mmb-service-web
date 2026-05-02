import client from './axiosClient'

export const signupStep1 = (data) => client.post('/auth/signup', data)
export const signupStep2 = (data) => client.post('/auth/signup', data)

export const signin = (data) => client.post('/auth/signin', data)

export const signinMobileStep1 = (data) => client.post('/auth/signin-mobile', data)
export const signinMobileStep2 = (data) => client.post('/auth/signin-mobile', data)

export const refreshToken = () => client.post('/auth/refresh')

export const logout = () => client.post('/auth/logout')
