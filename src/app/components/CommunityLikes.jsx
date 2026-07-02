'use client'
import { createLikePost, likePost } from "@/lib/actions/community";
import { updateLike } from "@/lib/api/community";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";

const CommunityLikes = ({ postId, initialLikesCount = 0 }) => {
  console.log(postId)
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleOnClick = async () => {
    // optimistic UI update
    setIsLiked(true);
    setLikesCount((prev) => prev + 1);
    await updateLike(postId )

    // update database
   
  };

  return (
    <div className="flex items-center gap-2">
      <FiHeart
        onClick={handleOnClick}
        className={`h-5 w-5 cursor-pointer transition-all duration-300 hover:scale-110 ${
          isLiked ? "fill-lime-300 text-lime-300" : "text-white/40"
        }`}
      />
      <span className="text-sm font-medium text-white/60">{likesCount}</span>
    </div>
  );
};

export default CommunityLikes;