import type { CustomError, ExtendedPostgrestError } from '@/stores/types/Error';
import type { PostgrestError } from '@supabase/supabase-js';
export const useErrorStore = defineStore('error-store' , ()=>{
  const activeErrorState = ref<null | CustomError | ExtendedPostgrestError >(null)

  const setError = ({error , customCode}:{ error : string | PostgrestError , customCode : number})=>{
    if(typeof error === 'string' ){
      activeErrorState.value = new  Error(error)
      activeErrorState.value.customCode = customCode
      return
    }
    activeErrorState.value = error
    activeErrorState.value.statusCode = customCode
  }
  return {
    activeErrorState,
    setError
  }
})
