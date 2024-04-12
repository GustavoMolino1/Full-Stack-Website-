'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser,safeListings } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format, isAfter, parse } from "date-fns";
import { useCallback, useMemo } from "react";
import Button from "../Button";
import Image from "next/image";
import HeartButton from "../HeartButton";
import ClientOnly from "../ClientOnly";
import EmptyState from "../EmptyState";





interface ListingCardProps {
    data: safeListings;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    
    
  };



  const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
    
  }) => {
    const router = useRouter();
    const { getByValue } = useCountries();
  
    const location = getByValue(data.locationValue);
  
    const handleCancel = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
  
      if (disabled) {
        return;
      }
  
      onAction?.(actionId)
    }, [disabled, onAction, actionId]);
  
    const price = useMemo(() => {
      if (reservation) {
        return reservation.totalPrice;
      }
  
      return data.price;
    }, [reservation, data.price]);
  
    const tripDateTime = parse(`${data.dateOfTrip} ${data.hourOfTrip}`, 'dd/MM/yyyy HH:mm', new Date());
    const isFutureTrip = isAfter(tripDateTime, new Date());
    
  
    if (!isFutureTrip) {
      return null; // Don't render the component if the trip has already passed
    }
    
    if (data == null) {
      return (
      
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }
  
    return (
      
      (data.MaxTouristNum-data.countOfPeople!=0)||(isFutureTrip)?(
      <div 
      
        onClick={() => router.push(`/listings/${data.id}`)} 
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div 
          
            className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
          >
            <Image
              fill
              className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
              src={data.imageSrc}
              alt="Listing"
            />
            <div className="
              absolute
              top-3
              right-3
            ">
                  <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
             
            </div>
          </div>
          <div className="flex items-center">
  <div className="font-semibold text-lg">{location?.label}</div>
  <div className="border-l border-neutral-500 mx-2 h-6"></div> 
  <div className="font-semibold text-lg">{data.city}</div>

</div>
<div className=" flex items-center">
<div className="font-semibold text-lg">Trip at Date: {data.dateOfTrip}</div>

</div>
<div className="font-semibold text-lg">Trip Hour: {data.hourOfTrip}</div>
          
          <div className="font-light text-neutral-500">
            { data.category}
          </div>
          <div className="font-light text-neutral-500">
          Remaining places:  {data.MaxTouristNum-data.countOfPeople}
          </div>
         
          <div className="flex flex-row items-center gap-1">
 
  <div className="font-semibold">
    {price === 0 ? "Free Trip" : `Total ₪ ${price}`}
   
  </div>
</div>
          
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel} 
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
     ):null);
  }
   
  export default ListingCard;