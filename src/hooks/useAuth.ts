import {
  useUser,
  useSupabaseClient,
  useSession,
} from '@supabase/auth-helpers-react'
const useAuth = () => {
  const user = useUser()
  const session = useSession()
  const supabase = useSupabaseClient()

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      await supabase.auth.signInWithPassword({ email, password })
    } catch (error) {
      console.error(error)
    }
  }

  const signup = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    await supabase.auth.signUp({
      email,
      password,
    })
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  return { user, signOut, login, signup }
}

export { useAuth }
