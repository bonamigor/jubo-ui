<template>
  <div class="base">
    <div class="header">
      <h1 class="text-lg sm:text-4xl">Está muito fácil <br class="hidden sm:block" />fazer seus pedidos <br class="hidden sm:block" />e controlar a sua verba!</h1>
      <img src="../../assets/images/cafe.png" class="h-80" alt="jubo">
    </div>
    <div class="steps">
      <div class="explain-steps">
        <h1 class="text-4xl">Siga os passos:</h1>
      </div>
      <div class="steps-div">
        <div class="animate__animated animate__fadeInLeft">
          <h1>1. Login</h1>
          <p>Faça o Login <br class="hidden sm:block">no nosso aplicativo.</p>
          >
        </div>
        <div class="animate__animated animate__fadeInLeft animate__delay-1s">
          <h1>2. Pedido</h1>
          <p>Realize o pedido <br class="hidden sm:block">com produtos da sua estante.</p>
          >
        </div>
        <div class="animate__animated animate__fadeInLeft animate__delay-2s">
          <h1>3. Confirmação</h1>
          <p>Aguarde a confirmação <br class="hidden sm:block">do Fornecedor do seu Pedido.</p>
          >
        </div>
        <div class="animate__animated animate__fadeInLeft animate__delay-3s">
          <h1>4. Entrega</h1>
          <p>Agora é só aguardar <br class="hidden sm:block">a entrega na sua Escola.</p>
          ✓
        </div>
      </div>
      <div class="doubts">
        <div>
          <h1 class="text-4xl">Alguma dúvida?</h1>
        </div>
        <div>
          <h1>Entre em contato conosco.</h1>
        </div>
        <div>
          <h1>(62) 3091-5471</h1>
        </div>
        <div>
          <a href="mailto:">Nos envie um e-mail.</a>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer-div">
        <p>jubo soluções © 2021</p>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="postcss" scoped>
.base {
  @apply flex flex-col items-center justify-center text-center
}

.header {
  @apply w-full sm:w-6/12 bg-blue-400 flex flex-col sm:flex-row items-center justify-center gap-2 pt-10 rounded-b-lg
}

.steps {
  @apply flex flex-col h-96 justify-around items-center w-full sm:w-6/12 mt-44 sm:mt-8
}

.explain-steps {
  @apply flex justify-center items-center text-center
}

.steps-div {
  @apply flex flex-col gap-4 sm:flex-row mt-5
}

.doubts {
  @apply flex flex-col items-center justify-center w-full gap-2 bg-blue-400 rounded-lg mt-10 mb-20 sm:mb-1 p-5
}

a {
  @apply bg-white hover:bg-gray-500 text-black hover:text-white rounded-full px-2
}

.footer {
  @apply flex justify-center items-center pt-28
}

.footer-div {
  @apply fixed -bottom-0 bg-blue-400 w-full sm:w-6/12 rounded-t-lg font-medium text-center text-gray-800
}
</style>
