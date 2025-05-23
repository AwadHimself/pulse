import { supabase } from '@/lib/supabaseClient'
import type { createNewProject, createNewTask } from '@/types/createNewForm'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
   *,
   tasks (
    id,
    name,
    status,
    due_date
   )
  `
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

export const updateProjectQuery = (updatedProject = {} , id:number) => {
  return supabase
  .from('projects')
  .update(updatedProject)
  .eq('id' , id)
}



export const taskQuery = (id: number) => {
  return supabase
    .from('tasks')
    .select(
      `
      *,
      projects (
        id,
        name,
        slug
      )
    `
    )
    .eq('id', id)
    .single()
}
export type Task = QueryData<ReturnType<typeof taskQuery>>

export const updateTaskQuery = (updatedTask = {}, id: number) => {
  return supabase.from('tasks').update(updatedTask).eq('id', id)
}


export const profileQuery = ({column , value}:{column : string , value:string }) => {
  return supabase.from('profiles').select().eq(column , value).single()
}

export const profilesQuery = supabase.from('profiles').select('id , full_name')

export const collabsQuery = (userIds : string[]) =>
  supabase
  .from('profiles')
  .select(
    'username , avatar_url , id , full_name '
  ).in('id' , userIds )

export type Collabs = QueryData<ReturnType<typeof collabsQuery>>


export const crateNewProjectQuery = (newProject : createNewProject) =>{
  return supabase.from('projects').insert(newProject)
}

export const deleteProjectQuery = (slug : string) =>{
  return supabase.from('projects').delete().eq('slug' , slug)
}



export const crateNewTaskQuery = (newTask : createNewTask) =>{
  return supabase.from('tasks').insert(newTask)
}

export const deleteTaskQuery = (id : number) =>{
  return supabase.from('tasks').delete().eq('id' , id)
}
