
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./TotalTripsAdmin";
import getAllListings from "../actions/getAllListings";
import getAllUsers from "../actions/getAllUsers";



const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized Error"
      subtitle="Please login"
      
    />
  }

 if(currentUser.IsAdmin)
  {
   
  const listings = await getAllListings({});
   
   
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips found"
          subtitle="Looks like you have no Trips."
        />
      </ClientOnly>
    );
  }
  else{
    return (
      <ClientOnly>
        <PropertiesClient
          listings={listings}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
  }
}
else{
  return <EmptyState
  title="Unauthorized Error"
  
/>
}


}
 
export default PropertiesPage;