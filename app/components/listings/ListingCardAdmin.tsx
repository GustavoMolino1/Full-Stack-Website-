'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser,safeListings } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format, isAfter, isBefore, isToday, parse } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import HeartButton from "../HeartButton";

import prisma from "@/app/libs/prismadb";
import getCustomUser from "@/app/actions/getCustomUser";



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
    const currentDate = new Date();
    const tripDateTime = parse(`${data.dateOfTrip} ${data.hourOfTrip}`, 'dd/MM/yyyy HH:mm', new Date());
    const isTripPast = isBefore(tripDateTime, currentDate);
    const tripDate = parse(`${data.dateOfTrip}`, "dd/MM/yyyy", new Date());
    const tripHour = parse(`${data.hourOfTrip}`, "HH:mm", new Date());
    const isTodayDate = isToday(tripDate);

    
    
    const isTripDatePast = isBefore(tripDate, currentDate);
    const isTripHourPast = isBefore(tripHour, currentDate) && !isTripDatePast;
   
    return (
        
      <div 
      
       // onClick={() => router.push(`/listings/${data.id}`)} 
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
                
             
            </div>
          </div>
          <div className="font-semibold text-lg">
              {currentUser?.id == data.userId ? "**Your own trip**" : null}
              
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
          Total  places:  {data.MaxTouristNum}
          <br></br>
          
          Remaining places:  {data.MaxTouristNum-data.countOfPeople}
          </div>
         
          <div className="flex flex-row items-center gap-1">
 
  <div className="font-semibold">
  <p> {'Travel ID:'}</p>  {data.id}
   <div><br /></div>
   
   <p> {'Trip Description:'}</p> {data.description}
   <br></br>
    <hr/>
   
  </div>
 
</div>

{onAction && (
  <div style={{ marginTop: "10px" }}>
    {((isTripDatePast) || (isTripHourPast && isTodayDate)) ? (
      <p>{'Trip is over'}</p>
    ) : null}
    
    {((isTripDatePast) || (isTripHourPast && isTodayDate)) ? (
      <Button
        small
        label="Delete Trip From dataBase"
        onClick={handleCancel}
      />
    ) : (
      <Button
        disabled={disabled}
        small
        label="Delete a Trip"
        onClick={handleCancel}
      />
    )}
  </div>
)}
        </div>
      </div>
    );
  };

   
  export default ListingCard;