import client from './axiosClient'
import { serialize } from 'object-to-formdata'

export const getProfile = () => client.get('/profile')
export const updateProfile = (data, files = []) => {
  const fd = serialize(data, { indices: true, nullsAsUndefineds: false, booleansAsIntegers: false })
  files.forEach((file) => fd.append('files', file))
  return client.put('/profile', fd)
}
export const updateMobileStep1 = (data) => client.put('/profile/mobile', data)
export const updateMobileStep2 = (data) => client.put('/profile/mobile', data)
