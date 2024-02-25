<script setup lang="ts">
import UploadFile from '../components/file/UploadFile.vue'

</script>

<template>
  <div class="about">
    <UploadFile></UploadFile>
  </div>
</template>

<style>

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
