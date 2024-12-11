import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaArrowRightLong } from "react-icons/fa6";
import  products  from '@/lib/productsData';
import Link from 'next/link';
import { TiStar } from 'react-icons/ti';
import { Badge } from '@/components/ui/badge';

const getBadgeForTag = (tag: string) => {
    switch (tag) {
        case "Best Selling":
            return <Badge className='bg-red-600 hover:bg-red-500 text-white rounded-full'>Best Selling</Badge>;
            case 'On Sale':
                return <Badge className="bg-red-600 hover:bg-red-500 text-white rounded-full">On Sale</Badge>;
              case 'Most Rated':
                return <Badge className="bg-red-600 hover:bg-red-500 text-white rounded-full">Most Rated</Badge>;
              default:
                return null;
    }
};

const ProductsPage = () => {
    return (
        <div className='py-10 px-2 md:px-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5'>
            {products.map((product) => (
                <div key={product.id}>
                    <div className="relative w-full overflow-hidden rounded-2xl">
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
                        <div className="absolute top-0 right-1 flex flex-col gap-0">
                          {product.tags && product.tags.length > 0 ? (
                            product.tags.map((tag, index) => (
                              <div key={index}>{getBadgeForTag(tag)}</div>
                            ))
                          ) : null}
                        </div>
                    </div>
                    <div className='flex md:justify-between items-center px-2 flex-col md:flex-row gap-1 md:gap-0'>
                        <h2 className='mt-2'>
                            {product.name}
                        </h2>
                        <p>
                            PKR {product.price}
                        </p>
                    </div>
                    <div className='flex justify-center md:justify-between items-center mt-4 mb-8 px-2'> 
                    <Link key={product.id} href={`/products/${product.id}`} passHref>
                        <Button 
                        variant="expandIcon" Icon={FaArrowRightLong} iconPlacement="right"
                        className='items-center flex justify-center hover:bg-emerald-800 hover:text-white bg-lime-100 border border-emerald-800 drop-shadow-2xl rounded-3xl text-black'>
                            View Details
                        </Button>
                    </Link>
                    <div className='md:flex hidden'>
                        <TiStar fill='orange' className='w-6 h-6' /> {product.ratings}
                    </div>
                    </div>
                </div>
            ))}
        </div>
      );
}

export default ProductsPage
