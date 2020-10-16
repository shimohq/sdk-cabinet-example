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
  },

  mounted () {
    if (this.$store.state.isMobile) {
      document.querySelector('html').classList.add('mobile-view')
    }
  }
}
</script>
