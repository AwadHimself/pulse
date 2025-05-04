<script lang="ts" setup>
import { useErrorStore } from '@/stores/error';


const errorStore  = useErrorStore()
const error = ref(errorStore.activeErrorState)

const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const statusCode = ref(0)
const hint = ref('')

if(error.value && !('code' in error.value) ){
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if(error.value && ('code' in error.value)){
  message.value = error.value.message
  details.value = error.value.details
  hint.value = error.value.hint
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0

}

  const router = useRouter()

  const ErrorTemplate =import.meta.env.DEV
  ? defineAsyncComponent(()=>import('@/components/ui/appError/AppErrorDevSec.vue'))
  : defineAsyncComponent(()=>import('@/components/ui/appError/AppErrorProdSec.vue'))

  router.afterEach(()=>{
    useErrorStore().clearError()
  })
</script>
<template>
  <section class="error">
    <ErrorTemplate :message :customCode :code :statusCode :hint :details :isCustomError="errorStore.isCustomError" />
  </section>
</template>

<style  lang="scss">
.error {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2.5rem; // 10 (tailwind scale)
  text-align: center;
  margin-top: -5rem; // -mt-20
  min-height: 90vh;

  &__icon {
    font-size: 3.5rem; // text-7xl
    color: #ef4444; // assuming "text-destructive" is a red tone
  }

  &__code {
    font-weight: 800;
    font-size: 3.5rem;
    color:#2b3f6f;  // assuming "text-secondary" is a gray tone
  }

  &__msg {
    font-size: 1.875rem; // text-3xl
    font-weight: 800;
    color:  #a1a1aa;// assuming "text-primary" is a dark tone
  }

  &-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem; // gap-5
    margin-top: 1.5rem; // mt-6
    font-weight: 300;

    &__text {
      font-size: 1.125rem; // text-lg
      color: #6b7280; // assuming "text-muted-foreground"
    }
  }
}

p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
