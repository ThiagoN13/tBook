import axios from 'axios'

export default {
  async login ({ commit }, payload) {
    const result = await axios.post('/auth/login', payload)

    commit('SET_AUTH', result)
  },

  async create ({ commit }, payload) {
    const result = await axios.post('/auth/register', payload)

    commit('SET_USER', result)
  }
}
