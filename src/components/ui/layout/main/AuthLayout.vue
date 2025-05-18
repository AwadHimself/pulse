<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore());
const TaskSheetOpen = ref(false)
const ProjectSheetOpen = ref(false)

const {menuOpen}  = useMenu()


</script>

<template>
  <SideBar
  @task-clicked="TaskSheetOpen = true"
  @project-clickked="ProjectSheetOpen = true"
   />
  <AppNewTask v-model="TaskSheetOpen" />
  <AppNewProject v-model="ProjectSheetOpen" />
  <div class="flex flex-col  transition-[margin]"
  :class="{'ml-52': menuOpen , 'ml-24' :!menuOpen}">
    <TopNav />

    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
