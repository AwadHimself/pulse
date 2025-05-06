import type { LoginForm } from "@/stores/types/AuthForm"
import type { AuthError } from "@supabase/supabase-js"

export const useFormErrors = ()=>{
  const serverErorr = ref('')
  const realTimeErrors = ref()
  const handleServerError = (error:AuthError)=>{
    serverErorr.value=    error.message === 'Invalid login credentials'
    ? 'Incorrect email or password'
    : error.message
  }

  const handleLoginForm =async (FormData : LoginForm) =>{
    realTimeErrors.value = {
      email : [],
      password : []
    }
    const {ValidateEmail , validatePassword} = await import('@/utils/formValidation')

    const emailErrors = ValidateEmail(FormData.email)
    if(emailErrors.length) realTimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(FormData.password)
    if(passwordErrors.length) realTimeErrors.value.password = passwordErrors
  }
  return{
    serverErorr,
    handleServerError,
    realTimeErrors,
    handleLoginForm
  }
}
