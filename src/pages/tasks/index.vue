<script setup lang="ts">
import { supabase } from '../../lib/supabaseClient';
import { ref } from 'vue';
import type { Tables } from '../../../database/types';


const tasks = ref<Tables<'tasks'>[] | null>(null);
  (async()=>{
    const { data , error } = await supabase.from('tasks').select()
    if (error) console.log(error)
    tasks.value = data
    console.log('tasks :', tasks.value)
  })()
</script>

<template>
  <div >
    <h1>tasks page</h1>
    <router-link to="/">got to home</router-link>
  </div>
 <ul>
  <li v-for="task in tasks" :key="task.id">
    {{ task.name }}
  </li>
 </ul>
</template>
