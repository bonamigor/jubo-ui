<template>
<div class="flex justify-center justify-items-center items-center">
  <div class="mx-5 w-9/12 mt-5">
    <div class="mt-5 md:mt-0 md:col-span-2">
      <form @submit.prevent="handleSubmit">
        <div class="overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="flex flex-col col-span-6 text-center">
                <div v-if="!route.params.id">
                  <h1 class="text-6xl">Cadastro de Cliente</h1>
                  <span>Preencha o formulário e clique em Cadastrar para criar um Cliente.</span>
                </div>
                <div v-else>
                  <h1 class="text-6xl">Atualizar Cliente</h1>
                  <span>Realize as alterações e clique em Atualizar para salvar.</span>
                </div>
              </div>
              <div class="col-span-3">
                <label class="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" v-model="cliente.nome" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div class="col-span-3">
                <label class="block text-sm font-medium text-gray-700">CNPJ</label>
                <input type="text" v-model="cliente.cnpj" v-mask="'##.###.###/####-##'" placeholder="00.000.000/0000-00" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div class="col-span-6">
                <label class="block text-sm font-medium text-gray-700">Endereço</label>
                <input type="text" v-model="cliente.endereco" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">E-mail</label>
                <input type="email" v-model="cliente.email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">Cidade</label>
                <input type="text" v-model="cliente.cidade" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">Estado</label>
                <input type="text" v-model="cliente.estado" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">CEP</label>
                <input type="text" v-model="cliente.cep" v-mask="'#####-###'" placeholder="00000-000" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">Telefone</label>
                <input type="text" v-model="cliente.telefone" v-mask="['(##) ####-####', '(##) #####-####']" placeholder="(00) 00000-0000" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-center sm:px-6">
            <button v-if="!route.params.id" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
              Cadastrar
            </button>
            <button v-else @click="handleUpdate(cliente)" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
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
import { onBeforeMount, reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import services from '../../services'
import { cleanInput } from '../../utils/cleanInput'
import Swal from 'sweetalert2'

export default {
  components: {
  },
  setup () {
    const toast = useToast()
    const router = useRouter()
    const route = useRoute()

    let cliente = reactive({
      id: '',
      nome: '',
      cnpj: '',
      endereco: '',
      email: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      ativo: ''
    })

    onBeforeMount(async () => {
      if (route.params.id) {
        const { data, errors } = await services.cliente.listarUmCliente(route.params.id)
        if (!errors) {
          cliente.id = data.cliente.id
          cliente.nome = data.cliente.nome
          cliente.cnpj = data.cliente.cnpj
          cliente.endereco = data.cliente.endereco
          cliente.email = data.cliente.email
          cliente.cidade = data.cliente.cidade
          cliente.estado = data.cliente.estado
          cliente.cep = data.cliente.cep
          cliente.telefone = data.cliente.telefone
        }
      }
    })

    watch(() => route.params, async () => {
      if (route.params !== null) {
        const { data, errors } = await services.cliente.listarUmCliente(route.params.id)
        if (!errors) {
          cliente = data.cliente
        }
      }
    })

    const handleSubmit = async (event) => {
      try {
        toast.clear()
        cliente.cnpj = cleanInput(cliente.cnpj)
        cliente.cep = cleanInput(cliente.cep)
        cliente.telefone = cleanInput(cliente.telefone)
        cliente.ativo = '1'
        const { data, errors } = await services.cliente.cadastrarCliente(cliente)

        if (!errors) {
          Swal.fire(
            'Cadastro de Cliente',
            `${data.message}`,
            'success'
          )
          event.target.reset()
        }

        Swal.fire(
          'Cadastro de Cliente',
          `${errors.statusText}`,
          'warning'
        )
      } catch (error) {
        toast.error('Ocorreu um erro ao cadastrar o Cliente.' + error)
      }
    }

    const handleUpdate = async (cliente) => {
      try {
        toast.clear()
        cliente.cnpj = cleanInput(cliente.cnpj)
        cliente.cep = cleanInput(cliente.cep)
        cliente.telefone = cleanInput(cliente.telefone)
        cliente.ativo = '1'
        cliente.id = `${cliente.id}`
        const { data, errors } = await services.cliente.atualizarCliente(cliente)

        if (!errors) {
          Swal.fire(
            'Atualização de Cliente',
            `${data.message}`,
            'success'
          )
          router.push({ name: 'ListaCliente' })
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao atualizar o Cliente.' + error)
      }
    }

    return {
      cliente, handleSubmit, handleUpdate, router, route
    }
  }
}
</script>

<style lang="postcss" scoped>
.box {
  @apply m-2 border-8 border-green-900 w-24 h-24 justify-center items-center text-center
}
</style>
