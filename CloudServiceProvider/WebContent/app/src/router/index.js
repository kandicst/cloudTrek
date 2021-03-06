import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../components/Admin'
import Login from '../components/auth/Login'
import NotFound from '../components/errors/NotFound'
import Dashboard from '../components/Dashboard'
import Account from '../components/global/Account'
import Organization from "../components/global/Organization"
import Bill from "../components/global/Bill"
import { store } from '../store/store.js'

Vue.use(VueRouter)

/**
 * guest :  svako moze da pristupi ruti
 * requiresAuth : treba biti ulogovan za pristup
 * is_admin : samo administratori mogu videti
 */
const routes = [
  
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      guest: true,
      redirectIfLogged: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
      redirectIfLogged: true
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      requiresAuth: true,
      is_admin: false
    }
  },
  {
    path: "/organization",
    name: "organization",
    component: Organization,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: "/billing",
    name: "bill",
    component: Bill,
    meta:{
      requiresAuth: true,
      is_admin: true,
    }
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound,
    meta: {
      guest: true
    }
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      guest: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/global/About.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// metoda koja se poziva pre svakog rutiranja u aplikaciji
router.beforeEach((to, from, next) => {
  store.dispatch('users/getLoggedUser').then(() => {
    if (to.matched.some(record => record.meta.is_admin)) {

      // ako je admin
      if (store.getters['users/isAdmin'] || store.getters['users/isSuper']) {
        next();
        return;
      }
      
      next('/login');
    }

    // ako je potrebno biti ulogovan za pristup
    else if (to.matched.some(record => record.meta.requiresAuth)) {

      // da li postoji ulogovani korinik?
      if (store.getters['users/isLogged']) {
        next()
        return
      }
      // ako ne postoji vrati ga na login
      next('/login')

    } else if (to.matched.some(record => record.meta.redirectIfLogged)) {
  
      if(store.getters['users/isAdmin'] || store.getters["users/isSuper"]){
        next('/admin');

      } else if (store.getters['users/isLogged']){
        next('/dashboard');

      } else {
        next();
      }

      // dozvoljen pristup svima
    } else {
      next()
    }
  });

  // da li je potrebna administratorksa privilegija

})

export default router
