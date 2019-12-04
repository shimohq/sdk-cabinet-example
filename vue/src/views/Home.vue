<template>
  <div class="container-scroller">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'home',

  components: {
    Header
  }
}
</script>
