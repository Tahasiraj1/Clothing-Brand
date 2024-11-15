"use client";

import React, { useState } from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import Link from 'next/link';
import { Button } from './ui/button';
import { signIn, signOut } from "next-auth/react";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='font-poppins animate-in slide-in-from-top-full transition-transform transform duration-300 bg-lime-300 border border-emerald-900 text-xl w-full h-20 flex items-center justify-between drop-shadow-2xl text-emerald-950 px-8 sticky top-0 z-50 opacity-70'>
      <h1 className='font-bold text-2xl'>
        NAME
      </h1>
      <div className='hidden md:block font-semibold'>
        <ul className='flex'>

          <Button 
          variant="linkHover2">
            <Link href="/">
            <li className='font-semibold text-lg'>HOME</li>
            </Link>
          </Button>

          <Button 
          variant="linkHover2">
            <Link href="/products">
            <li className='font-semibold text-lg'>PRODUCTS</li>
          </Link>
          </Button>

          <Button 
          variant="linkHover2">
          <Link href="/about">
          <li className='font-semibold text-lg'>ABOUT</li>
          </Link>
          </Button>

          <Button 
          variant="linkHover2">
          <Link href="/contact">
          <li className='font-semibold text-lg'>CONTACT</li>
          </Link>
          </Button>

        </ul>
      </div>
      <div className='flex gap-4 items-center justify-center'>
        <Link href="/cart">
        <HiOutlineShoppingBag className='w-6 h-6' />
        </Link>
        <FaRegCircleUser className='w-6 h-6' />
        <button
        className='md:hidden bg-transparent hover:bg-transparent'
        onClick={() => setOpen(!open)}
        >
          <RiMenu3Line className='w-6 h-6' />
        </button>
        <div className='hidden md:block font-semibold'>
          <Button 
          className='rounded-none bg-emerald-900 hover:bg-emerald-950 mr-2'
          onClick={() => signIn("google")}>
            Sign in
          </Button>
          <Button 
          className='rounded-none bg-emerald-900 hover:bg-emerald-950'
          onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
      {open && (
        <div className='absolute top-20 animate-in slide-in-from-bottom-full transition-transform transfrom duration-300 right-2 bg-emerald-800 text-center border-emerald-950 rounded-none md:hidden'>
          <ul className='flex flex-col text-white font-poppins gap-2'>
            <Link href="/"><li className='px-4 pt-2'>Home</li></Link>
            <hr className='w-full mb-2' />
            <Link href="/products"><li className='px-4'>Products</li></Link>
            <hr className='w-full mb-2' />
            <Link href="/about"><li className='px-4'>About</li></Link>
            <hr className='w-full mb-1' />
            <Link href="/contact"><li className='px-4'>Contact</li></Link>
            <hr className='w-full' />
            <Button 
            className='bg-transparent hover:bg-transparent p-0 m-0'
            onClick={() => signIn("google")}
            >
              <li className='text-lg'>Sign in</li>
            </Button>
            <hr className='w-full' />
            <Button 
            className='bg-transparent hover:bg-transparent p-0 m-0'
            onClick={() => signOut()}
            >
              <li className='text-lg'>Sign Out</li>
            </Button>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Header;
