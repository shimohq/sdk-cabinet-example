<template>
  <div class="row d-flex flex-grow-1 document">
    <div class="col-lg-12 grid-margin stretch-card m-0 flex-column-reverse position-relative">
      <div class="editor-container">
        <div class="editor-toolbar" />
        <div class="editor-body position-relative row d-flex flex-grow-1 justify-content-center">
          <div class="editor flex-grow-1" ref="editorRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShimoCabinet from 'shimo-sdk-cabinet/dist/document.min'

export default {
  props: {
    file: {
      type: Object,
      required: true
    }
  },

  mounted () {
    const file = this.file

    this.cabinet = new ShimoCabinet({
      fileGuid: file.guid,
      entrypoint: file.config.entrypoint,
      token: file.config.token,

      container: this.$refs.editorRef,

      editorOptions: {
        isMobile: this.$store.state.isMobile
      }
    })
    this.cabinet.render()
      .then(
        () => this.$emit('ready'),
        err => this.$emit('error', err)
      )
  },

  destroyed () {
    if (this.cabinet) {
      this.cabinet.destroy()
    }
  }
}
</script>

<style>
.mobile-view .document .sm-editor-scroller {
  height: calc(100vh - 60px)!important;
}
</style>
