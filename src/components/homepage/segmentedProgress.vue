<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  progress: number,
  phases: { icon: string; title: string; status: string }[];
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

function getStatusColor(status: string): string {
  const s = status.toLowerCase();

  if (s.includes('completed')) return 'text-green-600';
  if (s.includes('in progress')) return 'text-orange-500';
  if (s.includes('not started')) return 'text-muted-foreground';
  return '';
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

<div
  v-for="(phase, index) in props.phases"
  :key="index"
  class="mt-5 flex justify-between gap-5 items-center text-muted-foreground "
>
  <div class="flex gap-1.5">
    <iconify-icon :icon="phase.icon"></iconify-icon>
    <p class="w-max">{{ phase.title }}</p>
  </div>

  <separator class="flex-grow" style="width: auto;" />

  <p :class="['w-max', getStatusColor(phase.status)]">{{ phase.status }}</p>
</div>

</template>
