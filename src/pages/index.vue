<script setup lang="ts">
usePageStore().pageData.title = 'Home Page'
</script>

<template>
  <div class="flex flex-wrap lg:flex-nowrap flex-row gap-4 w-full justify-between">
    <HomeCard
      title="Tasks Due Today"
      description="Across 6 ongoing projects"
      icon="lucide:notebook-pen"
      color="bg-blue-700"
      :num="4"
      withBtn
      footer="Last Synced on 1 min ago"

    />
    <HomeCard
      title="Overdue Tasks"
      description="Resolve to avoid projects dealy"
      icon="lucide:triangle-alert"
      :num="1"
      color="bg-red-500"
      withlink
      footer="3 to Resolve today"
      theme="fail"
    />
    <HomeCard
      title="Active Projects"
      description="Updated in the last 7 days"
      icon="lucide:activity"
      :num="5"
      color="bg-green-700"
      withlink
      footer="1 new project This week"
      theme="success"
    />
  </div>
  <div class="mt-10">
    <SegmentedProgress :progress="80" />
  </div>
</template>
