<template>
  <div class="flex justify-center">
    <navbar>
      <div>
        <img src="../assets/images/logo_jubo.png" class="h-14" alt="">
      </div>
      <div>
        <button class="btn-login">Login</button>
      </div>
    </navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
navbar {
  @apply flex justify-between items-center bg-blue-400 px-4 w-full sm:w-6/12
}

.btn-login {
  @apply bg-white hover:bg-gray-500 text-black hover:text-white rounded-full px-2
}
</style>
