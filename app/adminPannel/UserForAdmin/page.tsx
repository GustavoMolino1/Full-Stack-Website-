
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import getAllUsers from "@/app/actions/getAllUsers";
import UsersList from "./UsersList";




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
   

   const users = await getAllUsers();
   
  if (users.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No User found"
          subtitle="Looks like you have no Users."
        />
      </ClientOnly>
    );
  }
  else{
    return (
      <ClientOnly>
      <UsersList
      users={users}/>
      
       
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