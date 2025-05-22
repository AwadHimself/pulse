<script setup lang="ts">
usePageStore().pageData.title = 'Home Page'
const projectPhases = [
  {
    icon: 'lucide:timer-reset',
    title: 'Research phase',
    status: 'completed (11th May, 2025)',
  },
  {
    icon: 'lucide:gallery-thumbnails',
    title: 'Design spirit',
    status: 'In Progress',
  },
  {
    icon: 'lucide:braces',
    title: 'Dev Handoff',
    status: 'Not Started',
  },
  {
    icon: 'lucide:file-question',
    title: 'Final QA',
    status: 'Not Started',
  },
];

</script>

<template>
  <div class="grid grid-cols-3 gap-4">
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
  <Card class="col-span-2">
    <CardHeader class="pl-19 relative">
      <iconify-icon icon="lucide:mouse-pointer-2"
      class="text-2xl bg-muted p-3 w-fit rounded-2xl absolute left-4 top-[50%] translate-y-[-50%] "
      ></iconify-icon>
      <CardTitle>Project progress</CardTitle>
      <CardDescription>An overview of your active project milestones and completion status</CardDescription>
    </CardHeader>
    <Separator class="w-[95%]! m-auto" />
    <CardContent>
      <SegmentedProgress :phases="projectPhases" :progress="66" />
    </CardContent>
  </Card>
  <Card class="">
    <CardHeader class="pl-19 relative">
      <iconify-icon icon="lucide:users-round"
      class="text-2xl bg-muted p-3 w-fit rounded-2xl absolute left-4 top-[50%] translate-y-[-50%] "
      ></iconify-icon>
      <CardTitle>Team Activity Feed</CardTitle>
      <CardDescription>Stay updated with what your team say</CardDescription>
    </CardHeader>
    <Separator class="w-[95%]! m-auto" />
    <CardContent class="pr-3 ">
      <div class="flex flex-col gap-3">
        <FeedActivity />
        <FeedActivity />
        <FeedActivity />
        <FeedActivity />
      </div>
    </CardContent>
  </Card>
  </div>
</template>
