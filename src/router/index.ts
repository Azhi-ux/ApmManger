import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import DataMonitoring from '../views/DataMonitoring.vue'
import DataStorage from '../views/DataStorage.vue'
import NetworkTopology from '../views/NetworkTopology.vue'
import AnomalyDetection from '../views/AnomalyDetection.vue'
import AlertManagement from '../views/AlertManagement.vue'
import Visualization from '../views/Visualization.vue'
import UserManagement from '../views/UserManagement.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/monitoring',
      name: 'DataMonitoring',
      component: DataMonitoring,
      meta: { requiresAuth: true }
    },
    {
      path: '/storage',
      name: 'DataStorage',
      component: DataStorage,
      meta: { requiresAuth: true }
    },
    {
      path: '/topology',
      name: 'NetworkTopology',
      component: NetworkTopology,
      meta: { requiresAuth: true }
    },
    {
      path: '/anomaly',
      name: 'AnomalyDetection',
      component: AnomalyDetection,
      meta: { requiresAuth: true }
    },
    {
      path: '/alerts',
      name: 'AlertManagement',
      component: AlertManagement,
      meta: { requiresAuth: true }
    },
    {
      path: '/visualization',
      name: 'Visualization',
      component: Visualization,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'UserManagement',
      component: UserManagement,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router