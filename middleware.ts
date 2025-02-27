import { NextResponse } from "next/server";
import { clerkMiddleware, clerkClient, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/api(.*)'])

async function isAdmin(userId: string | null) {
  if (!userId) return false;
  
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return user.publicMetadata.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export default clerkMiddleware(async (auth, req) => {
    // Allow POST requests to /api/orders without authentication
    if (req.method === 'POST' && req.nextUrl.pathname === '/api/orders') {
      return NextResponse.next();
    }

    const { userId } = await auth(); // Get the user ID from the request
  
    // Check if the user is an admin for specific routes (e.g., /orders)
    const isUserAdmin = await isAdmin(userId);

    if (!isUserAdmin && isProtectedRoute(req)) {
        // Deny access if the user is not an admin
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  
    // If the user is authenticated and authorized, proceed with the request
    return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };