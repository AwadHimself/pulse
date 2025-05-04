import type { CustomError, ExtendedPostgrestErorr } from '@/stores/types/Error';
import type { PostgrestError } from '@supabase/supabase-js';
export const useErrorStore = defineStore('error-store' , ()=>{
  const activeErrorState = ref<null | CustomError | ExtendedPostgrestErorr >(null)
  const isCustomError = ref(false)
  const setError = ({
    error,
    customCode
  }: {
    error: string | PostgrestError | Error;
    customCode?: number;
  }) => {
    if(typeof error === 'string') isCustomError.value= true
    if (typeof error === 'string' || error instanceof Error) {
      const err: CustomError = typeof error === 'string' ? new Error(error) : error;
      err.customCode = customCode || 500;
      activeErrorState.value = err;
      return;
    }

    const err: ExtendedPostgrestErorr = error;
    err.statusCode = customCode || 500;
    activeErrorState.value = err;
  };

  const clearError = ()=>{
    activeErrorState.value = null 
    isCustomError.value = false
  }

    return {
    activeErrorState,
    setError,
    isCustomError,
    clearError
  }
})
