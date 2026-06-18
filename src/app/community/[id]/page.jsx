import React from "react";
import {
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiBookmark,
  FiArrowLeft,
  FiUser,
  FiTag,
  FiLink,
} from "react-icons/fi";
import Link from "next/link";
import { getCommunityForumById } from "@/lib/api/community";

const CommunityPostDetails = async ({ params }) => {
  const { id } = await params;
  const post = await getCommunityForumById(id);
  

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get role badge color
  const getRoleBadge = (role) => {
    const roles = {
      trainer: "bg-lime-300/20 text-lime-300 border-lime-300/30",
      member: "bg-blue-300/20 text-blue-300 border-blue-300/30",
      admin: "bg-purple-300/20 text-purple-300 border-purple-300/30",
    };
    return roles[role] || roles.member;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/dashboard/trainer/forum-posts"
        className="inline-flex items-center gap-2 text-white/40 transition-all duration-300 hover:text-lime-300 hover:gap-3 mb-6"
      >
        <FiArrowLeft className="h-5 w-5" />
        <span className="text-sm font-medium">Back to Posts</span>
      </Link>

      {/* Post Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-lime-300/30">
        {/* Header - User & Role */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
              <FiUser className="h-7 w-7" />
            </div>
            <div>
              
              <div className="flex items-center gap-3 mt-1">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getRoleBadge(post.userRole)}`}
                >
                  {post.userRole || "member"}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-sm text-white/40 flex items-center gap-1">
                  <FiCalendar className="h-4 w-4" />
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button className="text-white/30 transition-all duration-300 hover:scale-110 hover:text-lime-300">
            <FiBookmark className="h-6 w-6" />
          </button>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold uppercase tracking-tight text-white">
          {post.title}
        </h1>

        {/* Image */}
        {post.image && (
          <div className="relative mt-6 h-[400px] w-full overflow-hidden rounded-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        )}

        {/* Description */}
        <div className="mt-6">
          <p className="text-base leading-relaxed text-white/80 whitespace-pre-wrap">
            {post.description}
          </p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 rounded-full bg-lime-300/10 px-4 py-1.5 text-sm font-medium text-lime-300 border border-lime-300/20"
              >
                <FiTag className="h-3.5 w-3.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats & Actions */}
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-8">
            {/* Likes */}
            <div className="flex items-center gap-2 text-white/40">
              <FiHeart className="h-5 w-5 fill-lime-300 text-lime-300" />
              <span className="text-sm font-medium text-white/60">
                {Math.floor(Math.random() * 50) + 10}
              </span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-2 text-white/40">
              <FiMessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium text-white/60">
                {Math.floor(Math.random() * 20) + 1}
              </span>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-white/40 transition-all duration-300 hover:text-lime-300">
              <FiShare2 className="h-5 w-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>

          {/* Post ID */}
          <span className="text-xs text-white/20">Post ID: {post._id}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetails;
