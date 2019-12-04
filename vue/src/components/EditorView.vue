<template>
  <div class="container-fluid page-body-wrapper pt-0">
    <div class="main-panel w-100 position-relative" v-if="file">
      <div v-if="!ready" class="spinner d-flex justify-content-center p-5 w-100">
        <div class="spinner-border text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <component
        :is="editorComponent"
        :file="file"
        @ready="ready = true"
        @error="handleError"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ready: false
    }
  },

  computed: {
    file () {
      return this.$store.state.File.current
    },

    editorComponent () {
      return () => import(`./${getEditorComponent(this.file.type)}.vue`)

      function getEditorComponent (type) {
        switch (type) {
          case 'document/richdoc':
            return 'DocumentEditor'

          case 'document/modoc':
            return 'DocumentProEditor'

          case 'sheet/modoc':
            return 'SheetEditor'

          case 'slide/modoc':
            return 'SlideEditor'
        }
      }
    }
  },

  methods: {
    handleError (err) {
      alert(err)
    }
  },

  mounted () {
    this.$store.dispatch('requestFile', this.$route.params.guid)
      .catch(err => alert(err))
  },

  destroyed () {
    this.$store.dispatch('setCurrentFile', null)
  }
}
</script>
