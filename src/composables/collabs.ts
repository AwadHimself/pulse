import type { GroupedCollabs } from "@/types/GroubedCollabs"
import { collabsQuery, type Projects, type TasksWithProjects } from "@/utils/SupaQueries"

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})
  const getProfilesById = async (userIds : string[]) => {
    const {error , data} = await collabsQuery(userIds)
    if(error || !data ) return [] ;
    return data
  }

  const getGroupedCollabs = async (items : Projects | TasksWithProjects)=>{
    const filtredItems = items.filter((item) => item.collaborators.length)

    const promises = filtredItems.map((item) =>
      getProfilesById(item.collaborators)
  )

    const results = await Promise.all(promises)
    filtredItems.forEach((item , index)=>{
      groupedCollabs.value[item.id] = results[index]
    })
  }

  return{
    getProfilesById,
    getGroupedCollabs,
    groupedCollabs
  }
}
