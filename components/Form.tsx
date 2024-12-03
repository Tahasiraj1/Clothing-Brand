"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from '@/lib/CartContext';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import dynamic from 'next/dynamic'
import OrderConfirmationDialog from './OrderConfirmationDialog';

const DynamicConfetti = dynamic(() => import('react-confetti'), {ssr: false})

type confettiProps = {
  width: number;
  height: number;
}

const confettiColors = ['#A2D9A3', '#1D8348', '#F9E79F', '#F4D03F', '#FFFFFF', '#F1C40F'];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(11, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  houseNo: z.string().min(1, "House number is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function CheckoutForm() {
  const { toast } = useToast();
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState<confettiProps>({width: 0, height: 0});
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
        setWindowSize({width: window.innerWidth, height: window.innerHeight})
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      city: "",
      houseNo: "",
      postalCode: "",
      country: "Pakistan",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const orderData = {
        customerDetails: data,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
        totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      const result = await response.json();
      console.log('Order placed successfully:', result);
      setOrderId(result.orderId);
      setIsDialogOpen(true);
      setOrderPlaced(true);
      toast({
        title: "Congratulations!",
        description: "Your order has been placed successfully.",
        duration: 5000,
      });
      setTimeout(() => {
        clearCart();
      }, 8000); // 8 seconds delay
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {orderPlaced && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={800}
          colors={confettiColors}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {errorMessage}</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="rounded-full border-gray-300" placeholder="e.g. John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input className="rounded-full border-gray-300" placeholder="e.g. Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input className="rounded-full border-gray-300" placeholder="e.g. 1234567890" type="tel" {...field} />
                </FormControl>
                <FormDescription>We will contact you on this number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="rounded-full border-gray-300" placeholder="e.g. john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input className="rounded-full border-gray-300" placeholder="e.g. Karachi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="houseNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Input className="rounded-full border-gray-300" placeholder="e.g. Area, Street no, House no." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input className="rounded-full border-gray-300" placeholder="e.g. 75950" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input className="rounded-full border-gray-300" placeholder="Pakistan" disabled {...field} />
                  </FormControl>
                  <FormDescription>We deliver goods only in Pakistan.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className='bg-emerald-800 text-white rounded-full hover:bg-emerald-600 w-full text-lg'
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </Button>
        </form>
      </Form>
      {orderPlaced && (
        <OrderConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        orderId={`${orderId}`}
        />
      )}
    </div>
  );
}