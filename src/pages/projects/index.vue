<script setup lang="ts">
import {columns} from '@/utils/table-cols/ProjectsCols'

usePageStore().pageData.title = 'Projects'

const projectLoader = useProjectsStore()
const {projects} = storeToRefs(projectLoader)
const {getProjects} = projectLoader

await getProjects()

const {getGroupedCollabs , groupedCollabs} = useCollabs()
 getGroupedCollabs(projects.value ?? [])

const ColumnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <DataTable v-if="projects" :columns="ColumnsWithCollabs" :data="projects" />
</template>
