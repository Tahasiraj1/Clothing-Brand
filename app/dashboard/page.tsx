'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    if (!isLoaded) return <div className="text-3xl flex min-h-screen items-center justify-center">Loading...</div>

    const role = user?.publicMetadata?.role;

    if (role !== 'admin') {
        router.push('/');
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center text-5xl min-h-screen">
          <h1>Admin Orders Page</h1>
          <p>Only admins can see this.</p>
        </div>
    );
};
    
export default AdminPage;