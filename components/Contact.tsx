import React from 'react'
import { FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-lime-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-emerald-800">Get in Touch</CardTitle>
            <CardDescription>We&apos;d love to hear from you!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-emerald-600 text-xl" />
                <div>
                  <p className="font-medium">Customer Support:</p>
                  <a href="mailto:support@yourclothingbrand.com" className="text-emerald-600 hover:underline">support@yourclothingbrand.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-emerald-600 text-xl" />
                <div>
                  <p className="font-medium">Business Inquiries:</p>
                  <a href="mailto:business@yourclothingbrand.com" className="text-emerald-600 hover:underline">business@yourclothingbrand.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-emerald-600 text-xl" />
                <div>
                  <p className="font-medium">Phone:</p>
                  <a href="tel:+923001234567" className="text-emerald-600 hover:underline">+92 300 1234567</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-lime-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-emerald-800">Connect With Us</CardTitle>
            <CardDescription>Follow us on social media for the latest updates and styles!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-6">
              <a href="https://instagram.com/yourclothingbrand" target="_blank" rel="noopener noreferrer" className="text-3xl text-pink-600 hover:text-pink-700 transition-colors">
                <FaInstagram />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://facebook.com/yourclothingbrand" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-700 transition-colors">
                <FaFacebook />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com/yourclothingbrand" target="_blank" rel="noopener noreferrer" className="text-3xl text-sky-500 hover:text-sky-600 transition-colors">
                <FaTwitter />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Visit Our Store</h2>
        <p className="text-lg">
          123 Fashion Street, Karachi, Pakistan
        </p>
        <p className="text-lg mt-2">
          Open Monday to Saturday, 10:00 AM - 9:00 PM
        </p>
      </div>
    </div>
  )
}
