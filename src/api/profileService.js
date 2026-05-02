import client from './axiosClient'

export const getProfile = () => client.get('/profile')
export const updateProfile = (data) => client.put('/profile', data)
export const updateMobileStep1 = (data) => client.put('/profile/mobile', data)
export const updateMobileStep2 = (data) => client.put('/profile/mobile', data)
