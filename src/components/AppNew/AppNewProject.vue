<script lang="ts" setup>
import type { createNewProject } from '@/types/createNewForm';
import { projectsQuery , profilesQuery, crateNewProjectQuery } from '@/utils/SupaQueries';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const sheetOpen = defineModel<boolean>()

type selectOption = {label:string , value: number | string}

const selectOptions = ref({
  projects : [] as selectOption[],
  profiles : [] as selectOption[]
})

const getProfilesOptions = async ()=>{
  const {data : allProfiles} = await profilesQuery

  if(!allProfiles) return

  allProfiles.forEach(profile => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id
    })
  });
}

const getOptions = async ()=>{
  await Promise.all([getProfilesOptions()])
}

getOptions()

const name = ref('')
const slug = ref('')


watch(name, (newVal) => {
  slug.value = newVal
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
})



const {profile} = storeToRefs(useAuthStore())

const createProject = async (formData : createNewProject)=>{
  const project = {
    ...formData,
    collaborators : [profile.value!.id]
  }
  const {error} = await crateNewProjectQuery(project)
  if(error){
    console.log(error);
  }

  sheetOpen.value=false
  toast("New project Created", {
  "theme": "colored",
  "type": "success"
})

}
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new project</SheetTitle>
      </SheetHeader>

      <FormKit type="form" @submit="createProject" style="padding: 15px;" submit-label="Create Project"
      :config="{
      validationVisibility:'submit'
      }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new project"
          validation="required | length : 1255"
          v-model="name"
        />
        <FormKit
          type="text"
          name="slug"
          id="slug"
          label="slug"
          placeholder="My-new-project"
          validation="required | length : 1255"
          v-model="slug"
        />
        <FormKit
          type="select"
          name="collaborators"
          id="collaborators"
          label="User"
          placeholder="Select a user"
          :options="selectOptions.profiles"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="project description"
          validation="length :0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
