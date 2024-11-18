'use client';

import React from 'react';
import { useCart, CartItem} from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import MyForm from './Form';

const Checkout = () => {
    const { cart, clearCart, removeFromCart } = useCart();

    const handleRemoveFromCart = (item: CartItem) => {
        removeFromCart(item);
    };

    if (!cart || cart.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-xl font-bold'>Your cart is empty!</p>
                <Link href="/products">
                    <Button className='bg-emerald-800 text-white rounded-none hover:bg-emerald-600 mt-4'>Back to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row w-full p-10 justify-between">
            <div className="w-full md:w-[55%]">
                <h1 className='text-3xl font-bold'>Checkout</h1>
                <MyForm />
            </div>
                <div className='w-full md:w-[40%] h-fit flex flex-col border sticky top-36 py-4 px-2'>
                    {cart.map((item) => (
                        <div key={item.id} className='flex items-center gap-4 rounded-none'>
                        <div>
                            <button 
                            className='flex justify-center hover:bg-red-200'
                            onClick={() => handleRemoveFromCart(item)}>
                                <X className='text-red-500 active:rotate-180 transition-transform transform duration-300' />
                            </button>
                        </div>
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                                className='w-20 h-20 object-cover'
                            />
                            <div className='flex-1'>
                                <h2 className='text-lg font-semibold'>{item.name}</h2>
                                <p className='text-sm'>Size: {item.size}</p>
                                <p className='text-sm'>Color: {item.color}</p>
                                <p className='text-sm'>Quantity: {item.quantity}</p>
                            </div>
                            <p className='text-md font-bold'>PKR {item.price * item.quantity}</p>
                        </div>
                    ))}
                    <div className='mt-8 flex justify-between'>
                        <h2 className='text-xl font-bold'>Total: PKR {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
                        <Button 
                        onClick={clearCart} variant="destructive" className='rounded-none'>
                            Clear Cart
                        </Button>
                    </div>
                </div>
        </div>
    );
};

export default Checkout;

