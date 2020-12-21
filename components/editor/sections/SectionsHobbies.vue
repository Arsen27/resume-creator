<template>
  <div class="hobbies">
    <ui-text-editor v-model="hobbies" />
  </div>
</template>

<script>

import UITextEditor from '@/components/ui/UITextEditor'
import { mapFields } from 'vuex-map-fields'


export default {
  components: { UITextEditor },
  computed: {
    ...mapFields('resume', ['hobbies']),
  },
}

</script>
