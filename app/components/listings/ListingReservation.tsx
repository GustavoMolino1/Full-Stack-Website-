'use client';

import { Range } from "react-date-range";

import Button from "../Button";

import { MdDateRange } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { IoIosInformationCircle } from "react-icons/io";

import { IoTime } from "react-icons/io5";

import { FaShekelSign } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";


interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onSubmit: () => void;
  disabled?: boolean;
  dateOfTrip: string;
  HourOfTrip:string;
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  totalPrice,
  onSubmit,
  dateOfTrip,
  disabled,
  HourOfTrip

}) => {
  const currentDate = new Date();
  const tripDate = new Date(dateOfTrip);
  const isToday = currentDate.toDateString() === tripDate.toDateString();
  const isTripPassed = tripDate < currentDate;
  const isTripHourPassed = isToday && tripDate.getHours() < currentDate.getHours();
  
  return (  
  
  



    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center">
  <IoIosInformationCircle className="text-black" style={{ fontSize: '24px' }} />
  <span className="text-black text-3xl  ml-2">Information</span>
</div>

    <div className="flex flex-row items-center gap-1 p-4">
      {price === 0 ? (
        <div className="text-xl font-semibold">
          Trip is free of Charge
        </div>
      ) : (
        <>
          <div className="text-2xl font-semibold">
            {price} ₪
          </div>
          <div className="font-light text-neutral-600">
            Per Person.
          </div>
        </>
      )}
    </div>
    <div className="flex items-center">
    <MdDateRange className="text-black" style={{ fontSize: '24px' }} />
  <span className="text-black ml-2">  {dateOfTrip}</span>

</div>
<br></br>
<div className="flex items-center ">
    <IoTime className="text-black" style={{ fontSize: '24px' }} />
  <span className="text-black ml-2">  {HourOfTrip}</span>

</div>
<br></br>
<div className="flex items-center ">
    <FaWhatsapp className="text-black" style={{ fontSize: '24px' }} />
  <span className="text-black ml-2">  WhatsApp group chat Included.</span>
</div>


<div style={{ marginTop: '20px' }}>

</div>
   <div className="flex items-center">
  {price === 0 ? (
    <div className="flex items-center">
      <GiPayMoney className="text-black" style={{ fontSize: '24px' }} />
      <span className="text-black ml-2">It is respectful to leave a tip for the tour guide for free</span>
    </div>
  ) : (
    <div className="flex items-center">
      <MdDateRange className="text-black" style={{ fontSize: '24px' }} />
      <span className="text-black ml-2">{dateOfTrip}</span>
    </div>
  )}
</div>
      <hr />
      <div className="p-4">
  <Button 
    disabled={isTripHourPassed||isTripPassed} 
    label={isTripHourPassed || isTripPassed ? "Trip already passed" : "Join To the Trip!"} 
    onClick={onSubmit}
  />
</div>
      
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
      {price !== 0 && (
        
  <div>
    <hr />
    
  </div>
)}

      </div>
    </div>
   );
}
 
export default ListingReservation;