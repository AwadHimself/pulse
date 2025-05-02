<script setup lang="ts">
import TopNav from '@/components/ui/layout/TopNav.vue';
import SideBar from '@/components/ui/layout/SideBar.vue';
</script>

<template>
  <SideBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNav />

    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Page Title</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
