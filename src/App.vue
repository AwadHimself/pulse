<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { useErrorStore } from './stores/error'

const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(() => {
  useAuthStore().trackkAuthChanges()
})

const { user } = storeToRefs(useAuthStore())
const AuthLayout = defineAsyncComponent(() => import('./components/ui/layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(
  () => import('./components/ui/layout/main/GuestLayout.vue'),
)
</script>

<template>
<Transition name="fade" mode="out-in">
  <component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
    <AppErrorPage v-if="errorStore.activeErrorState" />
    <RouterView v-else v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <div :key="route.path" class="w-full">
          <Suspense v-if="Component" :timeout="0">
            <Component :is="Component" ></Component>
            <template #fallback>
              <div
                class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
              >
                <iconify-icon icon="lucide:loader-circle" class="text-6xl animate-spin" />
              </div>
            </template>
          </Suspense>
        </div>
      </Transition>
    </RouterView>
  </component>
</Transition>
</template>
