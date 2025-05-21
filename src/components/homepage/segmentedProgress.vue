<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  progress: number
}>()

const barColorClass = ref('')
const textColorClass = ref('')

if (props.progress <= 25) {
  barColorClass.value = 'bg-red-700'
  textColorClass.value = 'text-red-700'
} else if (props.progress > 25 && props.progress <= 50) {
  barColorClass.value = 'bg-red-400'
  textColorClass.value = 'text-red-400'
} else if (props.progress >50 && props.progress <= 75) {
  barColorClass.value = 'bg-orange-400'
  textColorClass.value = 'text-orange-400'
} else {
  barColorClass.value = 'bg-green-600'
  textColorClass.value = 'text-green-600'
}
</script>

<template>
  <div class="main-container flex gap-1 justify-between">
    <div class="relative w-[500px]">
      <div class="flex gap-1">
        <template v-for="i in 50" :key="i">
          <span class="w-1.5 h-8 bg-muted rounded-b-2xl rounded-t-2xl"></span>
        </template>
      </div>

      <div class="overflow-hidden absolute top-0" :style="{ width: progress + '%' }">
        <div class="flex gap-1 w-[500px]">
          <template v-for="i in 50" :key="'bar-' + i">
            <span :class="`w-1.5 h-8 rounded-b-2xl rounded-t-2xl ${barColorClass}`"></span>
          </template>
        </div>
      </div>
    </div>

    <p
      :class="['py-2 px-4 bg-muted rounded-lg flex justify-center items-center', textColorClass]"
    >
      {{ progress }}% completed
    </p>
  </div>
</template>
