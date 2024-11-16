import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';
import  products  from '@/lib/productsData';

const Products = () => {
  return (
    <div className='w-full flex flex-col pb-10 items-center justify-center'>
    <div className='py-10 px-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.slice(0, 8).map((product) => (
            <div key={product.id}>
                    <div className="relative w-full">
                    <Image 
                        src={product.images[0]} 
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover opacity-100 hover:opacity-0 duration-300"
                    />
                    <Image 
                        src={product.images[1]} 
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 duration-300"
                    />
                    </div>
                <div className='flex justify-between items-center px-2'>
                    <h2 className='text-lg font-poppins mt-2'>
                        {product.name}
                    </h2>
                    <p>
                        PKR <strong>{product.price}</strong>
                    </p>
                </div>
                <div className='flex justify-between items-center mt-4 mb-8 px-2'> 
                    <Link key={product.id} href={`/products/${product.id}`} passHref>
                        <Button 
                        variant="expandIcon" Icon={FaArrowRightLong} iconPlacement="right"
                        className='items-center flex justify-center hover:bg-emerald-800 hover:text-white bg-lime-100 border border-emerald-800 drop-shadow-2xl rounded-none text-black'>
                            Order Now
                        </Button>
                    </Link>
                    <RiShoppingCart2Line size={25} />
                </div>
            </div>
        ))}
    </div>
    <Link href="/products">
        <Button  variant="expandIcon" Icon={FaArrowRightLong} iconPlacement="right"
        className='w-64 h-12 mb-10 drop-shadow-2xl rounded-none flex items-center bg-lime-100 border border-emerald-800 hover:bg-emerald-800 text-black hover:text-white'>
            Explore All
        </Button>
    </Link>
    </div>
  )
}

export default Products
