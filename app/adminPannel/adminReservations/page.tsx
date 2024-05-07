
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "@/app/adminPannel/adminReservations/ReservationsClient";
import getAllReservations from "@/app/actions/getAllReservations";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }
  if(currentUser.IsAdmin)
    {
  const reservations = await getAllReservations();

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on the website"
          
        />
      </ClientOnly>
    );
  }
        else{
          return (
            <ClientOnly>
              <TripsClient
                reservations={reservations}
                currentUser={currentUser}
              />
            </ClientOnly>
          );
        }
}
    else
    {
      return (
        <ClientOnly> 
          <EmptyState
            title="Unauthorized"
            subtitle="You cant be here."
          />
        </ClientOnly>
      )
    }
}
 
export default ReservationsPage;