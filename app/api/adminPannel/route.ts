import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  try {
    // Retrieve all reservations from the database
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true, // Include user details for each reservation
        listing: true // Include listing details for each reservation
      }
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error(); // Internal Server Error
  }
}
