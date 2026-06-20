"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiCalendar,
  FiClock,
  FiEye,
  FiUser,
  FiCheckCircle,
  FiTag,
} from "react-icons/fi";
import { Button } from "@heroui/react";
import { HiSparkles } from "react-icons/hi2";

const BookingsClient = ({ bookings }) => {
  const [mounted, setMounted] = useState(true);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <FiCalendar className="h-12 w-12 text-white/20 mb-3" />
        <p className="text-white/40">No bookings found</p>
        <p className="text-sm text-white/20 mt-1">
          You haven't registered for any classes yet
        </p>
        <Link
          href="/allclasses"
          className="mt-4 text-sm font-medium text-lime-300 hover:text-lime-200 transition-colors"
        >
          Browse Classes →
        </Link>
      </div>
    );
  }

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

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <HiSparkles className="h-4 w-4 text-lime-300" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                  My Bookings
                </span>
              </div>
              <h1 className="text-3xl font-bold uppercase italic leading-[1.1] tracking-tight text-white">
                Registered{" "}
                <span className="relative inline-block text-lime-300">
                  Classes
                  <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
                </span>
              </h1>
              <p className="mt-2 text-sm text-white/40">
                Classes you have successfully registered and paid for
              </p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-lime-300 bg-lime-300/10 px-4 py-2 rounded-full border border-lime-300/20">
              {bookings.length} {bookings.length === 1 ? "Class" : "Classes"}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  Class Name
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  Schedule
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  Status
                </th>
                <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider text-white/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-white">
                        {booking.className}
                      </p>
                      <p className="text-xs text-white/40">
                        Booking ID: {booking._id.slice(-6)}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-white/60">
                      <FiCalendar className="h-3.5 w-3.5 text-lime-300" />
                      {booking.schedule}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      <FiCheckCircle className="h-3 w-3" />
                      Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/dashboard/member/allclasses/${booking._id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-lime-300 hover:bg-lime-300/10 transition-all duration-300"
                        startContent={<FiEye className="h-4 w-4" />}
                      >
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-white/30 text-center">
          Showing {bookings.length} registered {bookings.length === 1 ? "class" : "classes"}
        </div>
      </div>
    </section>
  );
};

export default BookingsClient;