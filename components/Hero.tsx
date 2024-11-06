import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className='flex sm:flex-col md:flex-row items-center justify-center px-14 lg:px-36 py-20 bg-lime-200'>
      <div className='flex flex-col flex-1 mr-4 animate-in slide-in-from-left-full transition-transform transform duration-300'>
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
      className='flex-1 lg:w-full lg:h-[600px] md:w-[400px] md:h-[500px] items-center justify-center rounded-none drop-shadow-2xl animate-in slide-in-from-right-full transition-transform transform duration-300'
      />
    </div>
  )
}

export default Hero
