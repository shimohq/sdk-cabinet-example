<template>
  <div class="row d-flex flex-grow-1">
    <div class="col-lg-12 grid-margin stretch-card m-0 flex-column-reverse position-relative">
      <div class="editor-container d-flex flex-grow-1 flex-column" ref="editorRef" />
    </div>
  </div>
</template>

<script>
import ShimoCabinet from 'shimo-sdk-cabinet/dist/slide.min'

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

      container: this.$refs.editorRef
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
