
<script setup lang="ts">
import { useProjectsStore } from '@/stores/loaders/projects';



const {slug} = useRoute(`/projects/[slug]`).params

const projectsLoader = useProjectsStore()
const {project} = storeToRefs(projectsLoader)
const {fetchProject , updateProject} = projectsLoader

  watch(()=>project.value?.name , ()=>{
    usePageStore().pageData.title = `project : ${project.value?.name}`
  })

  await fetchProject(slug)

  const {getProfilesById} = useCollabs()

  const collabs =  project.value?.collaborators ? await getProfilesById(project.value?.collaborators) : []
</script>
<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> <AppInPlaceEditText v-model="project.name" @commit="updateProject"/> </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <AppInPlaceEditTextarea v-model="project.description" @commit="updateProject"/>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>
        <AppInPlaceEditStatus v-model="project.status"  @commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in collabs"
            :key="collab.id"
          >
            <RouterLink class="w-full h-full flex items-center justify-center"
            :to="{name: '/users/[username]' , params:{username : collab.username} } ">
              <AvatarImage :src="collab.avatar_url || '' " alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section v-if="project" class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container bg-muted">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell>
                <router-link
                class="text-left block hover:bg-muted p-4"
                :to="{name: '/tasks/[id]' , params: {id: task.id }}">
                  {{ task.name }}
                </router-link>
              </TableCell>
              <TableCell>
                <AppInPlaceEditStatus v-model="task.status" readOnly />
              </TableCell>
              <TableCell> {{task.due_date}} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container bg-muted">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
th {
  width: 100px;
}

h2 {
  margin-bottom: 1rem;       // mb-4 → 1rem
  font-size: 1.125rem;        // text-lg → 18px
  font-weight: 600;           // font-semibold
  width: fit-content;         // w-fit
}

.table-container  {
  overflow: hidden;
  overflow-y: auto;
  border-radius: 0.375rem;    // rounded-md → 6px
  height: 20rem;              // h-80 → 320px
}
td {
  white-space: normal;
}

</style>
