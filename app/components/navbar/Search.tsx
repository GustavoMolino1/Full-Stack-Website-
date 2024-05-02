'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";



const Search=()=>{
   const searchModal = useSearchModal();
    const params = useSearchParams();
    
    const city=params?.get('city');
    const dateOfTrip=params?.get('dateOfTrip');

    const citynLabel = useMemo(() => {
        if (city) {
          return `${city} Locations`;
        }
    
        return 'Add city';
      }, [city]);

      const dateOfTripLabel = useMemo(() => {
        if (dateOfTrip) {
          return `${dateOfTrip} Locations`;
        }
    
        return 'Add city';
      }, [dateOfTrip]);
    

    return(
      
        
        <div
        onClick={searchModal.onOpen}
         className="
        
        border-[1px]
        w-full
        md:w-auto
        py-10
        rounded-full
        hovel:shadow-md
        transition
        cursor-pointer
        "
        >
            <div className="
            flex
            flex-row
            items-center
            justify-between"
            
            >
                <div className="
                 text-lg
                font-semibold
                px-6
                
                "
                >
                    Lets Travel
                </div>
                <div
                className="
                text-lg
                hidden
                sm:block
               
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                ">
                 
                 {dateOfTrip ? dateOfTrip : "Anytime"}
                </div>
                <div
                  className="
                  text-lg
                  pl-6
                  pr-2
                 
                  flex
                  flex-row
                  items-center
                  gap-3"
          
                >
                    <div className="hidden sm:block  font-semibold">{city ? city : "Anywhere"}</div>
                    <div
                    className="
                    p-2
                    bg-blue-600
                    rounded-full
                    text-white">
                    <BiSearch size={18}/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;