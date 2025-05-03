<script setup lang="ts">
import { TaskWithProjectsQuery, type TaskWithProjects } from '@/utils/SupaQueries'
import {columns} from '@/utils/table-cols/TaskCols'



usePageStore().pageData.title= 'My Tasks'
const tasks = ref<TaskWithProjects | null>(null)
const fetchTasks = async () => {
  const { data, error } = await TaskWithProjectsQuery
  if (error) console.log(error)

  tasks.value = data
}
await fetchTasks();


</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
