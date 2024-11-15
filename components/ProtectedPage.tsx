import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";


const ProtectedPage = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();


    useEffect(() => {
        if (!session) {
            signIn(undefined, { callbackUrl: router.pathname });
        }
    }, [session]);

    if (!session) return <p className="h-screen text-5xl font-bold animate-pulse">Loading...</p>

    return children
}

export default ProtectedPage;
