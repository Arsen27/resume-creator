import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,

  state: {
    sections: [
      {
        id: 0,
        component: "sections-personal-details",
        fixed: false,
        title: "Personal Details",
        description: "",
      },
      {
        id: 1,
        component: "sections-professional-summary",
        fixed: false,
        title: "Professional Summary",
        description: "Include 2-3 clear sentences about your overall experience",
      },
      {
        id: 2,
        component: "sections-employment-history",
        fixed: false,
        title: "Employment History",
        description: "Include your last 10 years of relevant experience and dates in this section. List your most recent position first.",
      },
      {
        id: 3,
        component: "sections-education",
        fixed: false,
        title: "Education",
        description: "If relevant, include your most recent educational achievements and the dates here",
      },
      {
        id: 4,
        component: "sections-links",
        fixed: false,
        title: "Websites & Social Links",
        description: "You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website",
      },
      {
        id: 5,
        component: "sections-skills",
        fixed: false,
        title: "Skills",
        description: "",
      }
    ], 
  },

  getters: {
    getField,
  },

  mutations: {
    addSection(state, section) {
      const id = state.sections.length - 1
      let { name, component } = section

      state.sections.push({
        id,
        component: component,
        fixed: false,
        title: name,
        description: '',
      })
    },
    removeSection(state, sectionId) {
      state.sections.forEach((section, i) => {
        if (section.id === sectionId) {
          state.sections.splice(i, 1)
        }
      })
    },

    updateField,
  },
};