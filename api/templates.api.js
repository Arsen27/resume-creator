import { api } from '.'

export default {
  getTemplatesList() {
    return api.get('api/pdf')
  },

  getFullTemplate(id) {
    return api.get(`api/pdf/${id}`)
  },

  updateTemplate(id, data) {
    return api.put(`api/pdf/${id}`, data)
  },

  createTemplate(data) {
    return api.post(`api/pdf/`, data)
  },

  deleteTemplate(id) {
    return api.delete(`api/pdf/${id}`)
  },
}
