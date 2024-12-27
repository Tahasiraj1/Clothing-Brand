import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: Request) {
  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('SANITY_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${webhookSecret}`) {
    console.error('Invalid or missing Authorization header');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const updates = items.map(item => ({
      patch: {
        id: `*[_type == "product" && id == "${item.productId}"][0]._id`,
        dec: { quantity: item.quantity }
      }
    }));

    const result = await client.transaction(updates).commit();
    console.log('Sanity update result:', result);

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error('Error updating Sanity:', error);
    return NextResponse.json({ error: 'Failed to update Sanity' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';


