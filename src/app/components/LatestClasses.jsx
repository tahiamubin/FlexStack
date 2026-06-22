import { getLatestClasses } from '@/lib/api/allClass';
import React from 'react';
import { HiSparkles } from 'react-icons/hi2';
import Link from 'next/link';
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiTag,
  FiAward,
  FiArrowRight,
} from 'react-icons/fi';

const LatestClasses = async () => {
  const classes = await getLatestClasses();
  console.log(classes)

  // Filter only approved classes
  const approvedClasses = classes?.filter((cls) => cls.status === "approved") || [];

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "text-white/40 bg-white/5 border-white/10";
    const colors = {
      beginner: "text-green-400 bg-green-400/10 border-green-400/30",
      intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      advanced: "text-red-400 bg-red-400/10 border-red-400/30",
      "all-levels": "text-blue-400 bg-blue-400/10 border-blue-400/30",
    };
    return colors[difficulty] || "text-white/40 bg-white/5 border-white/10";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (approvedClasses.length === 0) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-black to-zinc-950 py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="text-center">
            <div className="mb-5 flex items-center justify-center gap-2">
              <HiSparkles className="h-4 w-4 text-lime-300" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                Latest Classes
              </span>
            </div>
            <h2 className="max-w-3xl mx-auto text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              No classes{" "}
              <span className="relative font-bold inline-block text-lime-300 not-italic">
                available
                <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
              </span>
              .
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base font-medium text-white/60">
              Check back soon for new classes
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black to-zinc-950 py-24">
      {/* Gradient accents */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-lime-300/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-lime-300/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="mb-5 flex items-center justify-center gap-2">
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              Latest Classes
            </span>
          </div>

          <h2 className="max-w-3xl mx-auto text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover our latest{" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              classes
              <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
            </span>
            .
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base font-medium text-white/60">
            Expert-led sessions designed to help you achieve your fitness goals
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {approvedClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-300/0 via-lime-300/5 to-lime-300/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* Image */}
                {classItem.image && (
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    <img
                      src={classItem.image}
                      alt={classItem.className}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 right-4 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/30">
                  {classItem.status || "Approved"}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
                  {classItem.className || "Untitled Class"}
                </h3>

                {/* Category & Difficulty */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {classItem.category && (
                    <span className="flex items-center gap-1 rounded-full bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-300">
                      <FiTag className="h-3 w-3" />
                      {classItem.category}
                    </span>
                  )}
                  {classItem.difficulty && (
                    <span
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border ${getDifficultyColor(
                        classItem.difficulty
                      )}`}
                    >
                      <FiAward className="h-3 w-3" />
                      {classItem.difficulty}
                    </span>
                  )}
                </div>

                {/* Description */}
                {classItem.description && (
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/60 line-clamp-2">
                    {classItem.description}
                  </p>
                )}

                {/* Details */}
                <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
                  {classItem.duration && (
                    <span className="flex items-center gap-1">
                      <FiClock className="h-4 w-4" />
                      {classItem.duration} min
                    </span>
                  )}
                  {classItem.price && (
                    <span className="flex items-center gap-1 text-lime-300 font-bold">
                      <FiDollarSign className="h-4 w-4" />${classItem.price}
                    </span>
                  )}
                  {classItem.createdAt && (
                    <span className="flex items-center gap-1">
                      <FiCalendar className="h-4 w-4" />
                      {formatDate(classItem.createdAt)}
                    </span>
                  )}
                </div>

                {/* Trainer */}
                <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                    <FiUser className="h-3 w-3" />
                  </div>
                  <span className="text-[10px] uppercase text-lime-300/60">
                    {classItem.userRole || "Trainer"}
                  </span>
                </div>

                {/* Book Now */}
                <div className="mt-4 flex items-center border-t border-white/10 pt-3">
                  <Link href={`/allclasses/${classItem._id}`} className="w-full">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-4 py-2 text-sm font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] hover:bg-lime-400 active:scale-95">
                      Book Now
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestClasses;