<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const { profile } = storeToRefs(useAuthStore())


  const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house'
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building-2'
  },
  {
    title: 'My Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check'
  }
]

const accountLinks = [
  {
    title: 'Profile',
    to: `/users/${profile.value?.username}`,
    icon: 'lucide:user'
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: 'lucide:settings'
  },
  {
    title: 'Sign Out',
    icon: 'lucide:log-out'
  }
]

const router = useRouter()

const excuteAction = async (linkTitle: string)=>{
  if(linkTitle === 'Sign Out'){
    const {logout} = await import('@/utils/supaAuth')
    const isLoggedOut = await logout()

    if(isLoggedOut) router.push("/login")
  }
}
defineEmits(['taskClicked' , 'projectClickked'])

const {menuOpen , toggleMenu}  = useMenu()

const windowWidth = useWindowSize().width

watchEffect(()=>{
  if(windowWidth.value > 1024){
    menuOpen.value = true
  }else{
    menuOpen.value = false
  }
})
</script>
<template>
  <aside
class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
:class="{'w-52': menuOpen , 'w-24' :!menuOpen}"
>
<div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
  <Button variant="outline" size="icon" class="w-8 h-8" @click="toggleMenu">
    <iconify-icon icon="lucide:menu"></iconify-icon>
  </Button>

          <DropdownMenu >
          <DropdownMenuTrigger>
              <Button variant="outline" size="icon" class="w-8 h-8">
                <iconify-icon icon="lucide:plus"></iconify-icon>
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem  @click="$emit('taskClicked')" >
              Task
            </DropdownMenuItem>
            <DropdownMenuItem @click="$emit('projectClickked')" >
              Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

</div>

<nav class="flex flex-col gap-2 justify-between h-full relative">
  <div>
    <SideBarLinks :links="links" />
  </div>

  <div class="border-y text-center bg-background py-3">
    <SideBarLinks :links="accountLinks" @actionClicked="excuteAction" />
  </div>
</nav>
</aside>

</template>
