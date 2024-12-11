import React from 'react';
import Hero from '@/components/Hero';
import Bestselling from '@/components/Best-selling';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import WhatMakesUsDiff from '@/components/WhatMakesUsDiff';

const page = () => {
  return (
    <>
      <Hero />
      <Bestselling />
      <Products />
      <Testimonials />
      <WhatMakesUsDiff />
    </>
  )
}

export default page
