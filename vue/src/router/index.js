import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import FileListView from '@/components/FileListView.vue'
import EditorView from '@/components/EditorView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      { path: '', component: FileListView },
      { path: '/files/:guid', component: EditorView }
    ]
  },
  {
    path: '/login',
    alias: '/register',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    const me = store.state.User.me
    if (!me || new Date(me.exp * 1000) < Date.now()) {
      next('/login')
      return
    }
  }

  next()
})

export default router
