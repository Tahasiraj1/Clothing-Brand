import React from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import Link from 'next/link';

const Header = () => {
  return (
    <div className='font-poppins bg-lime-300 border border-emerald-900 text-xl w-full h-20 flex items-center justify-between text-emerald-950 px-8 sticky top-0 opacity-70'>
      <h1 className='font-elephant'>
        NAME
      </h1>
      <div className='hidden lg:block'>
        <ul className='flex gap-4'>
        <Link href="/">
          <li>HOME</li>
          </Link>
          <Link href="/products">
            <li>PRODUCTS</li>
          </Link>
          <li>ABOUT</li>
          <li>CONTACT</li>
        </ul>
      </div>
      <div className='flex gap-4'>
        <HiOutlineShoppingBag className='w-6 h-6' />
        <FaRegCircleUser className='w-6 h-6' />
        <RiMenu3Line className='w-6 h-6' />
      </div>
    </div>
  )
}

export default Header;
