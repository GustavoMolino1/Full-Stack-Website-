'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { 
  CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';


const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [city, setCity] = useState('');
  const [dateOfTrip, setdateOfTrip] = useState('');
  const [isLoading,setIsLoading]=useState(false);
  const [location, setLocation] = useState<CountrySelectValue>();

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (dateOfTrip && !dateRegex.test(dateOfTrip)) {
      alert('Please enter the date in the format DD/MM/YYYY.');
      return;
    }
    
      const [day, month, year] = dateOfTrip.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      const dateObject = new Date(formattedDate);
      
      function formatDateConvert(date: Date): string {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
        
          return `${day}/${month}/${year}`;
      }
      
      const currentDate = new Date();
      const todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Get today's date without time
      
      console.log(formatDateConvert(todayDate));
      
      if (dateObject < todayDate) {
          // If dateOfTrip is in the past, show an alert or handle it accordingly
          alert('Please select a future date for your trip.');
          return;
      }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      city,  // Include city in the query params 
      dateOfTrip, // Include stringDate in the query params
    };

    
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    searchModal.onClose();
    router.push(url);
  }, 
  [
    searchModal, 
    location, 
    router, 
    city,
    dateOfTrip, 
    params
  ]);

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel="Search"
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      body={
        <div className="p-4 space-y-4">
          <Heading
            title="Write to us about your constraints for the next trip"
          />
          <div> {/* Apply Tailwind margin and padding */}
            <label htmlFor="city" className="block font-bold">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded" 
            />
          </div>
          
          <div> {/* Apply Tailwind margin and padding */}
            <label htmlFor="stringDate" className="block font-bold">Date:</label>
            <input
              type="text"
              id="stringDate"
              value={dateOfTrip}
              onChange={(e) => setdateOfTrip(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      }
    />
  );
}

export default SearchModal;
