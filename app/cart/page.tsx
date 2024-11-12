"use client";

import React from 'react';
import { useCart, CartItem } from '@/lib/CartContext';
import { X } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();

    const totalPrice = cart.reduce((sum, item) => item.price * item.quantity + sum, 0 );

    const handleRemoveFromCart = (item: CartItem) => {
        removeFromCart(item);
    };

  return (
    <div className='flex w-full flex-col pt-10 pb-20 px-10'>
        <h1 className='font-bold text-2xl my-5 mx-10'>Your Cart</h1>
        {cart.length === 0 ? (
            <p>Your cart is empty</p>
        ) : (
            <div className="flex flex-col gap-y-4">
            {cart.map((item) => (
                <div className='flex flex-col border items-center justify-center max-w-3xl mx-5' 
                key={`${item.id}-${item.color}-${item.size}`}
                >
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between pr-5'>
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                            <h3 className='font-bold text-xl'>{item.name}</h3>
                            <button onClick={() => handleRemoveFromCart(item)}>
                                <X />
                            </button>
                        </div>
                        <p><strong>Price: PKR {item.price}</strong></p>
                        <div className='flex items-center'>
                            <Button onClick={() => decrementQuantity(item)}>
                                -
                            </Button>
                            <p>Qty: {item.quantity}</p>
                            <Button onClick={() => incrementQuantity(item)}>
                                +
                            </Button>
                        </div>
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                        <p>Total: {item.price * item.quantity}</p>
                    </div>
                    {/* <hr className='w-full h-[2px] bg-emerald-700 mb-2' /> */}
                </div>
            ))}
            <span>SubTotal: {totalPrice}</span>
                <Button 
                variant="destructive"
                className='rounded-none gap-2 mx-10 max-w-36'
                onClick={clearCart}>
                    Clear Cart <Trash2 size={20} />
                </Button>
            </div>
        )}
    </div>
  )
}

export default CartPage;
