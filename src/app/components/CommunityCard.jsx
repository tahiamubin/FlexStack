"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "@heroui/react";

import {
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiChevronRight,
} from "react-icons/fi";

const CommunityCard = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 3;

  const [imageError, setImageError] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get role badge style
  const getRoleStyle = (role) => {
    const roles = {
      trainer: "text-lime-300",
      admin: "text-lime-300",
      member: "text-white/60",
    };
    return roles[role] || roles.member;
  };

  // Truncate description
  const truncateText = (text, limit = 120) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10">
      {/* Header - Title, Role, Date */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-lime-300">
            {post.title || "Untitled Post"}
          </h3>

          <div className="mt-1.5 flex items-center gap-2 text-sm">
            {/* Role */}
            <span className={`font-medium ${getRoleStyle(post.userRole)}`}>
              {post.userRole || "Member"}
            </span>

            <span className="text-white/30">•</span>

            {/* Date */}
            <span className="text-white/40 flex items-center gap-1">
              <FiCalendar className="h-3.5 w-3.5" />
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="text-white/30 transition-all duration-300 hover:scale-110 hover:text-lime-300 ml-4 flex-shrink-0"
        >
          <FiBookmark
            className={`h-5 w-5 transition-all duration-300 ${isBookmarked ? "fill-lime-300 text-lime-300" : ""}`}
          />
        </button>
      </div>

      {/* Image */}
      {post.image && !imageError && (
        <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title || "Post image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-white/60">
        {isExpanded ? post.description : truncateText(post.description, 120)}
      </p>

      {/* Read More Button */}
      {post.description && post.description.length > 120 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1.5 flex items-center gap-1 text-sm font-medium text-lime-300 transition-all duration-300 hover:gap-2 hover:text-lime-200"
        >
          {isExpanded ? "Read Less" : "Read More"}
          <FiChevronRight
            className={`h-4 w-4 transition-all duration-300 ${isExpanded ? "rotate-90" : ""}`}
          />
        </button>
      )}

      {/* Actions */}
      <div className="mt-5 flex items-center gap-5 border-t border-white/10 pt-4">
        {/* Like Button */}
        <button className="flex items-center gap-1.5 text-sm text-white/40 transition-all duration-300 hover:scale-105 hover:text-lime-300">
        {/* ${isLiked ? "fill-lime-300 text-lime-300" : ""} */}
          <FiHeart
            className={`h-4.5 w-4.5 transition-all duration-300 `}
          />
        </button>

        {/* Comment Button */}
        <button className="flex items-center gap-1.5 text-sm text-white/40 transition-all duration-300 hover:scale-105 hover:text-lime-300">
          <FiMessageCircle className="h-4.5 w-4.5" />
        </button>

        {/* read more Button */}
        <Link href={`/community/${post._id}`}>
          <Button className="flex bg-[#84cc16] hover: hover:bg-black items-center gap-1.5 text-sm text-black transition-all duration-300 hover:scale-105 hover:text-lime-300  ml-auto">
            Read More
          </Button>
        </Link>
      </div>

    
    </div>
  );
};

export default CommunityCard;
