<template>
  <div class="flex flex-col justify-center items-center mt-10">
    <div class="flex flex-col w-9/12 justify-center items-center">
      <div class="text-center">
        <div v-if="!route.params.userid">
          <h1 class="text-3xl sm:text-6xl">Cadastro de Usuário</h1>
          <span class="text-sm sm:text-lg mt-2">Preencha o formulário e clique em Cadastrar para criar um Cliente.</span>
        </div>
        <div v-else>
          <h1 class="text-3xl sm:text-6xl">Atualizar Usuário</h1>
          <span class="text-sm sm:text-lg mt-2">Realize as alterações e clique em Atualizar para salvar.</span>
        </div>
      </div>
      <div >
        <form class="mb-10" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-6 gap-6 mt-5 justify-center justify-items-center items-center">
            <div class="col-span-6 sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Nome</label>
              <input type="text" v-model="usuario.nome" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">E-mail</label>
              <input type="email" v-model="usuario.email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Senha</label>
              <input type="password" v-model="usuario.senha" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div class="w-full col-span-6 sm:col-span-4">
              <label class="block text-sm font-medium text-gray-700">Cliente</label>
              <select v-model="usuario.clienteId" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" name="clientes" id="clientes">
                <option disabled value="">Selecione o Cliente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
              </select>
            </div>
            <div class="col-span-6 sm:col-span-2 flex items-center mt-5">
              <input id="push-nothing" v-model="usuario.admin" name="push-notifications" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">
                Administrador?
              </label>
            </div>
            <div class="col-span-6">
              <button v-if="!route.params.userid" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
                Cadastrar
              </button>
              <button v-else @click="handleUpdate(usuario)" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
                Atualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from '../../store/clientes'
import services from '../../services'
import Swal from 'sweetalert2'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()

    let usuario = reactive({
      id: '',
      nome: '',
      email: '',
      senha: '',
      admin: '',
      clienteId: ''
    })

    const clientes = computed(() => store.getters.getClientes)

    const fetchClientes = async () => {
      const { data, errors } = await services.cliente.listarTodosOsClientes()

      if (!errors) {
        store.dispatch('getClientes', data.clientes)
      }
    }

    // Cadastro de Usuarios
    const handleSubmit = async (event) => {
      console.log(usuario.admin)
      if (usuario.admin !== true) {
        const { data, errors } = await services.user.cadastrarUsuarioRegular({
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          clienteId: usuario.clienteId
        })
        if (!errors) {
          Swal.fire(
            `${data.message}`,
            'Clique no botão para fechar.',
            'success'
          )
          event.target.reset()
        }
      } else {
        const { data, errors } = await services.user.cadastrarUsuarioAdmin({
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          admin: usuario.admin
        })
        if (!errors) {
          Swal.fire(
          `${data.message}`,
          'Clique no botão para fechar.',
          'success'
          )
          event.target.reset()
        }
      }
    }

    // Update de Usuarios
    onBeforeMount(async () => {
      fetchClientes()
      if (route.params.userid) {
        const { data, errors } = await services.user.listarUmUsuario(route.params.userid)
        if (!errors) {
          usuario.id = data.user.id
          usuario.nome = data.user.nome
          usuario.email = data.user.email
          usuario.senha = data.user.senha
        }
      }
    })

    watch(() => route.params, async () => {
      if (route.params !== null) {
        const { data, errors } = await services.user.listarUmUsuario(route.params.userid)
        if (!errors) {
          usuario = data.user
        }
      }
    })

    const handleUpdate = async (usuario) => {
      try {
        if (usuario.admin !== true) {
          const { data, errors } = await services.user.atualizarUsuarioRegular({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            clienteId: usuario.clienteId,
            id: `${usuario.id}`
          })
          if (!errors) {
            Swal.fire(
            `${data.message}`,
            'Redirecionado para a tela de Listagem dos usuários...',
            'success'
            )
            router.push({ name: 'ListaUsuario' })
          }
        }
        usuario.admin = '1'
        const { data, errors } = await services.user.atualizarUsuarioAdmin({
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          admin: usuario.admin,
          id: `${usuario.id}`
        })
        if (!errors) {
          Swal.fire(
            `${data.message}`,
            'Redirecionado para a tela de Listagem dos usuários...',
            'success'
          )
          router.push({ name: 'ListaUsuario' })
        }
      } catch (error) {
        Swal.fire(
          `${error}`,
          'error'
        )
      }
    }

    return {
      clientes, usuario, handleSubmit, handleUpdate, route, router
    }
  }
}
</script>

<style>

</style>
