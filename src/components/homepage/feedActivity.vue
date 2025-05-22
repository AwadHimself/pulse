<script setup lang="ts"></script>

<template>
  <div class="flex items-center gap-2 ">
    <Avatar class="rounded-xl  w-10 h-10 ">
      <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div>
      <p class="font-light text-sm text-muted-foreground">
        <span class="font-bold text-primary">Mahmoud Awad</span> commented on <span class="font-bold text-primary">pulse</span></p>
      <p class="font-light text-sm text-muted-foreground" >2 mins ago</p>
    </div>
  </div>
</template>
