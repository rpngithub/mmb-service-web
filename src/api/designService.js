import client from './axiosClient'

export const getUserDesigns = (params) => client.get('/user-designs', { params })
export const getUserDesignById = (id) => client.get(`/user-designs/${id}`)
export const uploadDesign = (formData) =>
  client.post('/user-designs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const updateUserDesign = (id, data) => client.put(`/user-designs/${id}`, data)
export const deleteUserDesign = (id) => client.delete(`/user-designs/${id}`)
export const serveDesignFile = (id) => client.get(`/user-designs/${id}/file`)
export const viewDesignFile = (id) => client.get(`/user-designs/${id}/view`)
