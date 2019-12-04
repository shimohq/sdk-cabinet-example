<template>
  <div class="container-fluid page-body-wrapper pt-0">
    <Sidebar />

    <div class="main-panel">
      <div class="content-wrapper d-flex">
        <FileList />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import FileList from './FileList.vue'

export default {
  components: {
    Sidebar,
    FileList
  }
}
</script>

<style>

</style>
