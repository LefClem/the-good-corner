import { useRouter } from "next/router";
import { useEffect } from "react";

export default function isAuth(Component: any){
    return function IsAuth(props: any){
        const router = useRouter();
        const token = localStorage.getItem("token");
    
        useEffect(() => {
            if(!token){
                router.push('/');
            }
        }, [])
    
        if(!token){ return null; }
    
        return <Component {...props} />
    }
}