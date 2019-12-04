<template>
  <tr>
    <td>
      <router-link :to="`/files/${file.guid}`" class="text-primary">
        <i :class="`mdi mdi-file-${icon}`" :title="label" />
        {{ file.title }}
      </router-link>
    </td>
    <td>
      <router-link :to="`/files/${file.guid}`" class="text-primary">{{ file.guid }}</router-link>
    </td>
    <td>{{ file.user.username }}</td>
    <td>{{ file.createdAt }}</td>
    <td>
      <button type='button' class="majestic-btn btn-outline-secondary btn-rounded btn-icon btn-export-file mr-1" title='导出' @click="handleExportFile">
        <i class="mdi mdi-download" />
      </button>
      <button v-if="canExportPDF" type='button' class="majestic-btn btn-outline-secondary btn-rounded btn-icon btn-export-pdf mr-1" title='导出 PDF' data-export-type='pdf' @click="handleExportPDF">
        <i class="mdi mdi-file-pdf-box" />
      </button>
      <button type='button' class="majestic-btn btn-outline-secondary btn-rounded btn-icon btn-delete-file" title='删除' @click="handleRemoveFile">
        <i class="mdi mdi-delete-forever" />
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true
    },

    exportFile: {
      type: Function,
      required: true
    },

    removeFile: {
      type: Function,
      required: true
    }
  },

  data () {
    const humanizedType = getFileType(this.file.type)
    const meta = getTypeMeta(humanizedType)

    return {
      humanizedType,
      ...meta
    }
  },

  methods: {
    /**
     * @param {Event} e
     */
    handleExportFile (e) {
      this.doExport(e.target, this.exportType)
    },

    /**
     * @param {Event} e
     */
    handleExportPDF (e) {
      this.doExport(e.target, 'pdf')
    },

    /**
     * @param {HTMLElement} elm
     * @param {string} type
     */
    doExport (elm, type) {
      if (elm.dataset.exporting) {
        return
      }
      elm.dataset.exporting = true

      this.exportFile(this.file, type)
        .then(() => delete elm.dataset.exporting)
    },

    /**
     * @param {Event} e
     */
    handleRemoveFile (e) {
      const elm = e.target
      if (elm.dataset.removing) {
        return
      }
      elm.dataset.removing = true

      this.removeFile(this.file)
        .then(() => delete elm.dataset.removing)
    }
  }
}

function getFileType (type) {
  const [main, sub] = type.split('/')

  switch (main) {
    case 'document':
      if (sub === 'richdoc') {
        return 'document'
      }
      return 'document-pro'

    case 'sheet':
      return 'sheet'

    case 'slide':
      return 'slide'

    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

function getTypeMeta (type) {
  switch (type) {
    case 'document':
      return {
        icon: 'document',
        label: '文档',
        exportType: 'docx',
        canExportPDF: true
      }

    case 'document-pro':
      return {
        icon: 'word',
        label: '专业文档',
        exportType: 'docx',
        canExportPDF: true
      }

    case 'sheet':
      return {
        icon: 'excel',
        label: '表格',
        exportType: 'xlsx',
        canExportPDF: true
      }

    case 'slide':
      return {
        icon: 'powerpoint',
        label: '幻灯片',
        exportType: 'pptx',
        canExportPDF: false
      }

    default:
      throw new Error(`Unknown type: ${type}`)
  }
}
</script>

<style>

</style>
