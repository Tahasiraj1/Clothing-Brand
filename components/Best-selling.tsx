"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { TiStar } from "react-icons/ti";
import { FaArrowRightLong } from "react-icons/fa6";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const Bestselling = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
      )

  return (
    <div className='lg:py-20 px-20 flex flex-col items-center justify-center'>

      <h1 className='font-bold text-5xl mb-6 text-emerald-800'>
        Best Selling
      </h1>
      <p className='font-poppins mb-10 text-lg text-emerald-900'>
       Get in on the trend with our curated selection of best-selling styles.
      </p>


      <Carousel
      className='w-full items-center justify-center bg-white lg:max-w-[900px] sm:max-w-[290px] md:max-w-[700px]'
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className='flex flex-col items-center justify-center'>
                <Image
                src="/images/bestselling1.jpg"
                alt='best selling cloth 1'
                width={1000}
                height={1000}
                className='mb-6 w-[300px] h-[350px]'
                />
                <p className='text-center mb-4'>
                    Cloth 1
                </p>
                <div className='flex flex-row gap-4 text-center items-center justify-center'>
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
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className='flex flex-col items-center justify-center'>
                <Image
                src="/images/bestselling2.jpg"
                alt='best selling cloth 1'
                width={1000}
                height={1000}
                className='mb-6 w-[300px] h-[350px]'
                />
                <p className='text-center mb-4'>
                    Cloth 2
                </p>
                <div className='flex flex-row gap-4 text-center items-center justify-center'>
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
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className='flex flex-col items-center justify-center'>
                <Image
                src="/images/bestselling3.jpg"
                alt='best selling cloth 1'
                width={1000}
                height={1000}
                className='mb-6 w-[300px] h-[350px]'
                />
                <p className='text-center mb-4'>
                    Cloth 3
                </p>
                <div className='flex flex-row gap-4 text-center items-center justify-center mb-10'>
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
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className='flex flex-col items-center justify-center'>
                <Image
                src="/images/bestselling1.jpg"
                alt='best selling cloth 1'
                width={1000}
                height={1000}
                className='mb-6 w-[300px] h-[350px]'
                />
                <p className='text-center mb-4'>
                    Cloth 1
                </p>
                <div className='flex flex-row gap-4 text-center items-center justify-center'>
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
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className='flex flex-col items-center justify-center'>
                <Image
                src="/images/bestselling2.jpg"
                alt='best selling cloth 1'
                width={1000}
                height={1000}
                className='mb-6 w-[300px] h-[350px]'
                />
                <p className='text-center mb-4'>
                    Cloth 2
                </p>
                <div className='flex flex-row gap-4 text-center items-center justify-center'>
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
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className='flex flex-col items-center justify-center'>
                <Image
                src="/images/bestselling3.jpg"
                alt='best selling cloth 1'
                width={1000}
                height={1000}
                className='mb-6 w-[300px] h-[350px]'
                />
                <p className='text-center mb-4'>
                    Cloth 3
                </p>
                <div className='flex flex-row gap-4 text-center items-center justify-center mb-10'>
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
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='-translate-y-20' />
        <CarouselNext className='-translate-y-20' />
      </Carousel>

        <Button className='h-12 w-64 mb-10 flex items-center drop-shadow-2xl rounded-none bg-lime-100 border border-emerald-800 hover:bg-emerald-800 text-black hover:text-white'>
            Explore All <FaArrowRightLong />
        </Button>
        <hr className='w-full h-1 bg-emerald-800' />
    </div>
  )
}

export default Bestselling;
