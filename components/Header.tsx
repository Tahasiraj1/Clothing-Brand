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
import products from "@/lib/productsData";
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { user } = useUser();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const role = user?.publicMetadata?.role;

  const router = useRouter();

  const getProductsName = (name: string) => {
    const searchedProduct = products.find((p) => p.name.toLowerCase() === name.toLowerCase())
    if (searchedProduct) {
      router.push(`/products/${searchedProduct.id}`)
      setShowSearch(false);
      setQuery("");
    }
  }

  const handleSearchClick = () => {
    if (showSearch && query) {
      getProductsName(query);
    } else {
      setShowSearch((prev) => !prev);
    }
  }

  // useEffect(() => {
  //   if (showSearch && searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='font-poppins animate-in slide-in-from-top-full transition-transform transform duration-300 bg-emerald-800 text-xl w-full h-20 flex items-center justify-between drop-shadow-xl text-white px-4 md:px-8 sticky top-0 z-50 opacity-90'>
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
      <div className='flex gap-2 items-center justify-center'>
        <div className="relative">
          {showSearch && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getProductsName(query);
              }}
              className="absolute animate-in slide-in-from-bottom-full duration-300 md:-right-[80px] lg:right-0 sm+:right-1 lg:top-1/2 sm+:top-1/2 transform sm:translate-y-16 md:translate-y-12 sm:-right-[80px] lg:-translate-y-1/2 sm+:-translate-y-1/2"
            >
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product"
                className="px-4 py-2 rounded-full text-black w-44 md:w-56"
              />
            </form>
          )}
          <Button
            type="button"
            className={`bg-transparent hover:bg-transparent text-white hover:text-emerald-200 rounded-full p-0 m-0 ${showSearch ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleSearchClick}
            variant="ghost"
          >
            <FaSearch size={16} />
          </Button>
        </div>
        <div className='sm:hidden md:block ml-2'>
          <Link href="/cart">
            <HiOutlineShoppingBag className='w-6 h-6 text-white hover:text-emerald-200' />
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden bg-transparent hover:bg-transparent">
              <RiMenu3Line className='w-6 h-6 text-white hover:text-emerald-200' />
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
            <SignInButton mode="modal">
              <Button
              variant="ghost"
              size="icon"
              className="text-white bg-transparent hover:bg-transparent hover:text-emerald-200"
              >
                <FaUserCircle className="w-6 h-6" />
              </Button>
            </SignInButton>
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