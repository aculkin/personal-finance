import Head from 'next/head'
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Finance App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to my finance app
        </h1>
      </main>
    </div>
  )
}