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
  
    
    if (city) {
      query.city = {
        startsWith: city, // Match city name containing the provided partial city name
        mode: 'insensitive', // Case-insensitive match
      };
    }
    
    if (dateOfTrip) {
      
      query.dateOfTrip = dateOfTrip;
    }
    

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'// When you order by createdAt: 'desc', it means that the results will be sorted in descending order based on the createdAt field. This typically means that the most recent or latest entries will appear first in the result set.
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
