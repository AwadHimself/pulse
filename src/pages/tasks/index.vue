<script setup lang="ts">
import {columns} from '@/utils/table-cols/TaskCols'

usePageStore().pageData.title= 'My Tasks'

const tasksLoader = useTasksStore()
const {tasks} = storeToRefs(tasksLoader)
const {fetchTasks} = tasksLoader

await fetchTasks();

const {getGroupedCollabs , groupedCollabs} = useCollabs()
 getGroupedCollabs(tasks.value ?? [])

const ColumnsWithCollabs = columns(groupedCollabs)

</script>

<template>
  <DataTable v-if="tasks"  :columns="ColumnsWithCollabs" :data="tasks" />
</template>
