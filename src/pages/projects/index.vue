<script setup lang="ts">
import {columns} from '@/utils/table-cols/ProjectsCols'

usePageStore().pageData.title = 'Projects'

const projectLoader = useProjectsStore()
const {projects} = storeToRefs(projectLoader)
const {getProjects} = projectLoader 

await getProjects()


</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
