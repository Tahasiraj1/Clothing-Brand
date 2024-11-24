import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaArrowRightLong } from "react-icons/fa6";
import  products  from '@/lib/productsData';
import Link from 'next/link';
import { TiStar } from 'react-icons/ti';

const ProductsPage = () => {
    return (
        <div className='py-10 px-5 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {products.map((product) => (
                <div key={product.id}>
                    <div className="relative w-full overflow-hidden">
                        <Image 
                            src={product.images[0]} 
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="w-full h-auto object-cover opacity-100 hover:opacity-0 duration-300 hover:scale-110 transition-transform transform"
                        />
                        <Image 
                            src={product.images[1]} 
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="w-full h-auto object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 duration-300 hover:scale-110 transition-transform transform"
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
                    <div className='flex'>
                        <TiStar fill='orange' className='w-6 h-6' /> {product.ratings}
                    </div>
                    </div>
                </div>
            ))}
        </div>
      );
}

export default ProductsPage
