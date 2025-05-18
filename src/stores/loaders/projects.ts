import { deleteProjectQuery, projectQuery, projectsQuery, updateProjectQuery, type Project, type Projects } from '@/utils/SupaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))

  interface validateCacheParams {
    ref: typeof projects | typeof project
    query: typeof projectQuery | typeof projectsQuery
    key: string
    loaderFn: typeof loadProject | typeof loadProjects
  }

  const validateCache = ({ ref, query, key, loaderFn }: validateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }
  const getProjects = async () => {
    projects.value = null
    const { data, error, status } = await loadProjects('projects')
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) projects.value = data

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    })
  }

  const fetchProject = async (slug: string) => {
    project.value = null
    const { data, error, status } = await loadProject(slug)
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) project.value = data

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject,
    })
  }

  const updateProject = async ()=>{
    if(!project.value) return

    const {tasks, id , name, ...rest} = project.value
    const slug = name
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
      const projectProperties = {
    ...rest,
    name,
    slug
  };
    await updateProjectQuery(projectProperties , project.value.id)
  }

    const deleteProject = async ()=>{

      if(!project.value) return

      await deleteProjectQuery(project.value.slug)

    }



  return {
    projects,
    getProjects,
    fetchProject,
    project,
    updateProject,
    deleteProject
  }
})
