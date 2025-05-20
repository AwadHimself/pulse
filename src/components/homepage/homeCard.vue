<script setup lang="ts">
const footerTheme = ref('')
const footerText = ref('')
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
  },
  withlink : {
    type : Boolean,
    default : false
  },
  footer : {
    type: String,
    default: ''
  },
  theme : {
    type: String,
    default: 'normal'
  }
})
if(props.theme === 'normal'){
   footerTheme.value = 'bg-muted'
   footerText.value = 'text-muted-foreground'
}else if (props.theme === 'success'){
  footerTheme.value = 'bg-success'
  footerText.value = 'text-primary'
}
  else if (props.theme === 'fail'){
  footerTheme.value = 'bg-destructive'
  footerText.value = 'text-primary'
}
</script>

<template>
  <Card class="relative w-full pb-0">
    <CardHeader>
      <CardTitle class="text-xl  ">{{ props.title }}</CardTitle>
      <CardDescription>{{ props.description }}</CardDescription>
      <div
      class="flex justify-center items-center w-8 md:w-12 h-8 md:h-12 rounded-lg md:rounded-2xl  absolute top-4 right-4"
      :class="props.color"
      >
        <iconify-icon :icon="props.icon" class=" text-white text-lg md:text-2xl"></iconify-icon>
      </div>
    </CardHeader>
    <CardContent class="mt-4">
      <div class="flex justify-between items-center">
        <span class="text-4xl">
          {{ props.num }}
        </span>
        <Button variant="outline"  v-if="withBtn">View More<iconify-icon icon="lucide:chevron-right" ></iconify-icon></Button>
      </div>
    </CardContent>
    <CardFooter class="p-0! ">
      <div
      :class="[
        ' w-full  px-7 py-2 flex  rounded-b-xl ' , footerTheme , footerText ,
        withlink ? ' flex justify-between cursor-pointer' : 'justify-center'
      ]">
        <p class="h-6  ">{{ props.footer }}</p>
        <iconify-icon v-if="withlink" icon="lucide:chevron-right" :class="[footerText ,'text-2xl']"></iconify-icon>
      </div>
    </CardFooter>
  </Card>
</template>
