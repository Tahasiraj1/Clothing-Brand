import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { TiStar } from "react-icons/ti";
import { FaArrowRightLong } from "react-icons/fa6";


const Bestselling = () => {
  return (
    <div className='lg:py-20 px-20 bg-lime-200 flex flex-col items-center justify-center'>

      <h1 className='font-roboto text-4xl mb-6 text-emerald-800'>
        Best Selling
      </h1>
      <p className='font-poppins mb-10 text-lg text-emerald-900'>
       Get in on the trend with our curated selection of best-selling styles.
      </p>

      <div className='flex gap-4 sm:flex-col lg:flex-row'>
        <div className='flex flex-col'>
        <Image
            src="/images/bestselling1.jpg"
            alt='best selling cloth 1'
            width={1000}
            height={1000}
            className='mb-6 w-full h-[350px]'
            />
            <p className='text-center mb-4'>
                Cloth 1
            </p>
            <div className='flex flex-row gap-4 text-center justify-center'>
                <p>
                    PKR 1000
                </p>
                <span className='w-[2px] h-[30px] bg-emerald-800 mx-1'>
                </span>
                <p className='flex'>
                <TiStar fill='orange' className='w-6 h-6 mr-2' /> 5.0
                </p>
            </div>
        </div>
        <div className='flex flex-col'>
        <Image
            src="/images/bestselling2.jpg"
            alt='best selling cloth 1'
            width={1000}
            height={1000}
            className='mb-6 w-full h-[350px]'
            />
            <p className='text-center mb-4'>
                Cloth 2
            </p>
            <div className='flex flex-row gap-4 text-center justify-center'>
                <p>
                    PKR 1000
                </p>
                <span className='w-[2px] h-[30px] bg-emerald-800 mx-1'>
                </span>
                <p className='flex'>
                <TiStar fill='orange' className='w-6 h-6 mr-2' /> 5.0
                </p>
            </div>
        </div>
        <div className='flex flex-col'>
            <Image
            src="/images/bestselling3.jpg"
            alt='best selling cloth 1'
            width={1000}
            height={1000}
            className='mb-6 w-full h-[350px]'
            />
            <p className='text-center mb-4'>
                Cloth 3
            </p>
            <div className='flex flex-row gap-4 text-center justify-center mb-10'>
                <p>
                    PKR 1000
                </p>
                <span className='w-[2px] h-[30px] bg-emerald-800 mx-1'>
                </span>
                <p className='flex'>
                <TiStar fill='orange' className='w-6 h-6 mr-2' /> 5.0
                </p>
            </div>
        </div>
      </div>
        <Button className='h-12 w-64 mb-10 flex items-center bg-lime-100 border border-emerald-800 hover:bg-emerald-800 text-black hover:text-white'>
            Explore All <FaArrowRightLong />
        </Button>
        <hr className='w-full h-1 bg-emerald-800' />
    </div>
  )
}

export default Bestselling;
