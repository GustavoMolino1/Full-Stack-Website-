'use client';
import Image from "next/image"
import { useRouter } from "next/navigation";

const Logo = () =>{
const router=useRouter();
    return(
        <Image
        onClick={()=>router.push('/')}
        alt="LOGO"
        className="hidden md:block cursor-pointer"
        height="200"
        width="350"
        src="/images/logo.png"
       
        
        />
    )
}
export default Logo;