
<script setup lang="ts">
import { projectQuery, type Project } from '@/utils/SupaQueries';



const route = useRoute(`/projects/[slug]`)
  const project = ref<Project | null>(null);

  const fetchProject = async()=>{
    const { data, error , status } = await projectQuery(route.params.slug)
    if (error) useErrorStore().setError({error , customCode:status})
    project.value = data
  }

  watch(()=>project.value?.name , ()=>{
    usePageStore().pageData.title = `project : ${project.value?.name}`
  })

  await fetchProject()
</script>
<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ project.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ project.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in project.collaborators"
            :key="collab"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
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
      <div class="table-container">
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
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> In progress </TableCell>
              <TableCell> 22/08/2024 </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
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

.table-container {
  overflow: hidden;
  overflow-y: auto;
  border-radius: 0.375rem;    // rounded-md → 6px
  background-color: #0f172a;  // bg-slate-900 → #0f172a
  height: 20rem;              // h-80 → 320px
}
td {
  white-space: normal;
}

</style>
