<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import router from './router';

onMounted(() => {
  // You can perform any initial setup here
});
</script>
