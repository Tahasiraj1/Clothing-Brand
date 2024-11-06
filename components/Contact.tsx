"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="w-full py-20 px-20 items-center justify-center flex">
      <div className='w-full max-w-2xl'>

          <h1 className='py-1 flex justify-center mb-8 font-bold text-3xl text-emerald-800'>
              Contact us
          </h1>

        <form className='h-96 bg-opacity-55 flex flex-col justify-center p-4 border-2 border-emerald-700 rounded-none'>
          <Label htmlFor='name'>Name:</Label>
          <Input
            id='name'
            name='name'
            type='name'
            placeholder='Enter your name'
            required
            className='items-center rounded-none mt-2 bg-emerald-100'
          />
          
          <Label className='mt-4' htmlFor='email'>Email:</Label>
          <Input
            id='email'
            name='email'
            type='email' // Correct email type
            placeholder='Enter your email'
            required
            className='items-center rounded-none mt-2 bg-emerald-100'
          />

          <Label className='mt-4' htmlFor='message'>Message:</Label>
          <Textarea
            id='message'
            name='message'
            placeholder='Enter your message'
            rows={3}
            required
            className='items-center rounded-none mt-2 bg-emerald-100'
          />

          <Button
            type='submit' // Set button type to 'submit'
            className='mt-4 w-36 mx-auto rounded-none bg-lime-100 border border-emerald-800 hover:bg-emerald-800 text-black hover:text-white'
          >
            Send <FaArrowRightLong />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
