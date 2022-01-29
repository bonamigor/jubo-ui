
<template>
<div class="flex items-center justify-center p-4">
  <div class="flex flex-col w-10/12">
    <div class="flex flex-col items-center my-5 justrify-center">
      <div class="text-4xl">
        <h1>Lista de Estantes</h1>
      </div>
      <div class="mt-5 text-xl text-center">
        Esses são as Estantes cadastradas no Banco de Dados.
      </div>
    </div>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full mb-10 border-2 divide-y divide-gray-200">
            <thead class="bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Período
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Ativa
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="estante in estantes" :key="estante.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ estante.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ estante.nome }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ estante.periodo }}</div>
                </td>
                <td v-if="estante.ativa" class="px-6 py-4 whitespace-nowrap">
                  <div class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">ATIVA</div>
                </td>
                <td v-else class="px-6 py-4 whitespace-nowrap">
                  <div class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">INATIVA</div>
                </td>
                <td class="px-4 py-4 text-sm font-medium text-center">
                  <a href="#" @click="editar(estante)" class="text-indigo-600 hover:text-indigo-900">Editar</a> /
                  <a href="#" @click="excluir(estante)" class="text-indigo-600 hover:text-indigo-900">Excluir</a>
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
import estanteStore from '../../store/estantes'
import Swal from 'sweetalert2'

export default {
  setup () {
    const router = useRouter()
    const toast = useToast()

    onMounted(() => {
      fetchEstantes()
    })

    const estantes = computed(() => estanteStore.getters.getEstantes)

    const fetchEstantes = async () => {
      const { data, errors } = await services.estante.listarTodosAsEstantes()

      if (!errors) {
        estanteStore.dispatch('getEstantes', data.estantes)
      }
    }

    const cliente = async (id) => {
      const { data, errors } = await services.cliente.listarUmCliente(id)
      if (!errors) {
        return data.cliente.nome
      }
    }

    const editar = (estante) => {
      router.push({ name: 'AtualizarEstante', params: { id: estante.id } })
    }

    const excluir = async (estante) => {
      try {
        Swal.fire({
          title: 'Exclusão de Estante',
          text: 'Deseja mesmo excluir esta Estante?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, por favor!',
          cancelButtonText: 'Não.'
        }).then(async (dado) => {
          const { data, errors } = await services.estante.deletarEstante(estante.id)
          if (!errors) {
            Swal.fire(
              'Exclusão de Estante',
              `${data.message}`,
              'success'
            )
            document.location.reload(true)
          }
        })
      } catch (error) {
        toast.error(error)
      }
    }

    return {
      fetchEstantes,
      estantes,
      cliente,
      editar,
      excluir
    }
  }
}
</script>

<style>

</style>
