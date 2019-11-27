import axios from 'axios'

export default {
  async get ({ commit }, payload) {
    const result = await axios.get('/contacts', payload)

    commit('SET_CONTACTS', result)
  }
}
