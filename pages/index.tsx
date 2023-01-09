import { Button } from '@mui/material'
import Head from 'next/head'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import * as accounts from '../public/exampleData/accounts.json'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Personal Finance App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to my finance app</h1>
        {accounts.map(({ id }) => (
          <div>
            <p>account {id}</p>
            <Button variant="contained">My button</Button>
          </div>
        ))}
      </main>
    </div>
  )
}
