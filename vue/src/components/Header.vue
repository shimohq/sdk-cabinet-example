<template>
  <nav class="navbar col-lg-12 col-12 p-0 d-flex flex-row flex-nowrap">
    <div class="navbar-brand-wrapper d-flex justify-content-center">
      <div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
        <router-link class="navbar-brand brand-logo" to='/'><img :src="logo" alt='石墨文档' /></router-link>
      </div>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
      <FileTitle v-if="file" file="file" :save="saveFileTitle" />

      <ul v-if="me" class="navbar-nav navbar-nav-right">
        <li class="nav-item nav-profile dropdown">
          <span class="nav-link dropdown-toggle" data-toggle='dropdown' id='profileDropdown'>
            <span class="nav-profile-name">{{ me.username }}</span>
          </span>
          <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby='profileDropdown'>
            <a class="dropdown-item" href='/logout' @click="logout">
              <i class="mdi mdi-logout text-primary" />
              登出
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import logo from '@/assets/logo.png'
import FileTitle from './FileTitle.vue'

export default {
  components: {
    FileTitle
  },

  data () {
    return {
      logo
    }
  },

  computed: {
    file () {
      return this.$store.state.File.current
    },

    me () {
      return this.$store.state.User.me
    }
  },

  methods: {
    saveFileTitle (title) {
      return this.$store.dispatch('updateFileTitle', { fileGuid: this.file.guid, title })
    },

    logout (e) {
      e.preventDefault()
      this.$store.dispatch('userLogout')
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>
