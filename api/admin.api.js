import { api } from './'

export default {
  getTemplatesList() {
    return api.get('api/pdf')
  },

  getFullTemplate(id) {
    return api.get(`api/pdf/${id}`)
  },
}
