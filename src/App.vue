<template>
  <menuBar @login="handleLogin" />
  <modal-factory />
  <router-view />
</template>

<script>
import MenuBar from './components/MenuBar/index'
import ModalFactory from './components/ModalFactory'
import useModal from './hooks/useModal'

export default {
  components: { MenuBar, ModalFactory },
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

<style>

</style>
