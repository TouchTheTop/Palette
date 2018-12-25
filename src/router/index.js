import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Posters/Index'
import Editor from '@/components/Editor/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    }
  ]
})
