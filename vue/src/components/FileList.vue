<template>
  <div class="row flex-grow-1">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">文件列表</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>文件名</th>
                  <th>GUID</th>
                  <th>创建者</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <File
                  v-for="file in files" :key="file.guid" :file="file"
                  :remove-file="removeFile"
                  :export-file="exportFile"
                />
              </tbody>
            </table>
            <div class={paginationClasses}>
              <button v-if="files.length > size" type='button' class="majestic-btn btn-link" onClick="changePage(page + 1)">下一页</button>
              <button v-if="page > 0" type='button' class="majestic-btn btn-link" onClick="changePage(page - 1)">上一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import File from './File.vue'

export default {
  components: {
    File
  },

  data () {
    return {
      files: [],
      page: 0,
      size: 20
    }
  },

  methods: {
    changePage (page) {
      return () => {
        this.$store.dispatch('requestFiles', { page, size: this.size })
          .then(
            files => (this.files = files),
            err => alert(err)
          )
      }
    },

    async exportFile (file, toType) {
      try {
        const url = await this.$store.dispatch('exportFile', { file, toType })

        const a = document.createElement('a')
        a.setAttribute('download', file.title)
        a.href = url
        a.click()
      } catch (e) {
        alert(e)
      }
    },

    async removeFile (file) {
      try {
        await this.$store.dispatch('removeFile', file.guid)
        this.files = this.files.filter(f => f.guid !== file.guid)
      } catch (e) {
        alert(e)
      }
    }
  },

  mounted () {
    this.$store.dispatch('requestFiles', { page: this.page, size: this.size })
      .then(
        files => (this.files = files),
        err => alert(err)
      )
  }
}
</script>

<style>

</style>
