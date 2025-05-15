<script setup lang="ts">
  const value = defineModel<'in-progress'| 'completed'>()

  const emit  = defineEmits(['commit'])

  const {readOnly = false} = defineProps<{
    readOnly ?:boolean
  }>()

  const toggleStatus = ()=>{

    if (readOnly) return

    value.value = value.value === 'completed' ? 'in-progress' : 'completed'

    emit('commit')
  }

</script>

<template>
  <div class="text-2xl cursor-pointer" @click="toggleStatus">
  <transition name="scale" mode="out-in">
    <iconify-icon v-if="value==='completed'" icon="lucide:circle-check" class="text-green-500"/>
    <iconify-icon v-else icon="lucide:circle-dot" class="text-orange-500" />
  </transition>
  </div>
</template>
