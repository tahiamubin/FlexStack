"use client";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";

const CommunityLikes = ({ postId }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const handleLikes = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    }
    else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <FiHeart
        onClick={handleLikes}
        className={`h-5 w-5 cursor-pointer transition-all duration-300 hover:scale-110 ${
          isLiked ? "fill-lime-300 text-lime-300" : "text-white/40"
        }`}
      />
      <span className="text-sm font-medium text-white/60">{likes}</span>
    </div>
  );
};

export default CommunityLikes;


