<script setup lang="ts">
const route = useRoute();
const params = route.params as { slug: string };

</script>

<template>
  <div>
    <h1>project {{params.slug}}</h1>
  </div>
</template>
