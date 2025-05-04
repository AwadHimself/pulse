<script setup lang="ts">
import { projectsQuery } from '@/utils/SupaQueries'
import {columns} from '@/utils/table-cols/ProjectsCols'
import type { Projects } from '@/utils/SupaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)
const getProjects = async () => {
  const { data, error, status} = await projectsQuery

  if (error)  useErrorStore().setError({error , customCode:status})
  projects.value = data
}

await getProjects()


</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
