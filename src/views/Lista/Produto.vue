<template>
<div class="flex justify-center items-center p-4">
  <div class="flex flex-col w-10/12">
    <div class="flex flex-col justrify-center items-center my-5">
      <div class="text-4xl">
        <h1>Lista de Produtos</h1>
      </div>
      <div class="text-xl text-center mt-5">
        Esses são os Produtos cadastrados no Banco de Dados.
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
                  Preço de Custo
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unidade Medida
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="produto in produtos" :key="produto.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ produto.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ produto.nome }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ produto.preco_custo }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ produto.unidade_medida }}</div>
                </td>
                <td class="px-4 py-4 text-center text-sm font-medium">
                  <a href="#" @click="editar(produto)" class="text-indigo-600 hover:text-indigo-900">Editar</a> /
                  <a href="#" @click="excluir(produto)" class="text-indigo-600 hover:text-indigo-900">Excluir</a>
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
import produtoStore from '../../store/produtos'
import Swal from 'sweetalert2'
import { useToast } from 'vue-toastification'

export default {
  setup () {
    const router = useRouter()

    onMounted(() => {
      fetchProdutos()
    })

    const produtos = computed(() => produtoStore.getters.getProdutos)

    const fetchProdutos = async () => {
      const { data, errors } = await services.produto.listarTodosOsProdutos()
      console.log(data.produtos)
      if (!errors) {
        produtoStore.dispatch('getProdutos', data.produtos)
      }
    }

    const editar = (produto) => {
      router.push({ name: 'AtualizarProduto', params: { id: produto.id } })
    }

    const excluir = async (produto) => {
      try {
        Swal.fire({
          title: 'Exclusão de Produto',
          text: 'Deseja mesmo excluir este Produto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, por favor!',
          cancelButtonText: 'Não.'
        }).then(async (dado) => {
          const { data, errors } = await services.produto.deletarProduto(produto.id)
          if (!errors) {
            Swal.fire(
              'Exclusão de Produto',
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
      produtos,
      fetchProdutos,
      editar,
      excluir
    }
  }
}
</script>

<style>

</style>
