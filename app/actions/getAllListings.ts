import prisma from "@/app/libs/prismadb";
import { parse } from "date-fns";

export interface IListingsParams {
  userId?: string;
  category?: string;
  city?: string;
  dateOfTrip?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const listings = await prisma.listing.findMany({
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
