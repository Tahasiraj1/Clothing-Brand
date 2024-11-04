import React from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import Bestselling from '@/components/Best-selling';
import Products from '@/components/Products';

const page = () => {
  return (
    <>
      <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Rufina:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Hero />
      <Bestselling />
      <Products />
    </>
  )
}

export default page
