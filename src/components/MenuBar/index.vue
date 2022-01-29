<template>
  <div class="flex justify-center">
    <div class="navbar-div">
      <div>
        <img src="../../assets/images/logo_jubo.png" class="h-14" alt="">
      </div>
      <div class="flex flex-col justify-center my-2 md:flex-row md:mx-4">
        <div v-if="isAdmin && store.state.user.nome" class="flex flex-col items-center my-2 md:flex-row">
          <div class="dropdown">
            <button class="btn-menu">Cadastro</button>
            <div class="rounded-b-lg dropdown-content">
              <div class="flex flex-col justify-start mt-1 text-sm justify-items-start animate__animated animate__fadeIn">
                <button @click="() => router.push({ name: 'CadastroUsuario' })" class="btn-dropdown">- Usuários</button>
                <button @click="() => router.push({ name: 'CadastroCliente' })" class="mt-1 btn-dropdown">- Clientes</button>
                <button class="mt-1 btn-dropdown">- Empresa</button>
                <button @click="() => router.push({ name: 'CadastroEstante' })" class="mt-1 btn-dropdown">- Estantes</button>
                <button @click="() => router.push({ name: 'CadastroProduto' })" class="mt-1 btn-dropdown">- Produtos</button>
              </div>
            </div>
          </div>
          <div>
            <button class="btn-menu">Pedidos</button>
          </div>
          <div class="dropdown">
            <button class="btn-menu">Listagem</button>
            <div class="rounded-b-lg dropdown-content">
              <div class="flex flex-col justify-start mt-1 text-sm justify-items-start animate__animated animate__fadeIn">
                <button @click="() => router.push({ name: 'ListaUsuario' })" class="btn-dropdown">- Usuários</button>
                <button @click="() => router.push({ name: 'ListaCliente' })" class="mt-1 btn-dropdown">- Clientes</button>
                <button class="mt-1 btn-dropdown">- Vendas</button>
                <button class="mt-1 btn-dropdown">- Pedidos</button>
                <button @click="() => router.push({ name: 'ListaEstante' })" class="mt-1 btn-dropdown">- Estantes</button>
                <button @click="() => router.push({ name: 'ListaProduto' })" class="mt-1 btn-dropdown">- Produtos</button>
              </div>
            </div>
          </div>
          <div>
            <button class="btn-menu">Relatórios</button>
          </div>
        </div>
        <div v-else class="flex">
          <div v-if="store.state.user.nome">
            <button class="btn-menu">Fazer Pedidos</button>
          </div>
          <div v-if="store.state.user.nome">
            <button class="btn-menu">Ver Pedidos</button>
          </div>
        </div>
        <div v-if="store.state.user.nome === '' || store.state.user.nome === null">
          <button @click="handleLogin" class="btn-login">Faça o Login</button>
        </div>
        <div v-else>
          <button @click="handleLogout" class="mt-2 btn-login">{{ store.state.user.nome + ' | Sair' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '../../store/index'
import useModal from '../../hooks/useModal'

export default {
  setup () {
    const router = useRouter()
    const modal = useModal()

    const handleLogin = () => {
      modal.open({ component: 'ModalLogin' })
    }

    const handleLogout = () => {
      window.localStorage.removeItem('token')
      window.sessionStorage.removeItem('userId')
      window.sessionStorage.removeItem('userName')
      window.sessionStorage.removeItem('userEmail')
      window.sessionStorage.removeItem('userAdmin')
      store.dispatch('cleanCurrentUser')
      router.push({ name: 'Home' })
    }

    const isAdmin = computed(() => store.getters.isAdmin)

    return { store, isAdmin, handleLogin, handleLogout, router }
  }
}
</script>

<style lang="postcss" scoped>
.navbar-div {
  @apply flex flex-col md:flex-row justify-between items-center bg-blue-400 px-4 w-full sm:w-10/12
}

.btn-login {
  @apply bg-white hover:bg-gray-500 text-black hover:text-white rounded-full px-2 mx-2
}

.btn-menu {
  @apply border-2 border-white hover:bg-gray-500 text-white hover:text-white rounded-full px-2 mx-2
}

.btn-dropdown {
  @apply bg-gray-500 hover:bg-gray-300 text-white hover:text-black rounded-full px-2 mx-2 shadow-lg
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  left: -15px;
  min-width: 160px;
  padding: 1px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

</style>
