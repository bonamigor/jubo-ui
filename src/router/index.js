import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const Dashboard = () => import('../views/Dashboard/Dashboard.vue')
const Inicial = () => import('../views/Inicial/Inicial.vue')
const CadastroCliente = () => import('../views/Cadastro/Cliente.vue')
const CadastroUsuario = () => import('../views/Cadastro/Usuario.vue')
const CadastroProduto = () => import('../views/Cadastro/Produto.vue')
const CadastroEstante = () => import('../views/Cadastro/Estante.vue')
const ListaCliente = () => import('../views/Lista/Cliente.vue')
const ListaUsuario = () => import('../views/Lista/Usuario.vue')
const ListaProduto = () => import('../views/Lista/Produto.vue')
const ListaEstante = () => import('../views/Lista/Estante.vue')

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
    path: '/cadastro-produto',
    name: 'CadastroProduto',
    component: CadastroProduto,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/atualizar-produto/:id',
    name: 'AtualizarProduto',
    component: CadastroProduto,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/listar-produtos',
    name: 'ListaProduto',
    component: ListaProduto,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/cadastro-estante',
    name: 'CadastroEstante',
    component: CadastroEstante,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/atualizar-estante/:id',
    name: 'AtualizarEstante',
    component: CadastroEstante,
    meta: {
      hasAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/listar-estantes',
    name: 'ListaEstante',
    component: ListaEstante,
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
