import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import ClientOnly from "./components/ClientOnly";
import { isAfter, parse } from "date-fns";

interface HomeProps
{
  searchParams:IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);


  const currentUser=await getCurrentUser();
  const futureListings = listings.filter(listing => {
    const tripDateTime = parse(`${listing.dateOfTrip} ${listing.hourOfTrip}`, 'dd/MM/yyyy HH:mm', new Date());
    return isAfter(tripDateTime, new Date());
  });




  if (futureListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-3
          md:grid-flow-cols-3
          lg:grid-flow-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8"
        >
          {listings.map((listing) => {
            return(
                <ListingCard
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
            )
            })}
        </div>
      </Container>
    </ClientOnly>
  );
}
export default Home;
