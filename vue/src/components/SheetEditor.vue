<template>
  <div class="row d-flex flex-grow-1">
    <div class="col-lg-12 grid-margin stretch-card m-0">
      <div class="editor-container" ref="editorRef" />
    </div>
  </div>
</template>

<script>
import ShimoCabinet from 'shimo-sdk-cabinet/dist/sheet.min'

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
.sm-editor {
  /* 确保编辑器符合容器尺寸，底部工具条正常显示 */
  flex: 1;
  height: calc(100vh - 140px);
}

.confirm-dialog-footer {
  box-sizing: content-box;
}
</style>
