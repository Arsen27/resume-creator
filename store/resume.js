import { getField, updateField } from 'vuex-map-fields'
import { saveAs } from "file-saver"
import { api } from '@/api'


let sectionsInitial = [
  {
    id: 0,
    key: "personalDetails",
    component: "sections-personal-details",
    fixed: false,
    title: "Personal Details",
    description: ""
  },
  {
    id: 1,
    key: "professionalSummary",
    component: "sections-professional-summary",
    fixed: false,
    title: "Professional Summary",
    description: "Include 2-3 clear sentences about your overall experience"
  },
  {
    id: 2,
    key: "workExperiences",
    component: "sections-employment-history",
    fixed: false,
    title: "Employment History",
    description:
      "Include your last 10 years of relevant experience and dates in this section. List your most recent position first."
  },
  {
    id: 3,
    key: "education",
    component: "sections-education",
    fixed: false,
    title: "Education",
    description:
      "If relevant, include your most recent educational achievements and the dates here"
  },
  {
    id: 4,
    key: 'links',
    component: "sections-links",
    fixed: false,
    title: "Websites & Social Links",
    description: "You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website"
  },
  {
    id: 5,
    key: 'skills',
    component: "sections-skills",
    fixed: false,
    title: "Skills",
    description: ""
  }
];

export default {
  namespaced: true,

  state: () => ({
    sections: [...sectionsInitial],

    title: "Your resume title",
    wantedJob: "",
    icon: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    professionalSummary: "",
    workExperiences: [],
    education: [],
    links: [],
    skills: [],
    custom: {},
    activities: [],
    courses: [],
    hobbies: "",
    internships: [],
    languages: [],
    references: []
  }),

  getters: {
    state: state => state,
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
    sections: state => state.sections,

    getField
  },

  mutations: {
    addItem(state, [sectionName, item]) {
      const section = state[sectionName];
      const id = section.length;

      if (!item) {
        item = Object.assign({}, itemTemplates[sectionName]);
      }

      if (id > -1) {
        item.id = id;
        state[sectionName].push(item);
      }
    },
    removeItem(state, [sectionName, itemId]) {
      const section = state[sectionName];

      section.forEach((item, i) => {
        if (item.id === itemId) {
          section.splice(i, 1);
        }
      });
    },
    updateCustomSection(state, [id, value]) {
      state.custom[id] = value;
    },
    addSection(state, section) {
      const id = state.sections.length - 1;
      let { name, component, key } = section;

      state.sections.push({
        id,
        component: component,
        fixed: false,
        title: name,
        description: "",
        key
      });
    },
    removeSection(state, sectionId) {
      state.sections.forEach((section, i) => {
        if (section.id === sectionId) {
          state.sections.splice(i, 1);
        }
      });
    },

    setIcon(state, value) {
      state.icon = value
    },


    updateField
  },

  actions: {
    initItems({ commit, getters }, sectionName) {
      if (getters[sectionName]) {
        if (!getters[sectionName].length) {
          commit("addItem", [sectionName]);
        }
      }
    }
  }
};

const itemTemplates = {
  workExperiences: {
    title: "",
    employer: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    city: "",
    description: ""
  },
  education: {
    title: "",
    school: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    city: "",
    description: ""
  },
  links: {
    label: "",
    link: ""
  },
  skills: {
    name: "",
    level: "Expert"
  },
  activities: {
    title: "",
    employer: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    city: "",
    description: ""
  },
  references: {
    name: "",
    company: "",
    phone: "",
    email: ""
  },
  courses: {
    name: "",
    institution: "",
    dateFrom: new Date(),
    dateTo: new Date()
  },
  internships: {
    title: "",
    employer: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    city: "",
    description: ""
  },
  languages: {
    name: "",
    level: ""
  }
};
