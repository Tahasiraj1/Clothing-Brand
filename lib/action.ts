'use server'

import { isAdmin } from '@/app/api/orders/route';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


export async function searchOrder(orderId: string) {
    const { userId, getToken } = await auth();
    const token = await getToken();

    if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!await isAdmin(userId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const response = await fetch(`https://clothing-brand-beige.vercel.app/api/orders?id=${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.log('No order found:', data.message);
            return null;
        }
    } catch (error) {
        console.error('Error searching for order:', error);
        throw error;
    }
}