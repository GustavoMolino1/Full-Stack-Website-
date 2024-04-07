import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error(); // Unauthorized
  }

  const body = await request.json();
  const { listingId, totalPrice } = body;

  if (!listingId) {
    return NextResponse.error(); // Bad Request
  }

  try {
    // Fetch the listing associated with the provided listingId
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { userId: true },
    });

    // Check if the listing's userId matches the current user's id
    if (listing?.userId === currentUser.id) {
      return new NextResponse(JSON.stringify({ message: 'You cannot make a reservation for your own trip.' }), { status: 400 });
    }

    // Check if the user already has a reservation for the same listing
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        userId: currentUser.id,
        listingId,
      },
    });

    if (existingReservation) {
      // User already has a reservation for the same listing
      return new NextResponse(JSON.stringify({ message: 'You already have a reservation for this trip.' }), { status: 400 });
    }

    // Update countOfPeople in the Listing model
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: { countOfPeople: { increment: 1 } }, // Increment countOfPeople by 1
    });

    // Create a new reservation
    const reservation = await prisma.reservation.create({
      data: {
        userId: currentUser.id,
        listingId,
        totalPrice,
      },
    });

    return NextResponse.json({ reservation, updatedListing });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error(); // Internal Server Error
  }
}
