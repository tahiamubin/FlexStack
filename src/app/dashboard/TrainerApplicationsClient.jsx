"use client";

import { editRole } from "@/lib/api/user";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiMail,
  FiUser,
  FiX,
  FiXCircle,
} from "react-icons/fi";

// Adjust this to match your actual API route for updating a trainer
// application. It should accept a PATCH request with a JSON body of
// { status: "approved" | "rejected", feedback } and, on the server:
//   - on "approved": flip the related user's role to "trainer"
//   - on "rejected": keep the user's role as "user", save the feedback,
//     and set the application's status to "rejected"
const updateApplicationStatus = async (applicationId, payload) => {
  const res = await fetch(`/api/admin/trainer-applications/${applicationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }

  return res.json().catch(() => ({}));
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TrainerApplicationsClient = ({ applications }) => {
  //console.log(applicant)
  const [allApplications, setAllApplications] = useState(applications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // The table only ever shows pending applications — once one is
  // approved or rejected it's no longer pending and drops out of view.
  const pendingApplications = allApplications.filter(
    (app) => (app.status || "pending") === "pending"
  );

  const closeModal = () => {
    if (isProcessing) return;
    setSelectedApplication(null);
    setFeedback("");
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await editRole(selectedApplication._id, {
        status: "approved",
        feedback,
      });
      toast.success(`${selectedApplication.userName} is now a Trainer.`);
      setAllApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApplication._id
            ? { ...app, status: "approved", feedback }
            : app
        )
      );
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to approve application.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      toast.error("Please provide feedback before rejecting.");
      return;
    }

    setIsProcessing(true);
    try {
      await updateApplicationStatus(selectedApplication._id, {
        status: "rejected",
        feedback,
      });
      toast.success("Application rejected.");
      setAllApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApplication._id
            ? { ...app, status: "rejected", feedback }
            : app
        )
      );
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to reject application.");
    } finally {
      setIsProcessing(false);
    }
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold uppercase italic text-white">
              Trainer Applications
            </h1>
            <p className="text-sm text-white/40 mt-1">
              Review and manage pending trainer applications
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            {pendingApplications.length} Pending
          </span>
        </div>

        {pendingApplications.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <FiUser className="h-12 w-12 text-white/20 mb-3" />
            <p className="text-white/40">No trainer applications</p>
            <p className="text-sm text-white/20 mt-1">
              No pending applications to review
            </p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="w-full">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                    Specialty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                    Applied On
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{app.userName}</p>
                        <p className="text-xs text-white/40 flex items-center gap-1">
                          <FiMail className="h-3 w-3" />
                          {app.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-lime-300 text-sm">
                        <FiAward className="h-3 w-3" />
                        {app.specialty || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-white/60 text-sm">
                        <FiClock className="h-3 w-3" />
                        {app.experience || "0"} years
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-white/40 text-sm">
                        <FiCalendar className="h-3 w-3" />
                        {formatDate(app.appliedAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedApplication(app);
                          setFeedback("");
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-white/60 hover:text-lime-300 hover:bg-lime-300/10 transition-all duration-300"
                      >
                        <FiEye className="h-4 w-4" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold uppercase italic text-white">
                  Application Details
                </h2>
                <p className="text-sm text-white/40 mt-1">
                  Review and respond to this trainer application
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-4">
              {/* Applicant Info */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-3">
                  Applicant Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Name</span>
                    <span className="text-sm font-medium text-white">
                      {selectedApplication.userName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Email</span>
                    <span className="text-sm font-medium text-white">
                      {selectedApplication.userEmail}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Applied On</span>
                    <span className="text-sm font-medium text-white">
                      {formatDate(selectedApplication.appliedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-300 mb-3">
                  Bio
                </h3>
                {/* <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Specialty</span>
                    <span className="text-sm font-medium text-lime-300">
                      {selectedApplication.specialty || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Experience</span>
                    <span className="text-sm font-medium text-white">
                      {selectedApplication.experience || "0"} years
                    </span>
                  </div>
                </div> */}
                <div>
                  {selectedApplication.bio}
                </div>
              </div>

              {/* Feedback Input */}
              <div>
                <label className="text-sm font-medium text-white/60 block mb-2">
                  Feedback <span className="text-red-400">*</span>
                </label>
                <textarea
                  placeholder="Write your feedback for the applicant..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 p-3 outline-none focus:border-lime-300/50 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 border-t border-white/10 px-6 py-5">
              <button
                type="button"
                onClick={closeModal}
                disabled={isProcessing}
                className="flex-1 rounded-xl bg-white/5 text-white hover:bg-white/10 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={isProcessing || !feedback.trim()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-500 text-white hover:bg-red-600 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiXCircle className="h-4 w-4" />
                Reject
              </button>
              <button
                type="button"
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-lime-300 text-black font-bold hover:bg-lime-400 py-2.5 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheckCircle className="h-4 w-4" />
                {isProcessing ? "Processing..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrainerApplicationsClient;