'use client';

import { BlockList } from "net";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import LoginModal from "../modals/LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useOpenTripModal from "@/app/hooks/useOpenTripModal";
import { useRouter } from "next/navigation";


interface UserMenuProps{
currentUser?: SafeUser | null;


}


const UserMenu:React.FC<UserMenuProps>=({
currentUser

}) =>{
  
  
const router=useRouter();
  const OpenTrip=useOpenTripModal();
    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();
    const[isOpen,setIsOpen]=useState(false);
    const toggleOpen=useCallback(()=>{
        setIsOpen((value)=>!value);
    },[]);
    
    const onOpenTrip=useCallback(()=>{
      if(!currentUser){
     return  loginModal.onOpen();
      }
    OpenTrip.onOpen();
        

    },[currentUser,loginModal,OpenTrip])

    return(
      
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                onClick={onOpenTrip}
                className="
                hidden
                md:block 
                text-lg
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                mt-5
                "
                >
                   Open Your Own Trip
                </div>
                <div
                   onClick={toggleOpen}
                   className="
                   mt-5
                   p-4
                   md:py-1
                   md:px-2
                   border-[1px] 
                   border-neutral-200 
                   flex 
                   flex-row 
                   items-center 
                   gap-4
                   rounded-full 
                   cursor-pointer 
                   hover:shadow-md 
                   transition
                   
                   ">
                 <AiOutlineMenu size={18}/>
                 <div className="hidden md:block">

                    <Avatar src ={currentUser?.image}/>
                 
                 </div>

                </div>
            </div>
            {isOpen && (
                <div
                className="  
                absolute 
                rounded-xl 
                shadow-md
                w-[40vw]
                md:w-3/4 
                bg-white 
                overflow-hidden 
                right-0 
                top-15
                text-sm
                
                ">
                     <div className="flex flex-col cursor-pointer">
                        
            {currentUser ? (
              <>
                <MenuItem 
                  label="My Future trips" 
                  onClick={() =>router.push("/trips") }
                />
                <MenuItem 
                  label="Trips I liked" 
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem 
                  label="Managing my trip" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="My Own Trips" 
                  onClick={() => router.push('/ownTrips')}
                />
                <MenuItem 
                  label="Open Your Own trip" 
                  onClick={OpenTrip.onOpen}
                />
                 {currentUser.IsAdmin ? ( <MenuItem 
                  label="Admin - Travel management" 
                  onClick={() => router.push('/adminPannel')}
                  />
                ):(null)
                }
                 {currentUser.IsAdmin ? ( <MenuItem 
                  label="Admin - All Reservation" 
                  onClick={() => router.push('/adminPannel/adminReservations')}
                  />
                ):(null)
                }
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => {signOut()}}
                />
               
            
              </>
            ) : (
              <>
                <MenuItem 
                  label="Log in " 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
                    
                </div>
            
            )}
           
        </div>
    );
}

export default UserMenu;
