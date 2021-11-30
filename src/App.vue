<template>
  <menuBar @login="handleLogin" />
  <modal-factory />
  <router-view />
  <div class="flex justify-center items-center text-center">
    <div class="footer">jubo solucoes</div>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar/index'
import ModalFactory from './components/ModalFactory'
import useModal from './hooks/useModal'
import { watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from './store/index'

export default {
  components: { MenuBar, ModalFactory },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const modal = useModal()

    const handleLogin = () => {
      modal.open({ component: 'ModalLogin' })
    }

    watch(() => route.path, () => {
      const token = ref(window.localStorage.getItem('token'))
      if (route.meta.hasAuth) {
        if (!token.value) {
          router.push({ name: 'Home' })
        }
      }

      const isAdmin = computed(() => store.getters.isAdmin)
      if (route.meta.isAdmin) {
        if (!isAdmin.value) {
          router.push({ name: 'Home' })
        }
      }
    })

    return {
      handleLogin
    }
  }
}
</script>

<style lang="postcss" scoped>
.footer {
  @apply fixed -bottom-0 bg-blue-400 w-full sm:w-10/12 rounded-t-lg font-medium text-center text-gray-800
}
</style>
