<script lang="ts" setup>
  interface linkprop {
    title : string ,
    to? : string ,
    icon : string ,
  }
 defineProps<{
    links : linkprop[]
  }>()

  const emits = defineEmits<{
      actionClicked: [string]
  }>()

  const emitActionClicked = (linkTitle: string) =>{
    emits('actionClicked' , linkTitle )
  }

 </script>

<template>
    <template  v-for="link in links" :key="link.title">

      <RouterLink
      v-if="link.to"
      exact-active-class="text-primary bg-muted!"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{link.title}}</span>
    </RouterLink>
    <div v-else
    @click="emitActionClicked(link.title)"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground cursor-pointer">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{link.title}}</span>
    </div>
    </template>
</template>
