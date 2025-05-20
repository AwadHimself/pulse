<script setup lang="ts">
defineProps<{
  progress: number
}>()
</script>

<template>
  <div class="main-container flex gap-1 justify-between">
    <div class="relative w-[500px]">
      <div class="flex gap-1">
        <template v-for="i in 50" :key="i">
          <span class="w-2 h-12 bg-muted rounded-b-2xl rounded-t-2xl"></span>
        </template>
      </div>

      <div class="overflow-hidden absolute top-0" :style="{ width: progress + '%' }">
        <div class="flex gap-1 w-[500px]">
          <template v-for="i in 50" :key="'orange-' + i">
            <span class="w-2 h-12 bg-orange-400 rounded-b-2xl rounded-t-2xl"></span>
          </template>
        </div>
      </div>
    </div>

    <label class="p-2 bg-muted rounded-lg flex justify-center items-center">
      {{ progress }}% completed
    </label>
  </div>
</template>
