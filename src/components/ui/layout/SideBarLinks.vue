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

  const {menuOpen}  = useMenu()


 </script>

<template>
    <template  v-for="link in links" :key="link.title">

      <RouterLink
      v-if="link.to"
      exact-active-class="text-primary bg-muted!"
      :to="link.to"
      :class="{'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary  text-muted-foreground"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
    <span class=" text-nowrap"
      :class="{'block': menuOpen , 'hidden': !menuOpen}">
      {{link.title}}
    </span>
    </RouterLink>

    <div v-else
    @click="emitActionClicked(link.title)"
    :class="{'justify-normal': menuOpen, 'justify-center': !menuOpen }"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary  text-muted-foreground cursor-pointer">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class=" text-nowrap"
      :class="{'block': menuOpen , 'hidden': !menuOpen}"
      >{{link.title}}</span>
    </div>
    </template>
</template>
