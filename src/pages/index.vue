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
  <div class="mt-5">
      <Card>
    <CardHeader class="pl-19 relative">
      <iconify-icon icon="lucide:mouse-pointer-2"
      class="text-2xl bg-muted p-3 w-fit rounded-2xl absolute left-4 top-[50%] translate-y-[-50%] "
      ></iconify-icon>
      <CardTitle>Project progress</CardTitle>
      <CardDescription>An overview of your active project milestones and completion status</CardDescription>
    </CardHeader>
    <Separator class="w-[95%]! m-auto" />
    <CardContent>
      <SegmentedProgress :progress="77" />
    </CardContent>
  </Card>
  </div>
</template>
