import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import RepoList from '@/components/RepoList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: RepoList
    }
  ]
})
