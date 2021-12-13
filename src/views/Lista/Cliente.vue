
<template>
<div class="flex justify-center items-center p-4">
  <div class="flex flex-col w-10/12">
    <div class="flex flex-col justrify-center items-center my-5">
      <div class="text-4xl">
        <h1>Lista de Clientes</h1>
      </div>
      <div class="text-xl text-center mt-5">
        Esses são os os Clientes cadastrados no Banco de Dados.
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
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CNPJ
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cidade / Estado
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="cliente in clientes" :key="cliente.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ cliente.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ cliente.nome }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ cnpjFilter(cliente.cnpj) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ cliente.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ phoneFilter(cliente.telefone) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ `${cliente.cidade} / ${cliente.estado}` }}</div>
                </td>
                <td class="px-4 py-4 text-center text-sm font-medium">
                  <a href="#" @click="editar(cliente)" class="text-indigo-600 hover:text-indigo-900">Editar</a> /
                  <a href="#" @click="excluir(cliente)" class="text-indigo-600 hover:text-indigo-900">Excluir</a>
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
import { useToast } from 'vue-toastification'
import services from '../../services'
import store from '../../store/clientes'
import Swal from 'sweetalert2'

export default {
  setup () {
    const router = useRouter()
    const toast = useToast()

    onMounted(() => {
      fetchClientes()
    })

    const clientes = computed(() => store.getters.getClientes)

    const fetchClientes = async () => {
      const { data, errors } = await services.cliente.listarTodosOsClientes()

      if (!errors) {
        store.dispatch('getClientes', data.clientes)
      }
    }

    const phoneFilter = phone => {
      if (phone.length === 11) {
        return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`
      } else {
        return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6, 10)}`
      }
    }

    const cnpjFilter = cnpj => {
      return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12, 14)}`
    }

    const editar = (cliente) => {
      router.push({ name: 'AtualizarCliente', params: { id: cliente.id } })
    }

    const excluir = async (cliente) => {
      try {
        Swal.fire({
          title: 'Exclusão de Cliente',
          text: 'Deseja mesmo excluir este Cliente?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, por favor!',
          cancelButtonText: 'Não.'
        }).then(async (dado) => {
          toast.clear()
          const { data, errors } = await services.cliente.deletarCliente(cliente.id)
          if (!errors) {
            toast.success(data.message)
            document.location.reload(true)
          }
        })
      } catch (error) {
        toast.error(error)
      }
    }

    return {
      fetchClientes,
      clientes,
      phoneFilter,
      cnpjFilter,
      editar,
      excluir
    }
  }
}
</script>

<style>

</style>
