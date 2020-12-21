import { getField, updateField } from 'vuex-map-fields'

export default {
  namespaced: true,

  state: {
    wantedJob: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    professionalSummary: '',
    workExperiences: [],
    education: [],
    links: [],
    skills: [],
    custom: [],
    activities: [],
    courses: [],
    hobbies: '',
    internships: [],
    languages: [],
    references: []
  },

  getters: {
    wantedJob: state => state.wantedJob,
    firstName: state => state.firstName,
    lastName: state => state.lastName,
    email: state => state.email,
    phone: state => state.phone,
    workExperiences: state => state.workExperiences,
    education: state => state.education,
    links: state => state.links,
    skills: state => state.skills,
    activities: state => state.activities,
    courses: state => state.courses,
    hobbies: state => state.hobbies,
    internships: state => state.internships,
    languages: state => state.languages,
    references: state => state.references,

    getField
  },

  mutations: {
    addItem(state, [sectionName, item]) {
      const section = state[sectionName]
      const id = section.length

      if (!item) {
        item = Object.assign({}, itemTemplates[sectionName])
      }

      if (id > -1) {
        item.id = id
        state[sectionName].push(item)
      }
    },
    removeItem(state, [sectionName, itemId]) {
      const section = state[sectionName]

      section.forEach((item, i) => {
        if (item.id === itemId) {
          section.splice(i, 1)
        }
      });
    },

    updateField
  },

  actions: {
    initItems({ commit, getters }, sectionName) {      
      if (getters[sectionName]) {
        if (!getters[sectionName].length) {
          commit("addItem", [sectionName])
        }
      }
    },
  }
}

const itemTemplates = {
  workExperiences: {
    title: '',
    employer: '',
    date: {
      from: new Date(),
      to: new Date()
    },
    city: '',
    description: ''
  },
  education: {
    title: '',
    school: '',
    date: {
      from: new Date(),
      to: new Date()
    },
    city: '',
    description: ''
  },
  links: {
    label: '',
    link: '',
  },
  skills: {
    name: '',
    level: 'Expert',
  },
  activities: {
    title: '',
    employer: '',
    date: {
      from: new Date(),
      to: new Date(),
    },
    city: '',
    description: '',
  },
  references: {
    name: '',
    company: '',
    phone: '',
    email: '',
  },
  courses: {
    name: '',
    institution: '',
    date: {
      from: new Date(),
      to: new Date(),
    },
  },
  internships: {
    title: '',
    employer: '',
    date: {
      from: new Date(),
      to: new Date()
    },
    city: '',
    description: ''
  },
  languages: {
    name: '',
    level: '',
  },
}
