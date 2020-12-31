import { getField, updateField } from 'vuex-map-fields'
import { adminApi } from '@/api'

export default {
  state: {
    loading: false,
    
    template: {},
    templates: [],

    creator: {
      name: '',
      code: '',
    }
  },

  getters: {
    loading: state => state.loading,

    template: state => state.template,
    templates: state => state.templates,

    getField,
  },

  mutations: {
    setTemplates(state, templates) {
      state.templates = templates
    },
    setTemplate(state, template) {
      state.template = template
    },

    setLoading(state, loading) {
      state.loading = loading
    },

    updateField,
  },

  actions: {
    loadTemplates({ commit }) {
      commit('setLoading', true)

      adminApi
        .getTemplatesList()
        .then(res => {
          const templates = res.data.data
          commit("setTemplates", templates)

          commit("setLoading", false);
        })
        .catch(error => {
          console.error(error);
        });
    },

    loadTemplate({ commit }, id) {
      commit("setTemplate", {});

      adminApi
        .getFullTemplate(id)
        .then(res => {
          const template = res.data
          commit("setTemplate", template)
        })
        .catch(error => {
          console.error(error);
        });
    },
  }
};