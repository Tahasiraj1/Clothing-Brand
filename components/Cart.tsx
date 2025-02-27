"use client";

import React from 'react';
import { useCart, CartItem } from '@/lib/CartContext';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const Cart = () => {
    const { cart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();

    const totalPrice = cart.reduce((sum, item) => item.price * item.quantity + sum, 0 );

    const handleRemoveFromCart = (item: CartItem) => {
        removeFromCart(item);
    };

  return (
    <div className='flex sm:flex-col md:flex-row w-full min-h-screen bg-gray-100'>
        <div className='flex-1 pt-10 md:pb-20 w-full'>
            {cart.length === 0 ? (
                <p className='h-screen text-2xl items-center justify-center flex'>
                    <Image
                    src="/svg/basket-outline-red-svgrepo-com.svg"
                    alt='Basket SVG'
                    width={100}
                    height={100}
                    />
                    Your cart is empty
                </p>
            ) : (
                <div className="flex flex-col gap-y-4">
                    <div className='flex justify-start items-center mx-5'>
                        <h1 className='font-bold text-3xl my-5'>Your Cart</h1>
                    </div>
                {cart.map((item) => (
                    <div className='flex flex-col border rounded-xl items-center justify-center mx-2 bg-white drop-shadow-lg' 
                    key={`${item.id}-${item.color}-${item.size}`}
                    >
                        <div className='flex justify-between w-full pl-5'>
                            <div className='flex sm:flex-col md:flex-row items-center justify-center py-5 sm:gap-y-3 md:gap-y-0 w-full'>
                                <Image
                                src={urlFor(item.image).url()}
                                alt={item.name}
                                width={150}
                                height={150}
                                className='mr-2 rounded-xl drop-shadow-md'
                                />
                                <div className='flex flex-col gap-2 w-full items-center'>
                                    <h2 className='font-bold text-xl'>
                                        {item.name}
                                    </h2>
                                    <span>
                                        Size: {item.size}
                                    </span>
                                    <span>
                                        Color: {item.color}
                                    </span>
                                    <div className='flex items-center w-fit bg-lime-100 pl-2 rounded-full'>
                                        <span className='mr-2'>Qty: </span>
                                        <Button className='bg-lime-100 rounded-l-full text-black hover:bg-lime-200 active:scale-110 transition-transform transform duration-300' 
                                        onClick={() => decrementQuantity(item)}>
                                            <Minus size={15} />
                                        </Button>
                                        <p className='mx-2'><strong>{item.quantity}</strong></p>
                                        <Button className='bg-lime-100 rounded-r-full text-black hover:bg-lime-200 active:scale-110 transition-transform transform duration-300' 
                                        onClick={() => incrementQuantity(item)}>
                                            <Plus size={15} />
                                        </Button>
                                    </div>
                                    <div className='flex justify-between rounded-full items-center w-full bg-lime-100 py-2 px-4'>
                                        <span>
                                            Each: <strong>Rs {item.price}</strong>
                                        </span>
                                        <span className='h-5 w-[2px] bg-emerald-700 mx-2'></span>
                                        <span>
                                            Total: <strong>Rs {item.price * item.quantity}</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button 
                                className='flex justify-center rounded-full items-end w-full bg-red-200 hover:bg-red-300'
                                onClick={() => handleRemoveFromCart(item)}>
                                    <X className='text-red-500 active:rotate-180 transition-transform transform duration-300' />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
        {cart.length > 0 && (
            <div className='flex w-full md:max-w-[30%] h-fit md:py-20 sm:py-5 px-2 sticky top-[133px] drop-shadow-lg'>
                <div className='flex flex-col bg-white h-auto w-full px-5 pb-5 border rounded-xl'>
                    <h1 className='my-5 mx-10 items-center justify-center flex font-bold text-2xl'>
                        Order Summary
                    </h1>
                    <hr className='w-full bg-emerald-800 h-[2px]' />
                    <div className='flex items-center justify-between my-5'>
                        <span className='font-semibold text-lg'>SubTotal:</span>
                        <span><strong>{totalPrice}</strong></span>
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                        <span className='font-semibold text-lg'>Delivery:</span>
                        <span><strong>{100}</strong></span>
                    </div>
                    <hr className='w-full bg-emerald-800 h-[2px]' />
                    <div className='flex items-center justify-between py-5'>
                        <span className='font-semibold text-lg'>GrandTotal:</span>
                        <span><strong>{totalPrice + 100}</strong></span>
                    </div>
                    <Link href="/checkout">
                    <Button
                    variant="expandIcon" Icon={FaArrowRightLong} iconPlacement="right"
                    className='w-full rounded-full font-bold text-lg bg-emerald-800 hover:bg-emerald-700 mb-2 text-white'
                    >
                        Proceed
                    </Button>
                    </Link>
                    <Button 
                        variant="expandIcon" Icon={Trash2} iconPlacement="right"
                        className='text-primary-foreground relative bg-primary z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-red-400 after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%] rounded-full font-bold text-lg hover:bg-red-500 bg-red-600'
                        onClick={clearCart}>
                            Clear Cart
                    </Button>
                </div>
            </div>
        )}
    </div>
  );
}

export default Cart;