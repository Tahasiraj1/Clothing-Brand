import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import Cart from '@/components/Cart'
import React from 'react'

const CartPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/auth/signin'); // Redirect if user is not authenticated
    }
  
  
  return (
    <>
      <Cart />
    </>
  )
}

export default CartPage;
