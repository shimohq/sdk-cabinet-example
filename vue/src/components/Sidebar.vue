<template>
  <nav class="sidebar sidebar-offcanvas" id='sidebar'>
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to='/'>
          <span class="menu-title">文件列表</span>
        </router-link>
      </li>
      <li class="nav-item">
        <span class="nav-link">
          <span class="menu-title">新建文档</span>
        </span>
        <div>
          <ul class="nav sub-menu">
            <li class="nav-item">
              <button type='button' class="nav-link majestic-btn" @click="createFile" data-file-type="document">文档</button>
            </li>
            <li class="nav-item">
              <button type='button' class="nav-link majestic-btn" @click="createFile" data-file-type="documentPro">专业文档</button>
            </li>
            <li class="nav-item">
              <button type='button' class="nav-link majestic-btn" @click="createFile" data-file-type="sheet">表格</button>
            </li>
            <li class="nav-item">
              <button type='button' class="nav-link majestic-btn" @click="createFile" data-file-type="slide">幻灯片</button>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <span class="nav-link">
          <span class="menu-title">导入文档</span>
        </span>
        <div>
          <ul class="nav sub-menu">
            <li class="nav-item">
              <button type='button' class="nav-link majestic-btn" @click="importFile">文档 / 表格</button>
            </li>
            <li class="nav-item">
              <button type='button' class="nav-link majestic-btn" @click="importFile" data-export-type="document-pro">专业文档</button>
            </li>
          </ul>
          <input type='file' ref="importRef" @change="fileSelected" />
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  methods: {
    /**
     * @parma {Event} e
     */
    async createFile (e) {
      const elm = e.target
      if (elm.dataset.processing) {
        return
      }
      elm.dataset.processing = true

      try {
        const file = await this.$store.dispatch('createFile', elm.dataset.fileType)
        this.$router.push(`/files/${file.guid}`)
      } catch (e) {
        alert(e)
      } finally {
        delete elm.dataset.processing
      }
    },

    importFile (e) {
      const elm = e.target
      const input = this.$refs.importRef

      if (input.dataset.importing) {
        return
      }
      input.dataset.importing = true

      input.value = ''

      if (elm.dataset.exportType === 'document-pro') {
        input.setAttribute('accept', '.docx')
        input.dataset.isDocumentPro = true
      } else {
        input.setAttribute('accept', '.docx,.xlsx')
        delete input.dataset.isDocumentPro
      }

      input.click()
    },

    async fileSelected (e) {
      const elm = this.$refs.importRef
      const file = elm.files[0]

      try {
        const f = await this.$store.dispatch('importFile', {
          file,
          type: getType(file.name, elm.dataset.isDocumentPro)
        })
        this.$router.push(`/files/${f.guid}`)
      } catch (e) {
        alert(e)
      } finally {
        delete elm.dataset.importing
      }

      function getType (name, isDocumentPro) {
        if (name.endsWith('.docx')) {
          return isDocumentPro ? 'document/modoc' : 'document/richdoc'
        }

        return 'sheet/modoc'
      }
    }
  }
}
</script>

<style scoped>
input[type=file] {
  bottom: 100%;
  opacity: 0;
  position: absolute;
  right: 100%;
  visibility: hidden;
}
</style>
