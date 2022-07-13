import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const Layout = () => import('@/views/Layout')
const User = () => import('@/views/User')
const HouseList = () => import('@/views/HouseList')
const InfoList = () => import('@/views/InfoList')
const Login = () => import('@/views/Login')
const Address = () => import('@/views/Address')
const House = () => import('@/views/House')
const Map = () => import('@/views/Map')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'user', component: User },
      { path: 'houselist', component: HouseList },
      { path: 'infolist', component: InfoList }
    ]
  },
  { path: '/login', component: Login },
  { path: '/address', component: Address },
  { path: '/house/:houseid', component: House, name: 'house', props: true },
  { path: '/map', component: Map },
  { path: '/lease', component: () => import('@/views/Lease') },
  { path: '/collection', component: () => import('@/views/Collection') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
