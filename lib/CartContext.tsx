"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import products from "./productsData";

export interface CartItem {
    image: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    size: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
    incrementQuantity: (item: CartItem) => void;
    decrementQuantity: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider ({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const getProductStock = (id: string) => {
        const product = products.find((p) => p.id === id);
        return product ? product.quantity : 0; // Return 0 if the product is not found
    };

    const addToCart = (product: CartItem) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id && item.color === product.color && item.size === product.size
            );

            const productStock = getProductStock(product.id);

            if (existingProduct) {
                return prevCart.map((item) => 
                item.id === product.id && item.color === product.color && item.size === product.size && item.quantity < productStock
                ? { ...item, quantity: item.quantity + 1 }
                : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }
        });
    };

    const removeFromCart = (product: CartItem) => {
        setCart((prevCart) => 
            prevCart.filter(
                (item) => !(item.id === product.id && item.color === product.color && item.size === product.size)
            )
        )
    };

    const clearCart = () => {
        setCart([]);
    };

    const incrementQuantity = (product: CartItem) => {
        const productStock = getProductStock(product.id);

        setCart((prevCart) => 
            prevCart.map((item) => 
            item.id === product.id && item.color === product.color && item.size === product.size && item.quantity < productStock
            ? { ...item, quantity: item.quantity + 1 } 
            : item
            )
        );
    };

    const decrementQuantity = (product: CartItem) => {
        setCart((prevCart) => 
            prevCart.map((item) => 
            item.id === product.id && item.color === product.color && item.size === product.size && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }  
            : item      
            )
        );
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}