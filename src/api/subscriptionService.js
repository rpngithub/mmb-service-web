import client from './axiosClient'

export const activateFreeTrial = () => client.post('/subscriptions/free-trial')
export const createCheckout = (plan_id, plan_duration_unit) => client.post('/subscriptions/checkout', { plan_id, plan_duration_unit })
export const verifyPayment = (data) => client.post('/subscriptions/verify-payment', data)
export const getSubscriptions = () => client.get('/subscriptions')
export const getSubscriptionById = (id) => client.get(`/subscriptions/${id}`)
