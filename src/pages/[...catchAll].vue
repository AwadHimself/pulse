<script setup lang="ts">
import AppErrorPage from '@/components/ui/appError/AppErrorPage.vue';
import { useErrorStore } from '@/stores/error';
useErrorStore().setError({error : 'Page Not Found' , customCode : 404})
</script>

<template>
  <AppErrorPage />
</template>
