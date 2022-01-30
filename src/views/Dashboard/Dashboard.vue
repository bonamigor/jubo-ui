<template>
<div class="flex items-center justify-center p-4">
  <div class="flex flex-col w-10/12">
    <div class="flex flex-col items-center my-5 justrify-center">
      <div class="text-4xl">
        <h1>Olá Fulano!</h1>
      </div>
      <div class="mt-5 text-xl text-center">
        Esses são os últimos pedidos recebidos. Para visualizar mais detalhes como os produtos, <br>decidir uma data de entrega, etc, clique no botão Visualizar!
      </div>
    </div>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full border-2 divide-y divide-gray-200">
            <thead class="bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Cidade
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Data de Criação
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Valor Total
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Confirmado?
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Visualizar</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.cliente.nome }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.cliente.cidade }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.dataCriacao }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.valorTotal }}</div>
                </td>
                <div v-if="order.confirmado">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">CONFIRMADO</div>
                  </td>
                </div>
                <div v-else>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">NÃO CONFIRMADO</div>
                  </td>
                </div>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Visualizar</a>
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
const orders = [
  {
    id: 1,
    cliente: {
      nome: 'Colégio Estadual do Setor Finsocial',
      cidade: 'Goiânia'
    },
    dataCriacao: '28/11/2021',
    valorTotal: 'R$ 759,11',
    confirmado: true
  },
  {
    id: 2,
    cliente: {
      nome: 'CEPI Dom Abel - SU',
      cidade: 'Goiânia'
    },
    dataCriacao: '28/11/2021',
    valorTotal: 'R$ 1340,25',
    confirmado: true
  },
  {
    id: 3,
    cliente: {
      nome: 'CEPI Edmundo Pinheiro de Abreu',
      cidade: 'Goiânia'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 500,00',
    confirmado: false
  },
  {
    id: 4,
    cliente: {
      nome: 'CEPI Cultura e Cooperativismo',
      cidade: 'Goiânia'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 227,84',
    confirmado: false
  },
  {
    id: 5,
    cliente: {
      nome: 'CEPI Professor Alfredo Nasser',
      cidade: 'Anicuns'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 844,95',
    confirmado: false
  },
  {
    id: 6,
    cliente: {
      nome: 'Colégio Estadual Alfredo Nasser',
      cidade: 'Britânia'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 937,42',
    confirmado: false
  },
  {
    id: 7,
    cliente: {
      nome: 'CEPMG Padre Pelágio',
      cidade: 'Goianira'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 735,21',
    confirmado: false
  },
  {
    id: 8,
    cliente: {
      nome: 'Colégio Estadual São Geraldo',
      cidade: 'Goianira'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 675,33',
    confirmado: false
  },
  {
    id: 9,
    cliente: {
      nome: 'Colégio Estadual do Setor Palmito',
      cidade: 'Goiânia'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 536,50',
    confirmado: false
  },
  {
    id: 10,
    cliente: {
      nome: 'Colégio Estadual Damiana de Cunha',
      cidade: 'Goiânia'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 512,48',
    confirmado: false
  },
  {
    id: 11,
    cliente: {
      nome: 'CEPI Professora Lousinha de Carvalho',
      cidade: 'Goiânia'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 2201,99',
    confirmado: false
  },
  {
    id: 12,
    cliente: {
      nome: 'CEPI Joaquim Edson de Camargo',
      cidade: 'Goiânia'
    },
    dataCriacao: '29/11/2021',
    valorTotal: 'R$ 810,99',
    confirmado: false
  }
]

export default {
  setup () {
    return {
      orders
    }
  }
}
</script>
