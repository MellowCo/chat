import { app } from '../../main'
export default {
  async get ({ url, data }) {
    const res = await app.$u.get(url, data)
    return res
  },

  async post ({ url, data }) {
    const res = await app.$u.post(url, data)
    return res
  }
}
