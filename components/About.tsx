import React from 'react'
import Image from 'next/image';
import { Button } from './ui/button';
import WhatMakesUsDiff from './WhatMakesUsDiff';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center font-clashDisplay'>
      <h2 className='text-3xl py-20 px-5'>
        A brand built on the love of craftmanship,<br />
        quality and outstanding customer service
      </h2>
      <div className='flex flex-col md:flex-row items-center justify-between bg-white text-black w-full'>
        <div className='flex flex-col gap-8 md:w-1/2 md:pr-8 px-4 md:px-8 pt-20 pb-10 md:py-20'>
          <h2 className='text-2xl md:text-3xl'>
            From a studio in London to a global brand with<br className='hidden md:inline' />
            over 400 outlets
          </h2>
          <p className='text-sm md:text-base'>
            When we started Avion, the idea was simple. Make high quality furniture
            affordable and available for the mass market.
            <br /><br />
            Handmade, and lovingly crafted furniture and homeware is what we live,
            breathe and design so our Chelsea boutique become the hotbed for the
            London interior design community.
          </p>
          <Button
            className='bg-gray-100 hover:bg-gray-200 py-4 px-6 rounded-none text-black w-full md:w-[150px] h-[56px]'
          >
            Get in touch
          </Button>
        </div>
        <div className='md:w-1/2'>
          <Image
            src='/images/bestselling1.jpg'
            alt='Hello'
            width={1000}
            height={1000}
            className='w-full h-auto aspect-square object-cover'
          />
        </div>
      </div>

      <div className='flex flex-col md:flex-row-reverse items-center justify-between bg-white text-black w-full'>
        <div className='flex flex-col gap-8 md:w-1/2 md:pl-8 px-4 md:px-8 pt-20 pb-10 md:py-20'>
          <h2 className='text-2xl md:text-3xl'>
            From a studio in London to a global brand with<br className='hidden md:inline' />
            over 400 outlets
          </h2>
          <p className='text-sm md:text-base'>
            When we started Avion, the idea was simple. Make high quality furniture
            affordable and available for the mass market.
            <br /><br />
            Handmade, and lovingly crafted furniture and homeware is what we live,
            breathe and design so our Chelsea boutique become the hotbed for the
            London interior design community.
          </p>
          <Button
            className='bg-gray-100 hover:bg-gray-200 py-4 px-6 rounded-none text-black w-full md:w-[150px] h-[56px]'
          >
            Get in touch
          </Button>
        </div>
        <div className='md:w-1/2'>
          <Image
            src='/images/bestselling1.jpg'
            alt='Hello'
            width={1000}
            height={1000}
            className='w-full h-auto aspect-square object-cover'
          />
        </div>
      </div>
      <WhatMakesUsDiff />
    </div>
  )
}

export default About
