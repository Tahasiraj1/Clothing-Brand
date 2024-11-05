import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className='flex sm:flex-col md:flex-row items-center justify-between px-20 lg:px-36 py-20 bg-lime-200'>
      <div className='flex flex-col flex-1'>
        <h1 className='font-rufina text-6xl mb-6 text-emerald-800'>
            Discover and<br /> Find Your Own<br /> Fashion!
        </h1>
        <p className='font-poppins mb-6 text-emerald-800'>
            Explore our curated collection of stylish<br /> clothing and accessories tailored to your unique taste.
        </p>
        <Button
        className='w-[150px] h-[54px] hover:bg-emerald-800 hover:text-white bg-lime-100 border border-emerald-800 drop-shadow-2xl rounded-none text-black sm:mb-20 lg:mb-0'
        >
            EXPLORE NOW
        </Button>
      </div>
      <Image
      src="/images/bestselling2.jpg"
      alt='Hero-Model'
      width={1000}
      height={1000}
      className='flex-1 w-full h-[600px] sm:ml-10 lg:ml-0 rounded-none drop-shadow-2xl'
      />
    </div>
  )
}

export default Hero
