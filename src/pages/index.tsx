import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { AccountsChart } from '../components'
import { AppLayout } from '../layouts'
import Database from '../../types'

const Home = () => {
  return (
    <AppLayout>
      <AccountsChart />
    </AppLayout>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx)
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
      user: session.user,
    },
  }
}

export default Home
