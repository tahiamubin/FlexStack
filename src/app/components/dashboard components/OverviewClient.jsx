"use client";

import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiHeart,
  FiUser,
  FiMail,
  FiAward,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiBookOpen,
  FiStar,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import Image from "next/image";

const OverviewClient = ({
  user,
  bookings,
  favorites,
  trainerApplication: trainerApplicationRaw,
}) => {
  const trainerApplication = Array.isArray(trainerApplicationRaw)
    ? trainerApplicationRaw[0]
    : trainerApplicationRaw;
  //console.log("from client", trainerApplication);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      approved: "text-green-400 bg-green-400/10 border-green-400/30",
      rejected: "text-red-400 bg-red-400/10 border-red-400/30",
    };
    return colors[status] || "text-white/40 bg-white/5 border-white/10";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="h-5 w-5" />;
      case "approved":
        return <FiCheckCircle className="h-5 w-5" />;
      case "rejected":
        return <FiXCircle className="h-5 w-5" />;
      default:
        return <FiAlertCircle className="h-5 w-5" />;
    }
  };

  const totalBookings = bookings?.length || 0;
  const totalFavorites = favorites?.length || 0;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
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
        <div
          className={`mb-10 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              Dashboard Overview
            </span>
          </div>
          <h1 className="text-3xl font-bold uppercase italic leading-[1.1] tracking-tight text-white">
            Welcome back,{" "}
            <span className="relative inline-block text-lime-300">
              {user?.name || "User"}
              <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
            </span>
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Here's a summary of your fitness journey
          </p>
        </div>

        {/* Stats Cards */}
        <div
          className={`grid gap-6 md:grid-cols-2 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {/* Total Bookings */}
          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/40">
                  Total Bookings
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {totalBookings}
                </p>
                <p className="mt-1 text-xs text-white/30">
                  {totalBookings === 1 ? "Class" : "Classes"} registered
                </p>
              </div>
              <div className="rounded-xl bg-lime-300/10 p-3 text-lime-300">
                <FiCalendar className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-white/5">
              <div
                className="h-1 rounded-full bg-lime-300 transition-all duration-500"
                style={{ width: `${Math.min(totalBookings * 10, 100)}%` }}
              />
            </div>
          </div>

          {/* Total Favorites */}
          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/40">
                  Total Favorites
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {totalFavorites}
                </p>
                <p className="mt-1 text-xs text-white/30">
                  {totalFavorites === 1 ? "Class" : "Classes"} saved
                </p>
              </div>
              <div className="rounded-xl bg-pink-500/10 p-3 text-pink-400">
                <FiHeart className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-white/5">
              <div
                className="h-1 rounded-full bg-pink-400 transition-all duration-500"
                style={{ width: `${Math.min(totalFavorites * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Profile & Application Section */}
        <div
          className={`mt-8 grid gap-6 lg:grid-cols-2 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Profile Details */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-4">
              Profile Details
            </h2>

            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-lime-300/30">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-lime-300/10 text-lime-300">
                    <FiUser className="h-8 w-8" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    {user?.name || "Unknown User"}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-lime-300/20 text-lime-300 border-lime-300/30">
                    {user?.role || "member"}
                  </span>
                </div>
                <p className="text-sm text-white/40 flex items-center gap-1 mt-1">
                  <FiMail className="h-3 w-3" />
                  {user?.email || "No email"}
                </p>
                <p className="text-xs text-white/30 mt-1">
                  Member since {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>

          
            
          </div>

          {/* Trainer Application Status */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-4">
              Trainer Application
            </h2>

            {trainerApplication ? (
              <div className="space-y-4">
                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border ${getStatusColor(
                      trainerApplication.status,
                    )}`}
                  >
                    {getStatusIcon(trainerApplication.status)}
                    <span className="uppercase">
                      {trainerApplication.status || "Pending"}
                    </span>
                  </div>
                  <span className="text-xs text-white/30">
                    Applied on {formatDate(trainerApplication.appliedAt)}
                  </span>
                </div>

                {/* Application Details */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Specialty</span>
                    <span className="text-sm font-medium text-white">
                      {trainerApplication.specialty || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Experience</span>
                    <span className="text-sm font-medium text-white">
                      {trainerApplication.experience || "0"} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Bio</span>
                    <span className="text-sm text-white/60 text-right max-w-[60%] line-clamp-2">
                      {trainerApplication.bio || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Admin Feedback (if rejected) */}
               

                {trainerApplication.status === "pending" && (
                  <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3">
                    <div className="flex items-center gap-2">
                      <FiClock className="h-4 w-4 text-yellow-400" />
                      <p className="text-sm text-yellow-400">
                        Your application is being reviewed by admins
                      </p>
                    </div>
                  </div>
                )}
{/* 
                {trainerApplication.status === "approved" && (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="h-4 w-4 text-green-400" />
                      <p className="text-sm text-green-400">
                        Congratulations! You are now a trainer
                      </p>
                    </div>
                  </div>
                )} */}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FiAward className="h-12 w-12 text-white/20 mb-3" />
                <p className="text-white/40">No application found</p>
                <p className="text-sm text-white/20 mt-1">
                  Apply to become a trainer and share your expertise
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewClient;
