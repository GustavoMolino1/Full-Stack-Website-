import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { listing: true } // Fetch associated listing
    });

    if (!reservation) {
      throw new Error('Trip Reservation not found');
    }

    if (reservation.userId !== currentUser.id && reservation.listing.userId !== currentUser.id) {
      throw new Error('Unauthorized');
    }

    // Decrement countOfPeople in the associated Listing
    const updatedListing = await prisma.listing.update({
      where: { id: reservation.listing.id },
      data: { countOfPeople: { decrement: 1 } } // Decrement countOfPeople by 1
    });

    // Delete the reservation
    await prisma.reservation.delete({
      where: { id: reservationId }
    });

    return NextResponse.json({ reservation, updatedListing });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error(); // Internal Server Error
  }
}
