<script setup lang="ts">
usePageStore().pageData.title = 'Home Page'
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-4 w-full justify-between">
    <HomeCard
      title="Tasks Due Today"
      description="Across 6 ongoing projects"
      icon="lucide:notebook-pen"
      color="bg-blue-700"
      :num="4"
      withBtn
    />
    <HomeCard
      title="Overdue Tasks"
      description="Resolve to avoid projects dealy"
      icon="lucide:triangle-alert"
      :num="1"
      color="bg-red-500"
    />
    <HomeCard
      title="Active Projects"
      description="Updated in the last 7 days"
      icon="lucide:activity"
      :num="5"
      color="bg-green-700"
    />
  </div>
  <div>
    <h1>home page</h1>
  </div>
</template>
