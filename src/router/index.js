import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/identify/property',
    name: 'propertyIdentify',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PropertyIdentifyView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/record',
    name: 'record',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RecordView.vue')
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EvaluateView.vue')
  },
  {
    path: '/evarecord',
    name: 'evarecord',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EvaRecordView.vue')
  },
  {
    path: '/vulRec',
    name: 'vulRec',
    component: () => import('../views/VulRecView.vue')
  },
  {
    path: '/methodsRec',
    name: 'methodsRec',
    component: () => import('../views/MethodsRecView.vue')
  },
  {
    path: '/threat',
    name: 'threat',
    component: () => import('../views/ThreatView.vue')
  },
  {
    path: '/cal',
    name: 'cal',
    component: () => import('../views/CalculateView.vue')
  },
  {
    path: '/entry',
    name: 'entry',
    component: () => import('../views/EntryView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/NewEvaView.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/EvaDetailView.vue')
  },
  // 以下两个路径仅供测试
  {
    path: '/vulinfo',
    name: 'vulinfo',
    component: () => import('../components/VulInfo.vue')
  },
  {
    path: '/metinfo',
    name: 'metinfo',
    component: () => import('../components/MethodsInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
