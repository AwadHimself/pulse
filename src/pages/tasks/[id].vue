<script setup lang="ts">
const route = useRoute(`/tasks/[id]`)
const tasksLoader = useTasksStore()
const {task} = storeToRefs(tasksLoader)
const {fetchTask ,updateTask, deleteTask} = tasksLoader
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";



  await fetchTask(Number(route.params.id))

  const {getProfilesById} = useCollabs()
    const collabs =  task.value?.collaborators ? await getProfilesById(task.value?.collaborators) : []

  watch(()=>task.value?.name , ()=>{
    usePageStore().pageData.title = `Task : ${task.value?.name}`
  })


</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Table  v-if="task">
      <TableRow >
        <TableHead> Name </TableHead>
        <TableCell class="w-full">
          <AppInPlaceEditText  v-model="task.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
              <AppInPlaceEditTextarea
              class="h-20"
              v-model="task.description"
              @commit="updateTask"
            />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell>{Lorem ipsum}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell>
          <router-link :to="{name : '/projects/[slug]' , params:{slug: task.projects?.slug || '' }}">
            {{ task?.projects?.name }}.
          </router-link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>
                  <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" />
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
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>
        <TableCell>
          Comments cards goes in here..
          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>
                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <DeleteButton :deletefun="deleteTask" />
  </div>
</template>
