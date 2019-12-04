<template>
  <form class="pt-3" @submit="onSubmit">
    <div class="form-group">
      <input type="text" class="form-control form-control-lg" id="username" placeholder="Username" required pattern="^[\w]{3,12}$" v-model="username" />
    </div>
    <div class="form-group">
      <input type="password" class="form-control form-control-lg" id="password" placeholder="Password" required pattern="^[a-z0-9_-]{6,32}$" v-model="password" />
    </div>
    <div class="mt-3">
      <button class="majestic-btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">注册</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'RegisterFrom',
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    /**
     * @param {Event} e
     */
    onSubmit (e) {
      e.preventDefault()
      this.callback({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
