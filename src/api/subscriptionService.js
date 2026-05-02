import client from './axiosClient'

export const activateFreeTrial = () => client.post('/subscriptions/free-trial')
export const createCheckout = (plan_id) => client.post('/subscriptions/checkout', { plan_id })
export const verifyPayment = (data) => client.post('/subscriptions/verify-payment', data)
export const getSubscriptions = () => client.get('/subscriptions')
export const getSubscriptionById = (id) => client.get(`/subscriptions/${id}`)
