import client from './axiosClient'

export const submitInquiry = (data) => client.post('/inquiries', data)
