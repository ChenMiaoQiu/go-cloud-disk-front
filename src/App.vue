<script setup lang="ts">
import TopMenu from './components/layout/TopMenu.vue'
import { useUserStore } from '@/stores/user'

console.log("666" + useUserStore().userToken)

</script>

<template>
  <TopMenu></TopMenu>
  <RouterView />
</template>

<style scoped></style>
