import prisma from "@/app/libs/prismadb";
import { parse } from "date-fns";

export interface IListingsParams {
    image?:string;
    role?: string;
    id: string;
    name: string;
    email: string;
    createdAt: string; // Property type is string
}

const getAllUsers = async (): Promise<IListingsParams[]> => {
  try {
    const listings = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      id: listing.id,
      name: listing.name || '',
      email: listing.email || '',
      role: typeof listing.IsAdmin === 'boolean' ? (listing.IsAdmin ? 'Admin' : 'User') : 'User', // Convert boolean to string
      createdAt: listing.createdAt.toUTCString(), // Convert createdAt to ISO string
      image:listing.image || '',
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

export default getAllUsers;
