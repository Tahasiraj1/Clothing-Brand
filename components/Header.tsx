"use client";

import React, { useState } from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiMenu3Line } from "react-icons/ri";
import Link from 'next/link';
import { Button } from './ui/button';
import { VscChromeClose } from "react-icons/vsc";
import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();

  const role = user?.publicMetadata?.role;

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

          {role === 'admin' && (
            <Button 
            variant="linkHover2">
            <Link href="/dashboard">
            <li className='font-semibold text-lg'>DASHBOARD</li>
            </Link>
            </Button>
          )}

        </ul>
      </div>
      <div className='flex gap-4 items-center justify-center'>
        <div className='sm:hidden md:block'>
          <Link href="/cart">
          <HiOutlineShoppingBag className='w-6 h-6' />
          </Link>
        </div>
        <button
        className='md:hidden bg-transparent hover:bg-transparent'
        onClick={() => setOpen(!open)}
        >
          {open ? (
            <VscChromeClose className='w-6 h-6 active:scale-0 transition-transform duration-200 transform' />
          ) : (
            <RiMenu3Line className='w-6 h-6 active:scale-0 transition-transform duration-200 transform' />
          )}
          
        </button>
          <span 
          className='active:scale-95 transition-transform transform duration-300 font-semibold'>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </span>
      </div>
      {open && (
        <div className='absolute top-20 animate-in slide-in-from-bottom-full transition-transform transfrom duration-300 right-2 bg-emerald-800 text-center border-emerald-950 rounded-none md:hidden'>
          <ul className='flex flex-col text-white font-poppins gap-2'>
            <Link href="/"><li className='px-4 pt-2'>Home</li></Link>
            <hr className='w-full mb-2' />
            <Link href="/products"><li className='px-4'>Products</li></Link>
            <hr className='w-full mb-2' />
            <Link href="/cart"><li className='px-4'>Cart</li></Link>
            <hr className='w-full' />
            <Link href="/about"><li className='px-4'>About</li></Link>
            <hr className='w-full mb-1' />
            <Link href="/contact"><li className='px-4'>Contact</li></Link>
            <hr className='w-full' />
            {role === 'admin' && (
              <>
              <Link href='/dashboard'><li className='px-4'>Dashboard</li></Link>
              <hr className='w-full' />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Header;
