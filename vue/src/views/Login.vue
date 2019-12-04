<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img :src="logo" alt='石墨文档' />
              </div>
              <p>欢迎使用石墨 SDK 演示程序</p>
              <LoginForm v-if="showLogin" :callback="onLogin" />
              <RegisterForm v-if="!showLogin" :callback="onRegister" />
              <div class="text-center mt-4 font-weight-light">
                <button type='button' class="majestic-btn btn-link" @click="onSwitchForm">{{ switchFormLabel }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import logo from '@/assets/logo.png'

export default {
  components: {
    LoginForm,
    RegisterForm
  },

  data () {
    return {
      showLogin: true,
      switchFormLabel: '注册',
      logo
    }
  },

  methods: {
    onSwitchForm () {
      this.showLogin = !this.showLogin

      if (this.showLogin) {
        this.switchFormLabel = '注册'
      } else {
        this.switchFormLabel = '登录'
      }
    },

    onRegister (user) {
      this.$store.dispatch('userRegister', user)
        .then(() => this.$router.push('/'))
        .catch(err => alert(err))
    },

    onLogin (user) {
      this.$store.dispatch('userLogin', user)
        .then(() => this.$router.push('/'))
        .catch(err => alert(err))
    }
  }
}
</script>
