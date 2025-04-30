<script setup lang="ts">


</script>

<template>
  <div>
    <h1>home page</h1>
    <router-link :to="{name : '/projects/[id]', params : {id:1}}">got to project 1</router-link>
  </div>
</template>
