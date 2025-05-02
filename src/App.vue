<script setup lang="ts">
import TopNav from '@/components/ui/layout/TopNav.vue';
import SideBar from './components/ui/layout/SideBar.vue';
</script>

<template>
  <SideBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNav />
    <main>
      <RouterView />
    </main>
  </div>
</template>
