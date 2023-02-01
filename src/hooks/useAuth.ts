import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

import { supabase } from '../../lib/initSupabase'

const useAuth = () => {
  const [user, setUser] = useState(null)

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

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      setUser(null)
      console.log(error)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return { user, signOut, login, signup }
}

export { useAuth }
