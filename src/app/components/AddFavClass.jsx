"use client";

import { createFavorite } from '@/lib/actions/member';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { RiHeartAdd2Fill } from 'react-icons/ri';
import toast from 'react-hot-toast';

const AddFavClass = ({ classData }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isLiked, setIsLiked] = useState(false);

  const handleFavorite = async () => {
    // if (!user?.id) {
    //   toast.error("Please log in to favorite a class");
    //   return;
    // }

    try {
      const favPost = await createFavorite({

         MemberId: user.id,
         classData
        // classId: classData._id,
      });

      //console.log("favPost result:", favPost); 

      if (favPost?.error) {
        toast.error(favPost.error);
        return;
      }

      setIsLiked(true);
      toast.success("Added to favorites");
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error("Failed to save favorite");
    }
  };

  return (
    <div>
      <RiHeartAdd2Fill
        onClick={handleFavorite}
        className={`h-5 w-5 cursor-pointer transition-all duration-300 hover:scale-110 ${
          isLiked ? "fill-lime-300 text-lime-300" : "text-white/40"
        }`}
      />
    </div>
  );
};

export default AddFavClass;