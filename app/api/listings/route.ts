import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

function isValidDate(dateString: string): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;
  const [day, month, year] = dateString.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  return !isNaN(date.getTime());
}

function isFutureDateTime(dateTimeString: string): boolean {
  const [dateString, timeString] = dateTimeString.split(' ');
  const [day, month, year] = dateString.split('/');
  const [hour, minute] = timeString.split(':');
  const dateTime = new Date(`${year}-${month}-${day}T${hour}:${minute}`);
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds added to the current time
  return dateTime.getTime() > oneHourFromNow.getTime();
}
function isValidHour(hourString: string): boolean {
  const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return regex.test(hourString);
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    category,
    MaxTouristNum,
    whatsAppLink,
    location,
    city,
    dateOfTrip,
    hourOfTrip,
    price,
  } = body;

  // Check if any required field is missing
  for (const key of ['title', 'description', 'category', 'MaxTouristNum', 'whatsAppLink', 'location', 'city', 'price']) {
    if (!body[key]) {
      return new NextResponse(JSON.stringify({ message: `Missing required field: ${key}` }), { status: 400 });
    }
  }
  if (!isValidHour(hourOfTrip)) {
    return new NextResponse(JSON.stringify({ message: "Invalid hour format. Please use HH:MM in 24-hour format." }), { status: 400 });
  }

  // Check if imageSrc is provided
  if (!body['imageSrc']) {
    return new NextResponse(JSON.stringify({ message: "At least one picture must be uploaded." }), { status: 400 });
  }

  // Check if the WhatsApp link is in the correct format
 /* const whatsappRegex = /^https?:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]+$/;
  if (!whatsappRegex.test(whatsAppLink)) {
    return new NextResponse(JSON.stringify({ message: "The WhatsApp link is not in the correct format." }), { status: 400 });
  }*/

  // Check if title contains only letters
  if (!/^[a-zA-Z\u0590-\u05FF\s!#%,'".\s]+$/.test(title)) {
    return new NextResponse(JSON.stringify({ message: "Title must contain only letters, spaces, and special characters: ! # % , . ' \" " }), { status: 400 });
  }
  

  // Check if description has more than 10 words
  const wordCount = description.split(/\s+/).filter(Boolean).length;
  if (wordCount < 5) {
    return new NextResponse(JSON.stringify({ message: "Description must have at least 5 words." }), { status: 400 });
  }

  // Check if dateOfTrip is valid and in the future, and within one month from now
  if (!isValidDate(dateOfTrip)) {
    return new NextResponse(JSON.stringify({ message: "Invalid date format. Please use DD/MM/YYYY." }), { status: 400 });
  }
  
  if (!isFutureDateTime(`${dateOfTrip} ${hourOfTrip}`)) {
    return new NextResponse(JSON.stringify({ message: "The trip date and time must be at least 1 hour in the future." }), { status: 400 });
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      MaxTouristNum: parseInt(MaxTouristNum, 10),
      whatsAppLink,
      city,
      dateOfTrip,
      hourOfTrip,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}
