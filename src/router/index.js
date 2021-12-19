import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const Dashboard = () => import('../views/Dashboard/Dashboard.vue')
const Inicial = () => import('../views/Inicial/Inicial.vue')
const CadastroCliente = () => import('../views/Cadastro/Cliente.vue')
const CadastroUsuario = () => import('../views/Cadastro/Usuario.vue')
const ListaCliente = () => import('../views/Lista/Cliente.vue')
const ListaUsuario = () => import('../views/Lista/Usuario.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/cadastro-cliente',
    name: 'CadastroCliente',
    component: CadastroCliente,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/atualizar-cliente/:id',
    name: 'AtualizarCliente',
    component: CadastroCliente,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/listar-clientes',
    name: 'ListaCliente',
    component: ListaCliente,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/cadastro-usuario',
    name: 'CadastroUsuario',
    component: CadastroUsuario,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/atualizar-usuario/:userid',
    name: 'AtualizarUsuario',
    component: CadastroUsuario,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/listar-usuarios',
    name: 'ListaUsuario',
    component: ListaUsuario,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/inicial',
    name: 'Inicial',
    component: Inicial,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
