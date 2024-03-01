<script setup lang="ts">
import TopMenu from './components/layout/TopMenu.vue'
import LeftMenu from './components/layout/LeftMenu.vue'
import Index from './components/layout/Index.vue'
import { useUserStore } from './stores/user';

const user = useUserStore()
if (user.token != '') {
  useUserStore().getUserInfo()
}

</script>

<template>
  <div>
    <Index></Index>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
