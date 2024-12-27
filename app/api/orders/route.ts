import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth, clerkClient } from '@clerk/nextjs/server';
import { client } from '@/sanity/lib/client';

interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
  color?: string
  size?: string
}

async function isAdmin(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata.role === 'admin';
}



async function decrementProductQuantity(productId: string, amount: number) {
  try {
    console.log(`Attempting to decrement quantity for product ${productId} by ${amount}`);

    const result = await client
      .patch(`*[_type == "product" && id == $productId][0]._id`)
      .dec({ quantity: amount })
      .commit();

    console.log(`Updated product in Sanity:`, result);
    return result;
  } catch (error) {
    console.error('Error decrementing product quantity:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received order data:', JSON.stringify(body, null, 2))

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { customerDetails, items, totalAmount } = body

    if (!customerDetails || !items || typeof totalAmount !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid order data' },
        { status: 400 }
      )
    }

    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'city', 'houseNo', 'postalCode', 'country']
    for (const field of requiredFields) {
      if (!customerDetails[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check product quantities before creating the order
    for (const item of items) {
      const product = await client.fetch(`*[_type == "product" && id == $productId][0]`, { productId: item.productId });
      if (!product || product.quantity < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Insufficient quantity for product ${item.name}` },
          { status: 400 }
        )
      }
    }

    // Start a transaction
    const [order, updateResults] = await prisma.$transaction(async (prismaClient) => {
      // Create the order
      const newOrder = await prismaClient.order.create({
        data: {
          customerDetails: {
            create: customerDetails
          },
          items: {
            create: items.map((item: OrderItem) => ({
              productId: item.productId,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              color: item.color,
              size: item.size,
            }))
          },
          totalAmount,
          status: 'pending'
        },
        include: {
          customerDetails: true,
          items: true
        }
      });

      // Update product quantities in Sanity
      const results = await Promise.allSettled(
        newOrder.items.map(item => decrementProductQuantity(item.productId, item.quantity))
      );

      return [newOrder, results];
    });

    // Check for any failed updates
    const failedUpdates = updateResults.filter(result => result.status === 'rejected');
    if (failedUpdates.length > 0) {
      console.error('Some product quantities failed to update:', failedUpdates);
      // Here you might want to implement a rollback mechanism or alert an admin
      // For now, we'll just log the error
    }

    console.log('Order created successfully:', JSON.stringify(order, null, 2))

    return NextResponse.json({ success: true, data: order, orderId: order.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create order', details: errorMessage },
      { status: 500 }
    )
  }
}


// async function decrementProductQuantity(productId: string, amount: number) {
//   try {
//     console.log(`Attempting to decrement quantity for product ${productId} by ${amount}`);

//     // Fetch the product from Sanity using the provided productId
//     const product = await client.fetch(`*[_type == "product" && id == $productId][0]{_id, id, quantity}`, 
//       { productId: String(productId) }
//     );

//     if (!product) {
//       throw new Error(`Product with ID ${productId} not found in Sanity`);
//     }

//     console.log(`Fetched product:`, product);
//     console.log(`Product ID to decrement:`, product._id);

//     if (product.quantity < amount) {
//       throw new Error(`Insufficient quantity for product ${productId}. Available: ${product.quantity}, Requested: ${amount}`);
//     }

//     console.log(`Found product in Sanity:`, product);

//     // Decrement the quantity using the _id of the document
//     const updatedProduct = await client
//       .patch(product._id)
//       .dec({ quantity: amount })
//       .commit();

//     console.log(`Updated product in Sanity:`, updatedProduct);

//     return updatedProduct;
//   } catch (error) {
//     console.error('Error decrementing product quantity:', error);
//     throw error; // Re-throw the error to be caught in the main POST handler
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     console.log('Received order data:', JSON.stringify(body, null, 2))

//     if (!body || typeof body !== 'object') {
//       return NextResponse.json(
//         { success: false, error: 'Invalid request body' },
//         { status: 400 }
//       )
//     }

//     const { customerDetails, items, totalAmount } = body

//     if (!customerDetails || !items || typeof totalAmount !== 'number') {
//       return NextResponse.json(
//         { success: false, error: 'Invalid order data' },
//         { status: 400 }
//       )
//     }

//     const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'city', 'houseNo', 'postalCode', 'country']
//     for (const field of requiredFields) {
//       if (!customerDetails[field]) {
//         return NextResponse.json(
//           { success: false, error: `Missing required field: ${field}` },
//           { status: 400 }
//         )
//       }
//     }

//         // Check product quantities before creating the order
//         for (const item of items) {
//           const product = await client.fetch(`*[_type == "product" && id == $productId][0]`, { productId: item.productId });
//           if (!product || product.quantity < item.quantity) {
//             return NextResponse.json(
//               { success: false, error: `Insufficient quantity for product ${item.name}` },
//               { status: 400 }
//             )
//           }
//         }

//     const order = await prisma.order.create({
//       data: {
//         customerDetails: {
//           create: customerDetails
//         },
//         items: {
//           create: items.map((item: OrderItem) => ({
//             productId: item.productId, // Use the product ID as the item ID (for easier reference)
//             name: item.name,
//             quantity: item.quantity,
//             price: item.price,
//             color: item.color,
//             size: item.size,
//           }))
//         },
//         totalAmount,
//         status: 'pending'
//       },
//       include: {
//         customerDetails: true,
//         items: true
//       }
//     })

//     await Promise.all(
//       order.items.map(async (item) => {
//         try {
//           await decrementProductQuantity(item.productId, item.quantity);
//         } catch (error) {
//           console.error(`Failed to update quantity for product ${item.productId}:`, error);
//           // Handle the error appropriately, e.g., revert the order, notify the user, etc.
//           // For now, we'll just log the error and continue with other updates.
//         }
//       })
//     );

//     console.log('Order created successfully:', JSON.stringify(order, null, 2))

//     return NextResponse.json({ success: true, data: order, orderId: order.id }, { status: 201 })
//   } catch (error) {
//     console.error('Error creating order:', error)
    
//     let errorMessage = 'An unexpected error occurred'
//     if (error instanceof Error) {
//       errorMessage = error.message
//     }

//     return NextResponse.json(
//       { success: false, error: 'Failed to create order', details: errorMessage },
//       { status: 500 }
//     )
//   }
// }

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!await isAdmin(userId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  console.log('GET request received for orders')
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const orderId = searchParams.get('id')

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          customerDetails: true,
          items: true
        }
      })

      if (!order) {
        console.log(`No order found with ID: ${orderId}`)
        return NextResponse.json({ success: false, message: 'No order found' }, { status: 404 })
      }

      console.log("Returning single order:", JSON.stringify(order, null, 2));
      return NextResponse.json({ success: true, data: order })
    } else {
      const where = status ? { status } : {}

      const orders = await prisma.order.findMany({
        where,
        include: {
          customerDetails: true,
          items: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
  
      console.log(`Found ${orders.length} orders:`, JSON.stringify(orders, null, 2))
  
      if (!orders || orders.length === 0) {
        console.log('No orders found')
        return NextResponse.json({ success: false, message: 'No orders found' }, { status: 404 })
      }
  
      console.log('Returning orders')
      return NextResponse.json({ success: true, data: orders })
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) { 
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!await isAdmin(userId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  try {
    const body = await request.json()
    console.log('Received update data:', JSON.stringify(body, null, 2))

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { ids, status } = body

    if (!Array.isArray(ids) || ids.length === 0 || typeof status !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid update data' },
        { status: 400 }
      )
    }

    const updatedOrders = await prisma.order.updateMany({
      where: {
        id: { in: ids }
      },
      data: {
        status
      }
    })

    console.log('Orders updated successfully:', JSON.stringify(updatedOrders, null, 2))

    return NextResponse.json({ success: true, updatedCount: updatedOrders.count }, { status: 200 })
  } catch (error) {
    console.error('Error updating orders:', error)
    
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update orders', details: errorMessage },
      { status: 500 }
    )
  }
}