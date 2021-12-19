
<template>
<div class="flex justify-center items-center p-4">
  <div class="flex flex-col w-10/12">
    <div class="flex flex-col justrify-center items-center my-5">
      <div class="text-4xl">
        <h1>Lista de Usuários</h1>
      </div>
      <div class="text-xl text-center mt-5">
        Esses são os Usuários cadastrados no Banco de Dados.
      </div>
    </div>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 border-2 mb-10">
            <thead class="bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Administrador
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.nome }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.admin ? 'SIM' : 'NÃO' }}</div>
                </td>
                <td class="px-4 py-4 text-center text-sm font-medium">
                  <a href="#" @click="editar(user)" class="text-indigo-600 hover:text-indigo-900">Editar</a> /
                  <a href="#" @click="excluir(user)" class="text-indigo-600 hover:text-indigo-900">Excluir</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import services from '../../services'
import store from '../../store/user'
import Swal from 'sweetalert2'
import { useToast } from 'vue-toastification'

export default {
  setup () {
    const router = useRouter()

    onMounted(() => {
      fetchUsers()
    })

    const users = computed(() => store.getters.getUsers)

    const fetchUsers = async () => {
      const { data, errors } = await services.user.listarTodosOsUsuarios()

      if (!errors) {
        store.dispatch('getUsers', data.users)
      }
    }

    const editar = (user) => {
      router.push({ name: 'AtualizarUsuario', params: { userid: user.id } })
    }

    const excluir = async (user) => {
      try {
        Swal.fire({
          title: 'Exclusão de Usuário',
          text: 'Deseja mesmo excluir este Usuário?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, por favor!',
          cancelButtonText: 'Não.'
        }).then(async (dado) => {
          const { data, errors } = await services.user.deletarUsuario(user.id)
          if (!errors) {
            Swal.fire(
              'Exclusão de Usuário',
              `${data.message}`,
              'success'
            )
            document.location.reload(true)
          }
        })
      } catch (error) {
        useToast.error(error)
      }
    }

    return {
      users,
      fetchUsers,
      editar,
      excluir
    }
  }
}
</script>

<style>

</style>
