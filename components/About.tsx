import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className='flex items-center justify-center py-20 px-20 bg-lime-50 min-h-screen'>
      <div className='flex sm:flex-col lg:flex-row items-center sm:space-x-0 lg:space-x-20'>
        <Image
        src="/images/bestselling1.jpg"
        alt='about us'
        width={400}
        height={300}
        />
        <p className='text-center sm:mt-10 lg:mt-0 font-mono text-lg'>
        Welcome to &ldquo;Your Brand Name&ldquo;, where style meets substance. 
        Founded with a passion for quality and a commitment to timeless 
        design, we create clothing that reflects individuality and empowers 
        self-expression. Each piece is crafted with attention to detail, 
        using premium materials sourced responsibly, ensuring both comfort 
        and durability. At &ldquo;Your Brand Name&ldquo;, we believe in celebrating 
        diversity and inclusivity, embracing unique styles that resonate with 
        every story. Whether you&apos;re seeking classic essentials or statement 
        pieces, our collections are designed to elevate your everyday wardrobe 
        with elegance and ease. Join us in redefining fashion, one piece at a time.
        </p>
      </div>
    </div>
  )
}

export default About
