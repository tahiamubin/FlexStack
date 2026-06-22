"use client";

import { useState, useEffect } from "react";
import {
  FiBookOpen,
  FiUsers,
  FiUser,
  FiMail,
  FiAward,
  FiCalendar,
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const TrainerOverviewClient = ({ user, userClasses, allStudents }) => {
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

  const totalClasses = userClasses?.length || 0;
  const totalStudents = allStudents?.length || 0;

  // Get unique students
  const uniqueStudents = [...new Set(allStudents?.map(s => s.userId))] || [];
  const uniqueStudentCount = uniqueStudents.length;

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
              Trainer Dashboard
            </span>
          </div>
          <h1 className="text-3xl font-bold uppercase italic leading-[1.1] tracking-tight text-white">
            Welcome back,{" "}
            <span className="relative inline-block text-lime-300">
              {user?.name || "Trainer"}
              <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
            </span>
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Here's an overview of your classes and students
          </p>
        </div>

        {/* Stats Cards */}
        <div
          className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {/* Total Classes */}
          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/40">
                  Total Classes
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {totalClasses}
                </p>
                <p className="mt-1 text-xs text-white/30">
                  {totalClasses === 1 ? "Class" : "Classes"} created
                </p>
              </div>
              <div className="rounded-xl bg-lime-300/10 p-3 text-lime-300">
                <FiBookOpen className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-white/5">
              <div
                className="h-1 rounded-full bg-lime-300 transition-all duration-500"
                style={{ width: `${Math.min(totalClasses * 10, 100)}%` }}
              />
            </div>
          </div>

          {/* Total Students */}
          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/40">
                  Total Students
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {uniqueStudentCount}
                </p>
                <p className="mt-1 text-xs text-white/30">
                  {uniqueStudentCount === 1 ? "Student" : "Students"} enrolled
                </p>
              </div>
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <FiUsers className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-white/5">
              <div
                className="h-1 rounded-full bg-blue-400 transition-all duration-500"
                style={{ width: `${Math.min(uniqueStudentCount * 10, 100)}%` }}
              />
            </div>
          </div>

          {/* Total Enrollments */}
          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/40">
                  Total Enrollments
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {totalStudents}
                </p>
                <p className="mt-1 text-xs text-white/30">
                  {totalStudents === 1 ? "Enrollment" : "Enrollments"} total
                </p>
              </div>
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <FiTrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-white/5">
              <div
                className="h-1 rounded-full bg-purple-400 transition-all duration-500"
                style={{ width: `${Math.min(totalStudents * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Profile Section */}
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
                    {user?.role || "trainer"}
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

            {/* Trainer Badge & Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <FiAward className="h-4 w-4 text-lime-300" />
                <span className="text-sm font-medium text-white/60">
                  Trainer
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <FiBarChart2 className="h-4 w-4 text-lime-300" />
                <span className="text-sm font-medium text-white/60">
                  {totalClasses} Classes
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-4">
              Quick Overview
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-white/60">Classes Created</span>
                <span className="text-lg font-bold text-white">{totalClasses}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-white/60">Students Enrolled</span>
                <span className="text-lg font-bold text-white">{uniqueStudentCount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-white/60">Total Enrollments</span>
                <span className="text-lg font-bold text-white">{totalStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Plan</span>
                <span className="text-sm font-bold uppercase text-lime-300">
                  {user?.plan || "Free"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerOverviewClient;