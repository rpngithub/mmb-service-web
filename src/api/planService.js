import client from './axiosClient'

export const getPlans = () => client.get('/plans')
export const getPlanById = (id) => client.get(`/plans/${id}`)
