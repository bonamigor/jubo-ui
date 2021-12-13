<template>
<div class="flex justify-center items-center p-4">
  <div class="flex flex-col w-10/12">
    <div class="flex flex-col justrify-center items-center my-5">
      <div class="text-4xl">
        <h1>Olá Fulano!</h1>
      </div>
      <div class="text-xl text-center mt-5">
        Esses são os últimos pedidos recebidos. Para visualizar mais detalhes como os produtos, <br>decidir uma data de entrega, etc, clique no botão Visualizar!
      </div>
    </div>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 border-2">
            <thead class="bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cidade
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Criação
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <div class="text-sm text-green-900 font-bold">CONFIRMADO</div>
                  </td>
                </div>
                <div v-else>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-red-900 font-bold">NÃO CONFIRMADO</div>
                  </td>
                </div>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
  }
  // More people...
]

export default {
  setup () {
    return {
      people,
      orders
    }
  }
}
</script>
