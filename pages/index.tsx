import Head from 'next/head'
import { useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

type IData = {
  title?: string;
  explanation?: string;
  url?: string;
  hdurl?: string;
  date?: string;
}

export default function Home({ datas }:any) {
  return (
    <>
      <Head>
        <title>Image By NASA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://api.nasa.gov/assets/img/favicons/favicon-192.png" />
      </Head>

      <main>
        <h1>{ datas.title }</h1>
        <a href={ datas.hdurl } target="_blank" rel="noopener noreferrer">
          <img src={ datas.url } alt={ datas.url } />
        </a>
        <p>{ datas.explanation }</p>
        <span>{ datas.date }</span>
      </main>
      
    </>
  )
}

export const getStaticProps:GetStaticProps = async (ctx) => {
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}`)
  const datas = await res.json()

  return {
    props: {
      datas
    },
    revalidate: 60 * 60 * 6     // 6 HOURS
  }
}