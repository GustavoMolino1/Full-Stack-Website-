/*
  Safe Types Declaration

  These types (SafeListing, SafeReservation, SafeUser) are designed to enhance security by omitting or transforming sensitive information. 

  - SafeListing: Omits creation timestamp and transforms it into a string to obscure the exact timestamp value.
  
  - SafeReservation: Omits creation timestamp and associated listing to prevent exposure of sensitive data. 
    Also, replaces the listing object with a SafeListing object to ensure that potentially sensitive information within the listing is handled securely.

  - SafeUser: Omits creation and update timestamps, and email verification status to protect sensitive user information. 
    The email verification status is specified as a string or null, indicating whether the email has been verified.

  These safety measures aim to minimize the risk of exposing sensitive data and enhance the overall security of the application.

  Note: While these types provide additional security, it's important to consider other security practices and potential threats to ensure comprehensive protection of data.
*/


import { Listing, Reservation, User } from "@prisma/client"
export type safeListings=Omit<
Listing,
"createdAt"
>&{
    createdAt:string;
}

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
  };
export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "listing"
> & {
  createdAt: string;
  listing: SafeListing;
};




export type SafeUser=Omit<User, "createdAt"|"updatedAt"|"emailVerified">&{
    createdAt:string;
    updatedAt:string;
    emailVerified:string | null;
   
}
