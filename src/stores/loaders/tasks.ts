import {
  tasksWithProjectsQuery,
  type Task,
  type TasksWithProjects,
  taskQuery,
  updateTaskQuery,
} from '@/utils/SupaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)
  const loadTask = useMemoize(async (id: number) => await taskQuery(id))

  interface ValidateCacheParams {
    ref: typeof tasks | typeof task
    query: typeof tasksWithProjectsQuery | typeof taskQuery
    key: number | string
    loaderFn: typeof loadTasks | typeof loadTask
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
        // @ts-expect-error: key might be string or number and the function only accept number
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          // @ts-expect-error: key might be string or number and the function only accept number
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const fetchTasks = async () => {
    tasks.value = null
    const { data, error, status } = await loadTasks('tasks')
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) tasks.value = data
    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }

  const fetchTask = async (id: number) => {
    task.value=null
    const { data, error, status } = await loadTask(id)
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) task.value = data
    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loaderFn: loadTask,
    })
  }

  const updateTask = async () => {
    if (!task.value) return

    const { projects, id, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, task.value.id)
  }

  return {
    tasks,
    fetchTasks,
    task,
    fetchTask,
    updateTask,
  }
})
