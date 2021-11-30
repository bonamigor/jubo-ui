<template>
<div class="flex justify-center">
  <div class="base">
    <div class="demo">
      <h1 class="text-4xl lg:text-5xl text-center text-white">Está muito fácil realizar <br class="hidden sm:block" /> os seus pedidos e <br class="hidden sm:block" />controlar a sua verba!</h1>
      <img src="../../assets/images/cesta.png" class="sm:w-1/4 sm:h-1/4" alt="">
    </div>
    <div class="steps">
      <h1 class="text-2xl text-white sm:text-4xl font-bold">Siga os passos:</h1>
      <div class="steps-div">
        <div class="animate__animated animate__fadeInLeft">
          <h1 class="text-lg sm:text-2xl font-bold">1. Login</h1>
          <p class="text-xl">Faça o Login <br class="hidden sm:block" />no nosso aplicativo.</p>
          >
        </div>
        <div class="animate__animated animate__fadeInLeft animate__delay-1s">
          <h1 class="text-lg sm:text-2xl font-bold">2. Pedido</h1>
          <p class="text-xl">Realize o pedido <br class="hidden sm:block" />com produtos da sua estante.</p>
          >
        </div>
        <div class="animate__animated animate__fadeInLeft animate__delay-2s">
          <h1 class="text-lg sm:text-2xl font-bold">3. Confirmação</h1>
          <p class="text-xl">Aguarde a confirmação <br class="hidden sm:block" />do Fornecedor do seu Pedido.</p>
          >
        </div>
        <div class="animate__animated animate__fadeInLeft animate__delay-3s">
          <h1 class="text-lg sm:text-2xl font-bold">4. Entrega</h1>
          <p class="text-xl">Agora é só aguardar <br class="hidden sm:block" />a entrega na sua Escola.</p>
          ✓
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-white justify-center items-center text-center gap-2 pt-10 pb-20">
      <h1>Alguma dúvida?</h1>
      <h1>Entre em contato conosco</h1>
      <h1>(62) 3091-5471</h1>
      <button class=""><a href="mailto:mendesalimentos@hotmail.com">Envie um e-mail para nós!</a></button>
    </div>
  </div>
</div>

</template>

<script>
import useModal from '../../hooks/useModal'

export default {
  setup () {
    const modal = useModal()
    const handleLogin = () => {
      modal.open({ component: 'ModalLogin' })
    }

    return {
      handleLogin
    }
  }
}
</script>

<style lang="postcss" scoped>
.base {
  @apply bg-blue-400 w-full sm:w-10/12 pt-5
}

.demo {
  @apply flex flex-col sm:flex-row justify-center items-center gap-10
}

.steps {
  @apply flex flex-col justify-center items-center text-center mt-5 mb-5 rounded-b-lg
}

.steps-div {
  @apply flex flex-col sm:flex-row gap-5 mt-5
}

button {
  @apply bg-blue-400 hover:bg-gray-400 text-white hover:text-black rounded-full px-2
}

</style>
