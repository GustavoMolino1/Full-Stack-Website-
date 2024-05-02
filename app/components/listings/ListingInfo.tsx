'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useEffect, useState } from "react";

const Map = dynamic(() => import('../modals/Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  city:string;
  MaxTouristNum: number;
  countOfPeople:number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
       city,  
  MaxTouristNum,
  countOfPeople,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        } else {
          // If coordinates are not found, set to Israel coordinates
          setCoordinates([31.0461, 34.8516]); // Coordinates for Israel
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [city]);
  const mapCenter = coordinates || [31.0461, 34.8516];

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Your guide will be {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
          Maximum number of travelers in the trip: {MaxTouristNum}
          </div>
         
          <div>
          Number of travelers registered: {countOfPeople}
          </div>
         
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      {coordinates && <Map center={mapCenter} />}
      <div className="col-span-4 flex flex-col gap-8">
  

</div>
    </div>
   );
}
 
export default ListingInfo;






