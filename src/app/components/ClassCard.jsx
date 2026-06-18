"use client";

import { useState } from "react";
import { 
  FiUser, 
  FiCalendar, 
  FiClock, 
  FiDollarSign,
  FiTag,
  FiAward,
  FiHeart,
  FiBookmark
} from "react-icons/fi";
import CommunityLikes from "./CommunityLikes";

const ClassCard = ({ classData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "text-green-400 bg-green-400/10 border-green-400/30",
      intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      advanced: "text-red-400 bg-red-400/10 border-red-400/30",
      "all-levels": "text-blue-400 bg-blue-400/10 border-blue-400/30",
    };
    return colors[difficulty] || "text-white/40 bg-white/5 border-white/10";
  };

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-300/0 via-lime-300/5 to-lime-300/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        {/* Image */}
        {classData.image && (
          <div className="relative h-48 w-full overflow-hidden rounded-xl">
            <img
              src={classData.image}
              alt={classData.className}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400 border border-yellow-500/30">
          {classData.status}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
          {classData.className}
        </h3>

        {/* Category & Difficulty */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-300">
            <FiTag className="h-3 w-3" />
            {classData.category}
          </span>
          <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border ${getDifficultyColor(classData.difficulty)}`}>
            <FiAward className="h-3 w-3" />
            {classData.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm font-medium leading-relaxed text-white/60 line-clamp-2">
          {classData.description}
        </p>

        {/* Details */}
        <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1">
            <FiClock className="h-4 w-4" />
            {classData.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FiDollarSign className="h-4 w-4" />
            ${classData.price}
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar className="h-4 w-4" />
            {formatDate(classData.createdAt)}
          </span>
        </div>

        {/* Trainer */}
        <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
            <FiUser className="h-3 w-3" />
          </div>
          
          <span className="text-[10px] uppercase text-lime-300/60">
            {classData.userRole}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3">
           <div className="flex items-center gap-2 text-white/40">
             <CommunityLikes postId = {classData._id}></CommunityLikes>
            </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="ml-auto text-white/40 transition-all duration-300 hover:scale-110 hover:text-lime-300"
          >
            <FiBookmark className={`h-4 w-4 ${isBookmarked ? "fill-lime-300 text-lime-300" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;