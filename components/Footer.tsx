import React from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Your Brand</h3>
            <p className="text-sm">Elevate your style with our curated collection of trendsetting fashion.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-300 transition-colors">
                <FaFacebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-emerald-300 transition-colors">
                <FaTwitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-emerald-300 transition-colors">
                <FaInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-emerald-300 transition-colors">
                <FaYoutube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-emerald-300 transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-emerald-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-300 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-300 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><Link href="/privacypolicy" className="hover:text-emerald-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms&conditions" className="hover:text-emerald-300 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-emerald-300 transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-emerald-300 transition-colors">Return Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest trends and discounts!</p>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-lime-100 border-emerald-600 text-black placeholder-emerald-300"
              />
              <Button className="w-full bg-white text-emerald-800 hover:bg-emerald-100">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-emerald-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Your Brand Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer