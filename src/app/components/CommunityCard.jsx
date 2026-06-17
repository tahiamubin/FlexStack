"use client";

import { FiCalendar, FiUser, FiTag } from "react-icons/fi";

const CommunityCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-black border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-[#84cc16]/50 hover:shadow-[0_0_30px_rgba(132,204,22,0.05)]">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-xl font-bold text-white group-hover:text-[#84cc16] transition-colors duration-300">
          {post.title}
        </h3>
        <span className="shrink-0 px-3 py-1 text-xs font-medium text-[#84cc16] bg-[#84cc16]/10 rounded-full border border-[#84cc16]/20">
          {post.userRole}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-white/40 mb-3">
        <span className="flex items-center gap-1.5">
          <FiUser className="w-3.5 h-3.5" />
          {post.userId?.slice(0, 8) || "Anonymous"}
        </span>
        <span className="flex items-center gap-1.5">
          <FiCalendar className="w-3.5 h-3.5" />
          {formatDate(post.createdAt)}
        </span>
      </div>

      {post.image && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <p className="text-white/70 text-sm leading-relaxed">
        {post.description}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-white/50 bg-white/5 rounded-full"
            >
              <FiTag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityCard;