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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";


const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null)

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )

      const { toast } = useToast();
      const { addToCart } = useCart();

      const handleAddToCart = () => {
        if (selectedColor && selectedSize) {
            addToCart({
                id: product?.id as string,
                image: product?.images ? product.images[0] : '',
                name: product?.name as string,
                price: product?.price as number,
                quantity: 1,
                color: selectedColor,
                size: selectedSize,
            });
            toast({
                title: "Success!",
                description: "Item is added to cart.",
                duration: 5000,
              });
        } else {
            // alert('Please select a size and color.');
            toast({
                title: "Error",
                description: "Please select a size and color.",
                variant: "destructive",
                duration: 5000,
              });
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
        <div className='flex lg:flex-row sm:flex-col pt-10 pb-20 px-5'>
                <ScrollArea className='drop-shadow-lg rounded-2xl'>
                <div className='flex space-x-2'>
                    {product.images.map((image, index) => (
                        <Image
                        key={index}
                        src={image}
                        alt={`Image ${index + 1} of ${product.name}`}
                        width={1000}
                        height={1000}
                        className='w-[400px] h-[500px] object-cover rounded-2xl'
                        />
                    ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            <div className='flex flex-col lg:pl-20 pr-5 w-full max-w-2xl'>
                <h1 className='text-3xl mb-9 mt-5 font-bold'>
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
                <div className='mt-9 items-center justify-center'>
                    <Select onValueChange={setSelectedColor}>
                        <SelectTrigger className='w-[180px] rounded-full bg-lime-100 border-emerald-600 focus:ring-0'>
                            <SelectValue placeholder="Select Color:" />
                        </SelectTrigger>
                        <SelectContent className='bg-lime-200 rounded-xl border border-emerald-600 drop-shadow-2xl'>
                            <SelectGroup>
                                <SelectLabel>Colors</SelectLabel>
                                {product.colors.map((color) => (
                                    <SelectItem key={color} value={color}>
                                        {color}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-4 flex items-center'>
                    <Select onValueChange={setSelectedSize}>
                        <SelectTrigger className='w-[180px] rounded-full bg-lime-100 border-emerald-600 focus:ring-0'>
                            <SelectValue placeholder="Select Size:" />
                        </SelectTrigger>
                        <SelectContent className='bg-lime-200 rounded-xl border border-emerald-600 drop-shadow-2xl'>
                            <SelectGroup>
                                <SelectLabel>Sizes</SelectLabel>
                                {product.sizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center justify-center mt-10 gap-2'>
                    <Button
                    variant="expandIcon"
                    Icon={RiShoppingCart2Line}
                    iconPlacement='right'
                    className='border text-lg rounded-full font-semibold border-emerald-600 w-full bg-lime-100 hover:bg-emerald-700 active:bg-emerald-900 active:scale-95 duration-300 transition-transform transform text-black hover:text-white drop-shadow-xl'
                    onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </Button>
                    <Button
                    className='w-18 border rounded-full border-emerald-600 bg-lime-100 hover:bg-gray-200 text-black drop-shadow-xl'
                    >
                        <Heart />
                    </Button>
                </div>
            </div>
        </div>
        <h1 className='py-2 text-3xl lg:text-4xl font-bold px-5 lg:px-40'>
                You May Also Like
        </h1>
        <div className='w-full px-5 py-10 flex justify-center'>
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
                                src={product.images[0]}
                                alt='product'
                                width={1000}
                                height={1000}
                                className='w-[300px] h-[400px] relative rounded-2xl'
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
                                    className='items-center flex justify-center hover:bg-emerald-800 hover:text-white bg-lime-100 border border-emerald-800 drop-shadow-xl rounded-full text-black'>
                                        Order Now
                                    </Button>
                                </Link>
                                    <div className='flex'>
                                        <TiStar fill='orange' className='w-6 h-6 mr-2' /> {product.ratings}
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious className='absolute top-44 left-0 rounded-lg active:scale-95 transition-transform transform duration-300' />
                <CarouselNext className='absolute top-44 right-0 rounded-lg active:scale-95 transition-transform transform duration-300' />
            </Carousel>
        </div>
        </>
    )
};

export default ProductDetails;



{/* <Image
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
/> */}


{/* <div className='flex gap-2 mt-9 items-center'>
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
</div> */}