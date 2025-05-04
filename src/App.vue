<script setup lang="ts">
import { useErrorStore } from './stores/error';

  const {activeErrorState} = storeToRefs(useErrorStore())
</script>

<template>
  <AuthLayout >
    <AppErrorPage v-if="activeErrorState" />
    <RouterView v-else v-slot="{Component , route}">
      <Suspense v-if="Component" :timeout="0">
        <Component  :is="Component" :key="route.name"></Component>

        <template #fallback>
          <span>Loading ...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
