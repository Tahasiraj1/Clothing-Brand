"use client";

import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiMenu3Line } from "react-icons/ri";
import Link from 'next/link';
import { Button } from './ui/button';
import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { user } = useUser();

  const role = user?.publicMetadata?.role;

  return (
    <div className='font-poppins animate-in slide-in-from-top-full transition-transform transform duration-300 bg-emerald-800 text-xl w-full h-20 flex items-center justify-between drop-shadow-xl text-white px-8 sticky top-0 z-50 opacity-90'>
      <h1 className='font-bold text-2xl'>
        NAME
      </h1>
      <div className='hidden md:block font-semibold'>
        <ul className='flex'>
          <Button variant="linkHover2">
            <Link href="/">
              <li className='font-semibold text-lg'>HOME</li>
            </Link>
          </Button>
          <Button variant="linkHover2">
            <Link href="/products">
              <li className='font-semibold text-lg'>PRODUCTS</li>
            </Link>
          </Button>
          <Button variant="linkHover2">
            <Link href="/about">
              <li className='font-semibold text-lg'>ABOUT</li>
            </Link>
          </Button>
          <Button variant="linkHover2">
            <Link href="/contact">
              <li className='font-semibold text-lg'>CONTACT</li>
            </Link>
          </Button>
          {role === 'admin' && (
            <Button variant="linkHover2">
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden bg-transparent hover:bg-transparent">
              <RiMenu3Line className='w-6 h-6' />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className='pt-20 bg-black text-white border-gray-600'>
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav>
              <ul className='flex flex-col gap-4'>
                <li>
                  <Button variant="linkHover2" asChild className="w-full justify-start">
                    <Link href="/">HOME</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="linkHover2" asChild className="w-full justify-start">
                    <Link href="/products">PRODUCTS</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="linkHover2" asChild className="w-full justify-start">
                    <Link href="/about">ABOUT</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="linkHover2" asChild className="w-full justify-start">
                    <Link href="/contact">CONTACT</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="linkHover2" asChild className="w-full justify-start">
                    <Link href="/cart">CART</Link>
                  </Button>
                </li>
                {role === 'admin' && (
                  <li>
                    <Button variant="linkHover2" asChild className="w-full justify-start">
                      <Link href="/dashboard">DASHBOARD</Link>
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
        <span className='active:scale-95 transition-transform transform duration-300 font-semibold'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </span>
      </div>
    </div>
  )
}

export default Header;





{/* <button
className='md:hidden bg-transparent hover:bg-transparent'
onClick={() => setOpen(!open)}
>
  {open ? (
    <VscChromeClose className='w-6 h-6 active:scale-0 transition-transform duration-200 transform' />
  ) : (
    <RiMenu3Line className='w-6 h-6 active:scale-0 transition-transform duration-200 transform' />
  )}
  
</button>

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
)} */}