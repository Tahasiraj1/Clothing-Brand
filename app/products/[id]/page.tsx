"use client"

import products from '@/lib/productsData';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { TiStar } from "react-icons/ti";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const ProductDetails = () => {
    const params = useParams();
    const productId = params.id;
    const product = products.find((product) => product.id === productId);

    if (!product) return <p className='h-screen items-center flex justify-center font-bold text-2xl text-red-500'>Product not found</p>;

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
                        className='border rounded-none bg-lime-100 hover:bg-gray-200 text-black border-gray-500 hover:border-gray-800'
                        >
                            {color}
                        </Button>
                    ))}
                </div>
                <div className='flex gap-2 mt-9 items-center'>
                    <label>Sizes:</label>
                    {product.sizes.map((size) => (
                        <Button
                        className='border rounded-none bg-lime-100 hover:bg-gray-200 text-black border-gray-500 hover:border-gray-800'
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
                    className='border text-lg font-semibold border-emerald-600 w-full rounded-none bg-lime-100 hover:bg-emerald-700 text-black hover:text-white'
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
                                <h2>
                                    {product.name}
                                </h2>
                                <p>
                                    PKR {product.price}
                                </p>
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

