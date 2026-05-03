import client from './axiosClient'

export const getBusinesses = () => client.get('/businesses')
export const getBusinessById = (id) => client.get(`/businesses/${id}`)
