"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import Bubbles from './Bubbles';

const Hero = () => {
  return (
    <div className='relative flex sm:flex-col md:flex-row items-center justify-center px-6 lg:px-20 py-16 bg-gradient-to-br from-lime-200 to-emerald-100 overflow-hidden'>
      <motion.div 
        className='flex flex-col flex-1 mr-4 z-10'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='font-rufina text-5xl md:text-6xl lg:text-7xl mb-6 text-emerald-800 leading-tight'>
          Discover and<br /> Find Your Own<br /> 
          <span className='relative'>
            Fashion!
            <svg className='absolute -bottom-2 left-0 w-full' viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10 Q50 0, 100 10 T200 10" fill="none" stroke="#059669" strokeWidth="4"/>
            </svg>
          </span>
        </h1>
        <p className='font-poppins mb-8 text-lg text-emerald-700 max-w-md'>
          Explore our curated collection of stylish clothing and accessories tailored to your unique taste.
        </p>
        <Button
          variant="gooeyRight"
          className='w-[180px] h-[60px] text-lg font-semibold hover:bg-emerald-800 hover:text-white bg-lime-100 border-2 border-emerald-800 drop-shadow-xl rounded-full text-emerald-800 transition-all duration-300 transform hover:scale-105'
        >
          EXPLORE NOW
        </Button>
      </motion.div>
      <motion.div
        className='relative flex-1 mt-10 md:mt-0'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/images/bestselling2.jpg"
          alt='Hero-Model'
          width={600}
          height={800}
          className='rounded-2xl drop-shadow-2xl object-cover w-full h-[500px] md:h-[600px] lg:h-[700px]'
        />
        <div className='absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500 rounded-full opacity-20 z-0'></div>
        <div className='absolute -top-6 -right-6 w-24 h-24 bg-lime-400 rounded-full opacity-20 z-0'></div>
      </motion.div>
      <Bubbles />
    </div>
  )
}

export default Hero;
