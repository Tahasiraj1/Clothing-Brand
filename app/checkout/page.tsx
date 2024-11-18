import Checkout from '@/components/CheckOut';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/auth/signin'); // Redirect if user is not authenticated
    }

  return (
    <>
      <Checkout />
    </>
  )
}

export default page
