import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';

const products = [
    {id: 1, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 2, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 3, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 4, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 5, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 6, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 7, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 8, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 9, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 10, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 11, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 12, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 13, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 14, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 15, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 16, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 17, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 18, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 19, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 20, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 21, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 22, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 23, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 24, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 25, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
    {id: 26, name: 'product 1', price: 100, image: '/images/bestselling2.jpg' },
    {id: 27, name: 'product 1', price: 100, image: '/images/bestselling3.jpg' },
    {id: 28, name: 'product 1', price: 100, image: '/images/bestselling1.jpg' },
]

const Products = () => {
  return (
    <div className='w-full flex flex-col bg-lime-200 pb-10 items-center justify-center'>
    <div className='bg-lime-200 py-10 px-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.map((product) => (
            <div key={product.id}>
                <Image 
                src={product.image} 
                alt={product.name}
                width={1000}
                height={1000}
                className='w-full h-auto object-cover'
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
                    <Button className='w-24 items-center flex justify-center hover:bg-emerald-800 hover:text-white bg-lime-100 border border-emerald-800 shadow-2xl rounded-lg shadow-zinc-600 text-black'>
                        Order Now
                    </Button>
                    <RiShoppingCart2Line size={25} />
                </div>
            </div>
        ))}
    </div>
    <Link href="/products">
        <Button className='h-12 mb-10 flex items-center bg-lime-100 border border-emerald-800 hover:bg-emerald-800 text-black hover:text-white'>
                    Explore All <FaArrowRightLong />
        </Button>
    </Link>
    </div>
  )
}

export default Products
