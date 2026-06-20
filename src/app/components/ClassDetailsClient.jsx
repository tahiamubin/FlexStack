"use client";

import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiTag,
  FiAward,
  FiUser,
  FiArrowRight,
  FiShoppingCart,
} from "react-icons/fi";
import { Button } from "@heroui/react";
import { HiSparkles } from "react-icons/hi2";

const ClassDetailsClient = ({ classData }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-green-400/20 text-green-400 border-green-400/30",
      intermediate: "bg-yellow-400/20 text-yellow-400 border-yellow-400/30",
      advanced: "bg-red-400/20 text-red-400 border-red-400/30",
      "all-levels": "bg-blue-400/20 text-blue-400 border-blue-400/30",
    };
    return colors[difficulty] || "bg-white/5 text-white/40 border-white/10";
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black ">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #84cc16 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient accents */}
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div
            className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              Class Details
            </span>
          </div>

          <h1
            className={`text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out sm:text-5xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {classData?.className}
          </h1>

          <p
            className={`mt-4 text-base font-medium text-white/60 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {classData?.category} • {classData?.difficulty}
          </p>
        </div>

        {/* Content */}
        <div
          className={`grid gap-20 lg:grid-cols-2 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Left - Image */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5">
            {classData?.image ? (
              <img
                src={classData.image}
                alt={classData.className}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            ) : (
              <div className="flex h-[400px] lg:h-[500px] items-center justify-center bg-white/5">
                <p className="text-white/40">No image available</p>
              </div>
            )}
            {/* Status Badge */}
            <div className="absolute top-4 right-4 rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-medium text-green-400 border border-green-500/30">
              {classData?.status}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              {/* Price */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-medium text-white/40">Price</span>
                <span className="text-3xl font-bold text-lime-300">
                  ${classData?.price}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-2">
                  Description
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {classData?.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-xs text-white/40">Category</p>
                  <p className="text-sm font-medium text-white flex items-center gap-1">
                    <FiTag className="h-3 w-3 text-lime-300" />
                    {classData?.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Difficulty</p>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border ${getDifficultyColor(
                      classData?.difficulty,
                    )}`}
                  >
                    <FiAward className="h-3 w-3" />
                    {classData?.difficulty}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-white/40">Duration</p>
                  <p className="text-sm font-medium text-white flex items-center gap-1">
                    <FiClock className="h-3 w-3 text-lime-300" />
                    {classData?.duration} min
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Schedule</p>
                  <p className="text-sm font-medium text-white">
                    {classData?.schedule}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Trainer</p>
                  <p className="text-sm font-medium text-white flex items-center gap-1">
                    <FiUser className="h-3 w-3 text-lime-300" />
                    {classData?.userId || "Anonymous"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Posted</p>
                  <p className="text-sm font-medium text-white flex items-center gap-1">
                    <FiCalendar className="h-3 w-3 text-lime-300" />
                    {formatDate(classData?.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="mt-6">
              <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="price" value={classData?.price}></input>
              <input type="hidden" name="className" value={classData?.className}></input>
              
              <input  type="hidden" name="schedule" value={classData?.schedule}></input>
              <input  type="hidden" name="classId" value={classData?._id}></input>
                <section>
                  <Button
                  type="submit"
                    size="lg"
                    radius="full"
                    className="relative w-full h-14 bg-lime-300 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_40px_rgba(132,204,22,0.3)]"
                    endContent={
                      <FiShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    }
                  >
                    Buy Now — ${classData?.price}
                  </Button>
                </section>
              </form>

              <p className="text-center text-xs text-white/30 mt-3">
                Secure checkout • Instant access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassDetailsClient;
