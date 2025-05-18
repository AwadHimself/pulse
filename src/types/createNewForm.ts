export interface createNewTask{
  name : string
  description: string
  project_id: number
  profile_id : string
}

export interface createNewProject {
  name : string
  slug : string
  description: string
  profile_id : string
}
