import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import styles from '../styles/home.module.scss'

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/login");
    },100)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>CyberVet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src={require('assets/images/cyber-vet-logo.png')} alt="cyber vet logo" />
        <Loader />
      </main>
    </div>
  )
}