import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'


// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authStore.isLogged) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
}
)

export default router
