import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import  products  from '@/lib/productsData';

const ProductsPage = () => {
    return (
        <div className='py-10 px-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {products.map((product) => (
                <div key={product.id}>
                    <Image 
                    src={product.image} 
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className='w-full h-auto object-cover scale-95 hover:scale-100 duration-300 transition-transform transform'
                    />
                    <div className='flex justify-between items-center'>
                        <h2 className='text-lg font-poppins mt-2'>
                            {product.name}
                        </h2>
                        <p>
                            PKR {product.price}
                        </p>
                    </div>
                    <div className='flex justify-between items-center mt-4 mb-8'> 
                        <Button 
                        variant="expandIcon" Icon={FaArrowRightLong} iconPlacement="right"
                        className='items-center flex justify-center hover:bg-emerald-800 hover:text-white bg-lime-100 border border-emerald-800 drop-shadow-2xl rounded-none text-black'>
                            Order Now
                        </Button>
                        <RiShoppingCart2Line size={25} />
                    </div>
                </div>
            ))}
        </div>
      );
}

export default ProductsPage
