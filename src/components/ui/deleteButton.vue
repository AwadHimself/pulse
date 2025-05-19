<script setup lang="ts">
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  const deleteLoading = ref(false)
  const router = useRouter()

const props = defineProps<{
  deletefun: () => Promise<void>;
  }>();

  const TriggerDelete = async ()=>{
    deleteLoading.value = true
    await props.deletefun()
    deleteLoading.value = false
    toast("Deleted successfully", {
  "theme": "colored",
  "type": "error",
})
setTimeout(() => {
    router.push({name: '/'})
}, 3000);
  }
</script>

<template>
      <Button variant="destructive" class="self-end mt-4! w-full max-w-40 cursor-pointer" @click="TriggerDelete">
      <Transition name="scale" mode="out-in">
        <iconify-icon v-if="deleteLoading" icon="lucide:loader-circle" class="mr-1 animate-spin"></iconify-icon>
        <iconify-icon v-else icon="lucide:trash-2" class="mr-1"></iconify-icon>
      </Transition>
      Delete
    </Button>

</template>
