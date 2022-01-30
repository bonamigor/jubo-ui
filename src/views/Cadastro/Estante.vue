<template>
<div class="flex items-center justify-center justify-items-center">
  <div class="w-9/12 mx-5 mt-5">
    <div class="mt-5 md:mt-0 md:col-span-2">
      <form @submit.prevent="handleSubmit">
        <div class="overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="flex flex-col col-span-6 text-center">
                <div v-if="!route.params.id">
                  <h1 class="text-6xl">Cadastro de Estante</h1>
                  <span>Preencha o formulário e clique em Cadastrar para criar uma Estante.</span>
                </div>
                <div v-else>
                  <h1 class="text-6xl">Atualizar Estante</h1>
                  <span>Realize as alterações e clique em Atualizar para salvar.</span>
                </div>
              </div>
              <div class="w-full col-span-6 mt-1 sm:col-span-4">
                <label class="block text-sm font-medium text-gray-700">Cliente</label>
                <select v-model="estante.clienteId" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="clientes" id="clientes">
                  <option disabled value="">Selecione o Cliente</option>
                  <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
                </select>
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">Período</label>
                <input type="text" v-model="estante.periodo" placeholder="SEMESTRE/ANO" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 text-center bg-gray-50 sm:px-6">
            <button v-if="!route.params.id" type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
              Cadastrar
            </button>
            <button v-else @click="handleUpdate(estante)" type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
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
import { onBeforeMount, reactive, watch, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import services from '../../services'
import clienteStore from '../../store/clientes'
import Swal from 'sweetalert2'

export default {
  components: {
  },
  setup () {
    const toast = useToast()
    const router = useRouter()
    const route = useRoute()

    let estante = reactive({
      id: '',
      periodo: '',
      clienteId: '',
      ativa: ''
    })

    const clientes = computed(() => clienteStore.getters.getClientes)

    const fetchClientes = async () => {
      const { data, errors } = await services.cliente.listarTodosOsClientes()

      if (!errors) {
        clienteStore.dispatch('getClientes', data.clientes)
      }
    }

    onBeforeMount(async () => {
      fetchClientes()
      if (route.params.id) {
        const { data, errors } = await services.estante.listarUmaEstante(route.params.id)
        if (!errors) {
          estante.id = data.estante.id
          estante.clienteId = data.estante.clienteId
          estante.periodo = data.estante.periodo
          estante.ativa = data.estante.ativa
        }
      }
    })

    watch(() => route.params, async () => {
      if (route.params !== null) {
        const { data, errors } = await services.estante.listarUmaEstante(route.params.id)
        if (!errors) {
          estante = data.estante
        }
      }
    })

    const handleSubmit = async (event) => {
      try {
        toast.clear()
        estante.ativa = '1'
        const { data, errors } = await services.estante.cadastrarEstante({ periodo: estante.periodo, clienteId: estante.clienteId })

        if (!errors) {
          Swal.fire(
            'Cadastro de Estante',
            `${data.message}`,
            'success'
          )
          event.target.reset()
        } else {
          Swal.fire(
            'Cadastro de Estante',
            'Ocorreu um erro ao cadastrar a Estante.',
            'warning'
          )
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao cadastrar a Estante.' + error)
      }
    }

    const handleUpdate = async (estante) => {
      try {
        toast.clear()
        console.log(estante)
        estante.id = `${estante.id}`
        const { data, errors } = await services.estante.atualizarEstante({ periodo: estante.periodo, clienteId: estante.clienteId, id: estante.id })

        if (!errors) {
          Swal.fire(
            'Atualização de Estante',
            `${data.message}`,
            'success'
          )
          router.push({ name: 'ListaEstante' })
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao atualizar o Estante.' + error)
      }
    }

    return {
      estante, clientes, handleSubmit, handleUpdate, router, route
    }
  }
}
</script>

<style lang="postcss" scoped>
.box {
  @apply m-2 border-8 border-green-900 w-24 h-24 justify-center items-center text-center
}
</style>
