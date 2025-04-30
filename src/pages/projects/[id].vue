<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()

</script>

<template>
  <div>
    <h1>project {{route.params.id}}</h1>
    <router-link to="/">got to home</router-link>
  </div>
</template>
