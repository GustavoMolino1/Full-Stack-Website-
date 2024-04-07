import prisma from "@/app/libs/prismadb";
import { parse } from "date-fns";

export interface IListingsParams {
  userId?: string;
  category?: string;
  city?:string
  dateOfTrip?:string
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      city,
      dateOfTrip,
      category,
    } = params || {}; // Ensure params is not undefined

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
   // Handle price properly
  
    
    if (city) {
      query.city = city;
    }
    
    if (dateOfTrip) {
      
      query.dateOfTrip = dateOfTrip;
    }
    

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
