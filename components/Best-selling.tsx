"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { TiStar } from "react-icons/ti";
import { FaArrowRightLong } from "react-icons/fa6";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import products from '@/lib/productsData';

const Bestselling = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const bestSellingProducts = products.filter(product => product.tags.includes('Best Selling'));

    return (
        <div className='py-10 px-5 flex flex-col items-center justify-center'>
            <h1 className='font-bold text-4xl mb-6'>
                Best Selling
            </h1>
            <p className='font-poppins mb-10'>
                Get in on the trend with our curated selection of best-selling styles.
            </p>

            <Carousel
                className='w-full rounded-2xl items-center justify-center bg-white lg:max-w-[900px] sm:max-w-[290px] md:max-w-[700px]'
                opts={{
                    loop: true,
                }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {bestSellingProducts.map((product) => (
                        <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                            <Link href={`/products/${product.id}`}>
                                <div className='flex flex-col items-center justify-center relative'>
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={1000}
                                        height={1000}
                                        className='mb-6 w-[300px] h-[350px] object-cover rounded-2xl'
                                    />
                                    <p className='text-center mb-4'>
                                        {product.name}
                                    </p>
                                    <div className='flex flex-row gap-4 text-center items-center justify-center mb-10'>
                                        <p>
                                            PKR {product.price}
                                        </p>
                                        <span className='w-[2px] h-[30px] bg-emerald-800 mx-1'>
                                        </span>
                                        <p className='flex'>
                                            <TiStar fill='orange' className='w-6 h-6 mr-2' /> {product.ratings}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                    <CarouselPrevious className='absolute top-44 left-0 rounded-lg hover:bg-emerald-800 hover:text-white active:scale-95 transition-transform transform duration-300' />
                    <CarouselNext className='absolute top-44 right-0 rounded-lg hover:bg-emerald-800 hover:text-white active:scale-95 transition-transform transform duration-300' />
            </Carousel>

            <Button 
                variant="expandIcon" 
                Icon={FaArrowRightLong} 
                iconPlacement="right"
                className='h-12 w-40 mb-10 font-semibold text-lg hover:scale-105 flex items-center drop-shadow-2xl rounded-full bg-emerald-800 border border-emerald-800 hover:bg-emerald-700 text-white'
            >
                Explore All
            </Button>
            <hr className='w-full h-1 bg-emerald-800' />
        </div>
    )
}

export default Bestselling;
