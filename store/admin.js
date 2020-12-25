import { getField, updateField } from 'vuex-map-fields'
import { adminApi } from '@/api'

export default {
  state: {
    template: {},
    templates: []
  },

  getters: {
    template: state => state.template,
    templates: state => state.templates,
    templatesList: state => state.templatesList,

    getField,
  },

  mutations: {
    setTemplates(state, templates) {
      state.templates = templates;
    },
    setTemplate(state, template) {
      state.template = template;
    }
  },

  actions: {
    loadTemplates({ commit }) {
      adminApi
        .getTemplatesList()
        .then(res => {
          const templates = res.data.data
          commit("setTemplates", templates)
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

    updateField,
  }
};