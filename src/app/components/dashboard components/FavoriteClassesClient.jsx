"use client";

import { useState } from "react";
import {
  FiHeart,
  FiUser,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiTag,
  FiAward,
  FiBookmark,
  FiTrash2,
} from "react-icons/fi";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

const FavoriteClassesClient = ({ favorites }) => {
  const [allFavorites, setAllFavorites] = useState(favorites);
  const [isRemoving, setIsRemoving] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const handleRemoveFavorite = async (classId) => {
    setIsRemoving(true);
    try {
      // await removeFavorite(classId);
      setAllFavorites((prev) => prev.filter((item) => item.classData._id !== classId));
      toast.success("Removed from favorites!");
    } catch (error) {
      toast.error("Failed to remove from favorites.");
    } finally {
      setIsRemoving(false);
    }
  };

  if (allFavorites.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <FiHeart className="h-12 w-12 text-white/20 mb-3" />
        <p className="text-white/40">No favorite classes yet</p>
        <p className="text-sm text-white/20 mt-1">Start exploring and save your favorite classes</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase italic text-white">
            Favorite Classes
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {allFavorites.length} {allFavorites.length === 1 ? "class" : "classes"} saved
          </p>
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-lime-300 bg-lime-300/10 px-3 py-1 rounded-full border border-lime-300/20">
          ❤️ Favorites
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allFavorites.map((fav) => {
          const classData = fav.classData;
          return (
            <div
              key={classData._id}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-300/0 via-lime-300/5 to-lime-300/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFavorite(classData._id)}
                  disabled={isRemoving}
                  className="absolute right-0 top-0 text-white/30 transition-all duration-300 hover:scale-110 hover:text-red-400 z-10"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>

                {/* Image */}
                {classData.image && (
                  <div className="relative h-40 w-full overflow-hidden rounded-xl">
                    <img
                      src={classData.image}
                      alt={classData.className}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2 rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] font-medium text-green-400 border border-green-500/30">
                  {classData.status}
                </div>

                {/* Title */}
                <h3 className="mt-3 text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
                  {classData.className}
                </h3>

                {/* Category & Difficulty */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-lime-300/10 px-2.5 py-0.5 text-xs font-medium text-lime-300">
                    <FiTag className="h-3 w-3" />
                    {classData.category}
                  </span>
                  <span
                    className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${getDifficultyColor(
                      classData.difficulty
                    )}`}
                  >
                    <FiAward className="h-3 w-3" />
                    {classData.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/60 line-clamp-2">
                  {classData.description}
                </p>

                {/* Details */}
                <div className="mt-3 flex items-center gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <FiClock className="h-3 w-3" />
                    {classData.duration} min
                  </span>
                  <span className="flex items-center gap-1 text-lime-300 font-bold">
                    <FiDollarSign className="h-3 w-3" />
                    ${classData.price}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="h-3 w-3" />
                    {formatDate(classData.createdAt)}
                  </span>
                </div>

                {/* Trainer */}
                <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                    <FiUser className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-white/40">
                    {classData.userId || "Anonymous"}
                  </span>
                  <span className="text-[10px] uppercase text-lime-300/60 ml-auto">
                    {classData.userRole}
                  </span>
                </div>

                {/* Bookmark */}
                <div className="mt-3 flex items-center border-t border-white/10 pt-3">
                  <button className="flex items-center gap-2 text-lime-300 transition-all duration-300 hover:scale-110">
                    <FiBookmark className="h-4 w-4 fill-lime-300 text-lime-300" />
                    <span className="text-xs font-medium">Saved</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteClassesClient;