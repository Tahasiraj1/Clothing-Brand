"use client"
import React from 'react';
import Image from 'next/image';
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem,
    CarouselPrevious,
    CarouselNext, 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

const Testimonials = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
      )

  return (
    <div className='bg-white pb-20 flex flex-col items-center text-center justify-center'>
      <h1 className='font-bold text-4xl mb-10 text-black'>
        What Our Customers Says
      </h1>

      <Carousel
      className='w-full bg-white lg:max-w-[1050px] sm:max-w-[200px] sm+:max-w-[400px] md:max-w-[680px]'
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                {/* First */}
                <div className='bg-lime-200 rounded-none text-black flex flex-col text-center px-2 py-10 2xl:w-[471.67px] 2xl:h-[498.46px] xl:w-[437.33px] xl:h-[498.46px] lg:w-[341.33px] lg:h-[460.46px] md:w-[341.33px] md:h-[430px] sm+:w-[400px] sm:w-[200px] sm:h-[458.02px] drop-shadow-2xl'>
                    <svg className='mb-4' width="86" height="62" viewBox="0 0 86 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M86 12.7016L83.241 0.015625C63.3756 0.92565 49.6051 9.19097 49.6051 33.4977V61.4759H84.3105V26.3115H71.1667C71.167 18.5122 76.0605 13.925 86 12.7016Z" fill="green"/>
                    <path d="M36.3949 12.7018L33.6359 0.0158691C13.7705 0.925894 0 9.19144 0 33.4982V61.4764H34.7068V26.3117H21.5548C21.5548 18.5124 26.4483 13.9252 36.3949 12.7018Z" fill="green"/>
                    </svg>
                    <p className='mb-10'>
                    Whitepate is designed as a collaboration tool for businesses that is a full project management solution.
                    </p>
                    <hr className='w-full mb-10 h-0.5 bg-black px-2' />
                    <div className='flex flex-col items-center gap-4'>
                        <Image
                        src="/images/Avater.png"
                        alt='Avatar 1'
                        width={80}
                        height={30}
                        />
                        <h2>
                            <span className='font-semibold text-lg'>
                                Oberon Shaw, MCH <br />
                            </span>
                            <span>
                                Head of Talent Acquisition, North America
                            </span>
                        </h2>
                    </div>
                </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                {/* Second */}
                <div className='bg-lime-200 rounded-none text-black flex flex-col text-center px-2 py-10 2xl:w-[471.67px] 2xl:h-[498.46px] xl:w-[437.33px] xl:h-[498.46px] lg:w-[341.33px] lg:h-[460.46px] md:w-[341.33px] md:h-[430px] sm:w-[200px] sm+:w-[400px] sm:h-[458.02px] drop-shadow-2xl'>
                    <svg className='mb-4' width="87" height="62" viewBox="0 0 87 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M86.3331 12.686L83.5741 0C63.7088 0.910025 49.9382 9.17535 49.9382 33.4821V61.4603H84.6437V26.2958H71.4999C71.5001 18.4966 76.3936 13.9093 86.3331 12.686Z" fill="green"/>
                    <path d="M36.7281 12.6862L33.9691 0.000244141C14.1038 0.910269 0.333252 9.17582 0.333252 33.4825V61.4607H35.0401V26.2961H21.888C21.888 18.4968 26.7816 13.9096 36.7281 12.6862Z" fill="green"/>
                    </svg>
                    <p className='mb-10'>
                        Whitepate is designed as a collaboration tool for businesses that is a full project management solution.
                    </p>
                    <hr className='w-full mb-10 h-0.5 bg-black px-2' />
                    <div className='flex flex-col items-center gap-4'>
                        <Image
                        src="/images/Avater.png"
                        alt='Avatar 1'
                        width={80}
                        height={30}
                        />
                        <h2>
                            <span className='font-semibold text-lg'>
                                Oberon Shaw, MCH <br />
                            </span>
                            <span>
                                Head of Talent Acquisition, North America
                            </span>
                        </h2>
                    </div>
                </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                {/* Third */}
                <div className='bg-lime-200 rounded-none text-black flex flex-col text-center px-2 py-10 2xl:w-[471.67px] 2xl:h-[498.46px] xl:w-[437.33px] xl:h-[498.46px] lg:w-[341.33px] lg:h-[460.46px] md:w-[341.33px] md:h-[430px] sm:w-[200px] sm+:w-[400px] sm:h-[458.02px] drop-shadow-2xl'>
                    <svg className='mb-4' width="87" height="62" viewBox="0 0 87 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M86.3331 12.686L83.5741 0C63.7088 0.910025 49.9382 9.17535 49.9382 33.4821V61.4603H84.6437V26.2958H71.4999C71.5001 18.4966 76.3936 13.9093 86.3331 12.686Z" fill="green"/>
                    <path d="M36.7281 12.6862L33.9691 0.000244141C14.1038 0.910269 0.333252 9.17582 0.333252 33.4825V61.4607H35.0401V26.2961H21.888C21.888 18.4968 26.7816 13.9096 36.7281 12.6862Z" fill="green"/>
                    </svg>
                    <p className='mb-10'>
                    Whitepate is designed as a collaboration tool for businesses that is a full project management solution.
                    </p>
                    <hr className='w-full mb-10 h-0.5 bg-black px-2' />
                    <div className='flex flex-col items-center gap-4'>
                        <Image
                        src="/images/Avater.png"
                        alt='Avatar 1'
                        width={80}
                        height={30}
                        />
                        <h2>
                            <span className='font-semibold text-lg'>
                                Oberon Shaw, MCH <br />
                            </span>
                            <span>
                                Head of Talent Acquisition, North America
                            </span>
                        </h2>
                    </div>
                </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                {/* forth */}
                <div className='bg-lime-200 rounded-none text-black flex flex-col text-center px-2 py-10 2xl:w-[471.67px] 2xl:h-[498.46px] xl:w-[437.33px] xl:h-[498.46px] lg:w-[341.33px] lg:h-[460.46px] md:w-[341.33px] md:h-[430px] sm:w-[200px] sm+:w-[400px] sm:h-[458.02px] drop-shadow-2xl'>
                    <svg className='mb-4' width="87" height="62" viewBox="0 0 87 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M86.3331 12.686L83.5741 0C63.7088 0.910025 49.9382 9.17535 49.9382 33.4821V61.4603H84.6437V26.2958H71.4999C71.5001 18.4966 76.3936 13.9093 86.3331 12.686Z" fill="green"/>
                    <path d="M36.7281 12.6862L33.9691 0.000244141C14.1038 0.910269 0.333252 9.17582 0.333252 33.4825V61.4607H35.0401V26.2961H21.888C21.888 18.4968 26.7816 13.9096 36.7281 12.6862Z" fill="green"/>
                    </svg>
                    <p className='mb-10'>
                    Whitepate is designed as a collaboration tool for businesses that is a full project management solution.
                    </p>
                    <hr className='w-full mb-10 h-0.5 bg-black px-2' />
                    <div className='flex flex-col items-center gap-4'>
                        <Image
                        src="/images/Avater.png"
                        alt='Avatar 1'
                        width={80}
                        height={30}
                        />
                        <h2>
                            <span className='font-semibold text-lg'>
                                Oberon Shaw, MCH <br />
                            </span>
                            <span>
                                Head of Talent Acquisition, North America
                            </span>
                        </h2>
                    </div>
                </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                {/* fifth */}
                <div className='bg-lime-200 rounded-none text-black flex flex-col text-center px-2 py-10 2xl:w-[471.67px] 2xl:h-[498.46px] xl:w-[437.33px] xl:h-[498.46px] lg:w-[341.33px] lg:h-[460.46px] md:w-[341.33px] md:h-[430px] sm:w-[200px] sm+:w-[400px] sm:h-[458.02px] drop-shadow-2xl'>
                    <svg className='mb-4' width="87" height="62" viewBox="0 0 87 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M86.3331 12.686L83.5741 0C63.7088 0.910025 49.9382 9.17535 49.9382 33.4821V61.4603H84.6437V26.2958H71.4999C71.5001 18.4966 76.3936 13.9093 86.3331 12.686Z" fill="green"/>
                    <path d="M36.7281 12.6862L33.9691 0.000244141C14.1038 0.910269 0.333252 9.17582 0.333252 33.4825V61.4607H35.0401V26.2961H21.888C21.888 18.4968 26.7816 13.9096 36.7281 12.6862Z" fill="green"/>
                    </svg>
                    <p className='mb-10'>
                    Whitepate is designed as a collaboration tool for businesses that is a full project management solution.
                    </p>
                    <hr className='w-full mb-10 h-0.5 bg-black px-2' />
                    <div className='flex flex-col items-center gap-4'>
                        <Image
                        src="/images/Avater.png"
                        alt='Avatar 1'
                        width={80}
                        height={30}
                        />
                        <h2>
                            <span className='font-semibold text-lg'>
                                Oberon Shaw, MCH <br />
                            </span>
                            <span>
                                Head of Talent Acquisition, North America
                            </span>
                        </h2>
                    </div>
                </div>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

export default Testimonials
