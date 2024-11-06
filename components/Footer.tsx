import React from 'react';
import Link from 'next/link';
import { Dot } from 'lucide-react';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <div className='flex px-8 h-14 sm:h-20 bg-lime-300 border justify-between items-center'>
      <div>
        <h2 className='flex sm:flex-col md:flex-row'>
            &copy; Name<Dot /> All rights reserved
        </h2>
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
