<template>
  <ul class="navbar-nav mr-lg-4 w-100">
    <li class="nav-item d-lg-block w-100 text-body ml-0">
      <h4 ref="inputRef" class="file-title d-inline-block mb-0" :contenteditable="editing" />
      <i v-if="editing" class="mdi mdi-check cur-pointer btn-save-title ml-1" alt="保存" @click="doSave" />
      <i v-if="!editing" class="mdi mdi-pencil cur-pointer btn-edit-title ml-1" alt="修改标题" @click="editing = !editing" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    save: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      editing: false
    }
  },

  computed: {
    file () {
      return this.$store.state.File.current
    }
  },

  methods: {
    /**
     * @param {Event} e
     */
    async doSave (e) {
      e.preventDefault()

      const elm = e.target
      if (elm.dataset.saving) {
        return
      }
      elm.dataset.saving = true

      try {
        const newTitle = this.$refs.inputRef.textContent.trim()

        if (newTitle === this.file.title) {
          return
        }

        await this.save(newTitle)
      } catch (e) {
        alert(e)
      } finally {
        delete elm.dataset.saving
        this.editing = false
      }
    }
  },

  mounted () {
    this.$refs.inputRef.textContent = this.file.title
  },

  updated () {
    if (!this.editing) {
      this.$refs.inputRef.textContent = this.file.title
    }
  }
}
</script>
