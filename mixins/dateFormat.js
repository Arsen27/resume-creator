export default {
  methods: {
     dateFormat(date) {
      const { monthNameShort } = this.$options.filters
      
      return `${monthNameShort(date.getMonth())} ${date.getFullYear()}`
    },
    formatedDate({ from, to }) {
      const { dateFormat } = this
      
      return dateFormat(from) + ' - ' + dateFormat(to)
    },
  }
}
