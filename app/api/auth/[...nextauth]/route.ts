import NextAuth from 'next-auth';
import { authOptions } from './authOptions'; // Import from a separate file

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;


