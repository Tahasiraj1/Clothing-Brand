"use client"

import React, { useState } from 'react';
import products from '@/lib/productsData';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { useCart } from '@/lib/CartContext';
import { ArrowLeft } from 'lucide-react';
import { Heart } from 'lucide-react';
import { TiStar } from "react-icons/ti";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";


const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null)

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )

      const { addToCart } = useCart();

      const handleAddToCart = () => {
        if (selectedColor && selectedSize) {
            addToCart({
                id: product?.id as string,
                image: product?.image as string,
                name: product?.name as string,
                price: product?.price as number,
                quantity: 1,
                color: selectedColor,
                size: selectedSize,
            });
        } else {
            alert('Please select a size and color.');
        }
      };

    const params = useParams();
    const productId = params.id;
    const product = products.find((product) => product.id === productId);

    if (!product) return (
        <div className='h-screen items-center flex flex-col gap-2 justify-center'>
            <p className='font-bold text-2xl text-red-500'>
                Product not found
            </p>
            <Link href="/products">
                <Button 
                variant="expandIcon"
                iconPlacement='left'
                Icon={ArrowLeft}
                className='border gap-1 text-lg font-semibold border-emerald-600 rounded-none bg-lime-100 hover:bg-emerald-700 text-black hover:text-white'
                >
                    Back to Products page
                </Button>
            </Link>
        </div>
    )

    return(
        <>
        <div className='flex lg:flex-row sm:flex-col py-20 px-5'>
            <div className='grid grid-cols-2 gap-1'>
            <Image
                src={product.image}
                width={1000}
                height={1000}
                alt={product.name}
                className='w-[400px] h-[500px] object-cover'
            />
            <Image
                src={product.image}
                width={1000}
                height={1000}
                alt={product.name}
                className='w-[400px] h-[500px] object-cover'
            />
            </div>
            <div className='flex flex-col lg:pl-20 pr-5 w-full max-w-2xl'>
                <h1 className='text-5xl mb-9 mt-5 font-bold'>
                    {product.name}
                </h1>
                <p className='text-lg font-bold mb-5'>
                    PKR {product.price}
                </p>
                <span className='flex mb-5'>
                    <TiStar fill='orange' className='w-6 h-6 mr-2' /> {product.ratings}
                </span>
                <p>
                    {product.description}
                </p>
                <div className='flex gap-2 mt-9 items-center'>
                    <label>Colors:</label>
                    {product.colors.map((color) => (
                        <Button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className='border rounded-none bg-lime-100 hover:bg-gray-200 text-black border-gray-500 hover:border-gray-800 active:scale-95 duration-300 transition-transform transform'
                        >
                            {color}
                        </Button>
                    ))}
                </div>
                <div className='flex gap-2 mt-9 items-center'>
                    <label>Sizes:</label>
                    {product.sizes.map((size) => (
                        <Button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className='border rounded-none bg-lime-100 hover:bg-gray-200 text-black border-gray-500 hover:border-gray-800 active:scale-95 duration-300 transition-transform transform'
                        >
                            {size}
                        </Button>
                    ))}
                </div>
                <div className='flex items-center justify-center mt-10 gap-2 drop-shadow-2xl'>
                    <Button
                    variant="expandIcon"
                    Icon={RiShoppingCart2Line}
                    iconPlacement='right'
                    className='border text-lg font-semibold border-emerald-600 w-full rounded-none bg-lime-100 hover:bg-emerald-700 active:bg-emerald-900 active:scale-95 duration-300 transition-transform transform text-black hover:text-white'
                    onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </Button>
                    <Button
                    className='w-18 rounded-none border border-emerald-600 bg-lime-100 hover:bg-gray-200 text-black'
                    >
                        <Heart />
                    </Button>
                </div>
            </div>
        </div>
        <h1 className='py-5 text-4xl font-bold sm:px-12 lg:px-40'>
                You May Also Like
        </h1>
        <div className='w-full sm:px-12 lg:px-20 py-10 flex justify-center'>
            <Carousel className='w-full max-w-[90%] bg-white lg:max-w-[900px] sm:max-w-[290px] md:max-w-[700px] xl:max-w-[1300px]'
            opts={{
                loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                        {products.slice(0, 6).map((product, index) => (
                            <CarouselItem key={index} className='flex flex-col md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
                                <Image
                                src={product.image}
                                alt='product'
                                width={1000}
                                height={1000}
                                className='w-[300px] h-[400px] '
                                />
                                <div className='flex items-center justify-between'>
                                    <h2>
                                        {product.name}
                                    </h2>
                                    <p>
                                        PKR {product.price}
                                    </p>
                                </div>
                                <div className='flex justify-between items-center mt-4 mb-8'> 
                                <Link key={product.id} href={`/products/${product.id}`} passHref>
                                    <Button 
                                    variant="expandIcon" Icon={FaArrowRightLong} iconPlacement="right"
                                    className='items-center flex justify-center hover:bg-emerald-800 hover:text-white bg-lime-100 border border-emerald-800 drop-shadow-2xl rounded-none text-black'>
                                        Order Now
                                    </Button>
                                </Link>
                                    <RiShoppingCart2Line size={25} />
                                </div>
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        </>
    )
};

export default ProductDetails;

