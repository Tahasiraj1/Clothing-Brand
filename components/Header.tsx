"use client";

import React, { useState } from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import Link from 'next/link';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='font-poppins animate-in slide-in-from-top-full transition-transform transform duration-300 bg-lime-300 border border-emerald-900 text-xl w-full h-20 flex items-center justify-between drop-shadow-2xl text-emerald-950 px-8 sticky top-0 z-50 opacity-70'>
      <h1 className='font-bold text-2xl'>
        NAME
      </h1>
      <div className='hidden lg:block font-semibold'>
        <ul className='flex gap-4'>
        <Link href="/">
          <li>HOME</li>
          </Link>
          <Link href="/products">
            <li>PRODUCTS</li>
          </Link>
          <Link href="/about">
          <li>ABOUT</li>
          </Link>
          <Link href="/contact">
          <li>CONTACT</li>
          </Link>
        </ul>
      </div>
      <div className='flex gap-4 items-center justify-center'>
        <HiOutlineShoppingBag className='w-6 h-6' />
        <FaRegCircleUser className='w-6 h-6' />
        <button
        className='lg:hidden bg-transparent hover:bg-transparent'
        onClick={() => setOpen(!open)}
        >
          <RiMenu3Line className='w-6 h-6' />
        </button>
      </div>
      {open && (
        <div className='absolute top-20 animate-in slide-in-from-bottom-full transition-transform transfrom duration-300 right-2 bg-lime-400 border-emerald-950 rounded-lg lg:hidden'>
          <ul className='flex flex-col text-white font-poppins'>
            <Link href="/"><li className='px-4 pt-2'>Home</li></Link>
            <hr className='w-full mb-2' />
            <Link href="/products"><li className='px-4'>Products</li></Link>
            <hr className='w-full mb-2' />
            <Link href="/about"><li className='px-4'>About</li></Link>
            <hr className='w-full mb-1' />
            <Link href="/contact"><li className='px-4 mb-2'>Contact</li></Link>
            <hr className='w-full' />
          </ul>
        </div>
      )}
    </div>
  )
}

export default Header;
