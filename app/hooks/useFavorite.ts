/*useFavorite is a custom hook that takes listingId and currentUser as parameters.
It initializes variables such as router and loginModal.
It calculates hasFavorited using useMemo, which checks if the listingId is included in the favoriteIds array of the currentUser.
The toggleFavorite function is defined using useCallback, handling the logic for toggling the favorite status of the item.
Inside toggleFavorite, it first checks if the user is logged in (currentUser).
Depending on whether the item is already favorited (hasFavorited), it constructs the appropriate request (axios.post or axios.delete) to the backend API and displays a success message using toast.
It also handles errors, such as when the user tries to favorite their own trip or when there's a general error during the request. */
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }
   

    try {
      let request;
      let successMessage;
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
        successMessage = 'Deleted from Favorite Trips';
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
        successMessage = 'Added to favorite trips';
      }

      await request();
      router.refresh();
      toast.success(successMessage);
    } catch (error: any) {
      if (error.response && error.response.status === 400 && error.response.data.message === "You cannot Favorite your own trip.") {
        toast.error("You cannot favorite your own trip");
      } else {
        toast.error("Something went wrong.");
        
      }
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;