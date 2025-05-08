import { projectsQuery, type Projects } from '@/utils/SupaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          console.log('cached and fresh data matched')
          return
        } else {
          console.log('something has changed')
          loadProjects.delete('projects')
        }
      })
    }
  }
  const getProjects = async () => {
    validateCache()

    const { data, error, status } = await loadProjects('projects')
    if (error) useErrorStore().setError({ error, customCode: status })
    projects.value = data
  }

  return {
    projects,
    getProjects,
  }
})
