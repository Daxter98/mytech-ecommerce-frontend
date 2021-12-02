import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Categoria from '../views/Categoria.vue'
import Search from '../views/Search.vue'
import Carrito from '../views/Carrito.vue'
import Registro from '../views/Registro.vue'
import LogIn from '../views/LogIn.vue'
import Perfil from '../views/Perfil.vue'
import store from '../store'
import Pago from '../views/Pago.vue'
import Success from '../views/Success.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:categoria_slug/:producto_slug',
    name: 'Product', 
    component: Product
  },
  {
    path: '/:categoria_slug',
    name: 'Categoria',
    component: Categoria
  },
  {
    path: '/busqueda',
    name: 'Search',
    component: Search
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: Carrito
  },
  {
    path: '/carrito/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/carrito/pago',
    name: 'Pago',
    component: Pago,
    meta: {
      requiredLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiredLogin) && !store.state.isAuthenticated){
    next({name: 'LogIn', query: {to: to.path }})
  } else{
    next()
  }
})

export default router
