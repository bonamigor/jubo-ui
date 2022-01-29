<template>
<div class="flex w-full justify-center my-5">
    <div class="flex flex-col w-9/12 justify-center items-center">
      <div v-if="!route.params.id" class="text-center mt-5">
        <h1 class="text-4xl sm:text-6xl">Cadastro de Produtos</h1>
        <span class="text-sm sm:text-base">Preencha o formulário e clique em <br class="block sm:hidden">Cadastrar para criar um Produto.</span>
      </div>
      <div v-else class="text-center mt-5">
        <h1 class="text-4xl sm:text-6xl">Atualizar Produto</h1>
        <span class="text-sm sm:text-base">Realize as alterações e clique em Atualizar para salvar.</span>
      </div>
      <div class="flex flex-col w-full sm:w-9/12 justify-center items-center">
        <form class="mt-5" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-4 gap-6">
            <div class="col-span-4 sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Nome</label>
              <input type="text" v-model="produto.nome" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div class="col-span-4 sm:col-span-1">
              <label class="block sm:hidden lg:block text-sm font-medium text-gray-700">Preço de Custo</label>
              <label class="hidden sm:block lg:hidden text-sm font-medium text-gray-700">Preço</label>
              <input type="text" v-model="produto.precoCusto" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div class="col-span-4 sm:col-span-1">
              <label class="block sm:hidden lg:block text-sm font-medium text-gray-700">Unidade Medida</label>
              <label class="hidden sm:block lg:hidden text-sm font-medium text-gray-700">Medida</label>
              <select v-model="produto.unidadeMedida" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" name="produtos" id="produtos">
                <option disabled value="">Selecione a unidade</option>
                <option value="KG">KG</option>
                <option value="UND">UND</option>
                <option value="PCT">PCT</option>
                <option value="LT">LT</option>
                <option value="L">L</option>
                <option value="MAÇO">MAÇO</option>
              </select>
            </div>
            <div class="col-span-4 flex justify-center">
              <button v-if="!route.params.id" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
                Cadastrar
              </button>
              <button v-else @click="handleUpdate(produto)" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-52">
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
import Swal from 'sweetalert2'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const toast = useToast()

    let produto = reactive({
      id: '',
      nome: '',
      precoCusto: '',
      unidadeMedida: ''
    })

    // Cadastro de Produto
    const handleSubmit = async (event) => {
      try {
        const { data, errors } = await services.produto.cadastrarProduto({
          nome: produto.nome,
          precoCusto: produto.precoCusto,
          unidadeMedida: produto.unidadeMedida
        })

        if (!errors) {
          Swal.fire(
            'Cadastro de Produto',
            `${data.message}`,
            'success'
          )
          event.target.reset()
        } else {
          Swal.fire(
            'Cadastro de Produto',
            'Ocorreu um erro ao cadastrar o Produto.',
            'warning'
          )
        }
      } catch (error) {
        Swal.fire(
          'Cadastro de Produto',
          `${error}`,
          'warning'
        )
      }
    }

    // Atualizar Produto
    onBeforeMount(async () => {
      if (route.params.id) {
        const { data, errors } = await services.produto.listarUmProduto(route.params.id)
        if (!errors) {
          produto.id = data.produto.id
          produto.nome = data.produto.nome
          produto.precoCusto = data.produto.preco_custo
          produto.unidadeMedia = data.produto.unidade_medida
        }
      }
    })

    watch(() => route.params, async () => {
      if (route.params !== null) {
        const { data, errors } = await services.produto.listarUmproduto(route.params.id)
        if (!errors) {
          produto = data.produto
        }
      }
    })

    const handleUpdate = async (produto) => {
      try {
        toast.clear()
        produto.id = `${produto.id}`
        const { data, errors } = await services.produto.atualizarProduto(produto)

        if (!errors) {
          Swal.fire(
            'Atualização de Produto',
            `${data.message}`,
            'success'
          )
          router.push({ name: 'ListaProduto' })
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao atualizar o produto.' + error)
      }
    }

    return {
      produto, handleSubmit, handleUpdate, router, route
    }
  }
}
</script>

<style>

</style>
