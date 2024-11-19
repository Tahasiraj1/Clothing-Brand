import React from 'react';
import Link from 'next/link';
import { Dot } from 'lucide-react';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <div className='flex px-8 h-14 sm:h-20 bg-lime-200 border justify-between items-center'>
      <div className='flex sm:flex-col md:flex-row items-center justify-center gap-4'>
        <h2 className='flex'>
            &copy; Name<Dot />
        </h2>
        <div className='flex gap-5'>
          <Link href="/terms&conditions">
            Terms & Condition
          </Link>
          <Link href="/privacypolicy">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className='flex gap-4 items-center justify-center'>
          <Link href="https://www.facebook.com/" target='_blank'>
            <FaFacebook size={26} className='text-blue-700 active:scale-95 transition-transform transform duration-300 ' />
          </Link>

          <Link href="https://www.instagram.com/" target='_blank'>
            <AiFillInstagram size={30} className='text-pink-600 active:scale-95 transition-transform transform duration-300 ' />
          </Link>

          <Link href="https://www.whatsapp.com/" target='_blank'>
            <IoLogoWhatsapp size={26} className='text-green-600 active:scale-95 transition-transform transform duration-300 ' />
          </Link>
      </div>
    </div>
  )
}

export default Footer
