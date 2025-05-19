<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Card Title'
  },
  description :{
    type: String,
    default: 'Card Description'
  },
  icon : {
    type: String,
    default: 'lucide:notebook-pen'
  },
  color : {
    type: String,
    default: 'bg-blue-700'
  },
  num : {
    type : Number,
    default : 5
  },
  withBtn : {
    type : Boolean,
    default : false
  }
})
</script>

<template>
  <Card class="relative w-full pb-0 ">
    <CardHeader>
      <CardTitle class="text-xl">{{ props.title }}</CardTitle>
      <CardDescription>{{ props.description }}</CardDescription>
      <div
      class="flex justify-center items-center w-12 h-12 rounded-2xl  absolute top-4 right-4"
      :class="props.color"
      >
        <iconify-icon :icon="props.icon" class=" text-white text-2xl"></iconify-icon>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between items-center">
        <span class="text-4xl">
          {{ props.num }}
        </span>
        <Button v-if="withBtn">View More<iconify-icon icon="lucide:chevron-right" ></iconify-icon></Button>
      </div>
    </CardContent>
    <CardFooter class="p-0! ">
      <div class=" w-full bg-muted py-3 rounded-b-xl flex justify-center items-center ">
        destructive
      </div>
    </CardFooter>
  </Card>
</template>
