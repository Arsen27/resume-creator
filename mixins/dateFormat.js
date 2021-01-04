export default {
  methods: {
     dateFormat(date) {
      const { monthNameShort } = this.$options.filters
      
      return `${monthNameShort(date.getMonth())} ${date.getFullYear()}`
    },
    formatedDate(dateFrom, dateTo) {
      const { dateFormat } = this
      
      return dateFormat(dateFrom) + ' - ' + dateFormat(dateTo)
    },
  }
}
