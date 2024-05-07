import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

// Function to get the session
export async function getSession() {
  return await getServerSession(authOptions);
}

// Function to get the current user based on user ID
export default async function getCurrentUser(userId: string) {
  try {
    // Retrieve session
    const session = await getSession();

    // Check if user is logged in
    if (!session?.user?.email) {
      return null;
    }

    // Fetch user based on user ID
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Check if user exists
    if (!currentUser) {
      return null;
    }

    // Return user data with formatted timestamps and other necessary fields
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      IsAdmin: currentUser.IsAdmin,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    // Return null in case of any errors
    return null;
  }
}
