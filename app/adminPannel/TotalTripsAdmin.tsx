'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import ListingCard2 from "../components/listings/ListingCard2";
import ListingCardAdmin from "../components/listings/ListingCardAdmin";

interface PropertiesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  
  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/admin/${id}`)
    .then(() => {
      toast.success('Trip deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);


  return ( 
    <Container>
      <Heading
        title="Welcome Admin, Here you can delete Future  & past Trips from our dataBase. "
        subtitle="List of All the Trips"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCardAdmin
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete Trip"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default PropertiesClient;