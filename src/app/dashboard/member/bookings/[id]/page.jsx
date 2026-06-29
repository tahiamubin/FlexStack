import { getBookingClassId} from "@/lib/api/allClass";
import React from "react";
import { HiSparkles } from "react-icons/hi2";
import {
  FiCalendar,
  FiDollarSign,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";

const page = async ({ params }) => {
  const { id } = await params;
  //console.log(id)
  const details = await getBookingClassId(id);
  //onsole.log(details);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    if (!price) return "$0.00";
    return `$${parseFloat(price).toFixed(2)}`;
  };

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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-2xl">
          {/* Receipt Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-300/20">
                    <HiSparkles className="h-6 w-6 text-lime-300" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold uppercase italic text-white">
                      Payment Receipt
                    </h1>
                    <p className="text-xs text-white/40">
                      Booking Confirmation
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    <FiCheckCircle className="inline h-3 w-3 mr-1" />
                    Paid
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="space-y-6">
              {/* Class Name */}
              <div className="text-center">
                <h2 className="text-3xl font-bold uppercase italic text-white">
                  {details?.className || "N/A"}
                </h2>
              </div>

              {/* Details Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/40">Schedule</p>
                  <p className="flex items-center gap-2 text-sm font-medium text-white mt-1">
                    <FiCalendar className="h-4 w-4 text-lime-300" />
                    {details?.schedule || "N/A"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/40">Amount Paid</p>
                  <p className="flex items-center gap-2 text-sm font-bold text-lime-300 mt-1">
                    <FiDollarSign className="h-4 w-4" />
                    {formatPrice(details?.price)}
                  </p>
                </div>
              </div>

              {/* User Info */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-3">
                  User Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">User ID</span>
                    <span className="text-sm font-medium text-white">
                      {details?.userId || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Email</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-white">
                      <FiMail className="h-3 w-3 text-lime-300" />
                      {details?.userEmail || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-3">
                  Payment Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Booking ID</span>
                    <span className="text-xs font-mono text-white/60">
                      {details?._id || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Session ID</span>
                    <span className="text-xs font-mono text-white/60 truncate max-w-[200px]">
                      {details?.sessionId || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Class ID</span>
                    <span className="text-xs font-mono text-white/60">
                      {details?.classId || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 pt-4 text-center">
                <p className="text-xs text-white/30">
                  Thank you for your booking! A confirmation email has been
                  sent.
                </p>
                <p className="text-xs text-white/20 mt-1">
                  {formatDate(new Date())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
