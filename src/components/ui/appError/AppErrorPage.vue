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
  router.afterEach(()=>{
    useErrorStore().activeErrorState = null
  })
</script>
<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">{{ customCode || code }}</h1>
      <h1 class="error__code" v-if="statusCode">Status Code : {{ statusCode }}</h1>
      <p class="error__msg">{{ message }}</p>
      <p v-if="hint">{{ hint }}</p>
      <p v-if="details">{{ details }}</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
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
