import Vue from 'vue'

const filters = {
  monthNameShort(number) {
    if (number != 0 && !number) {
      return ''
    }

    const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return names[number]
  },
}

Vue.filter('monthNameShort', filters.monthNameShort)
