import Checkout from '@/components/CheckOut';
import React from 'react'

const checkout = () => {
  return (
    <>
      <Checkout />
    </>
  );
}

export default checkout;



// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]/authOptions';
// import { redirect } from 'next/navigation';


// const session = await getServerSession(authOptions);

// if (!session) {
//   redirect('/auth/signin'); // Redirect if user is not authenticated
// }