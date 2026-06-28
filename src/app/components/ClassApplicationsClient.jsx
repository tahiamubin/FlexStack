"use client";

import { editClass } from "@/lib/api/allClass";
import { Button, TextArea } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiClock, FiDollarSign, FiEye, FiTag, FiX, FiXCircle } from "react-icons/fi";

/* ─── Reusable Portal Modal ─────────────────────────────────────────────── */
const Modal = ({ isOpen, onClose, children, size = "md" }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className={`relative w-full ${sizeClasses[size]} rounded-3xl border border-white/10 bg-black shadow-2xl`}
        style={{ animation: "fadeSlideIn 0.18s ease" }}
      >
        {children}
      </div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
};

const ModalHeader = ({ children, onClose }) => (
  <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
    <div>{children}</div>
    <button
      onClick={onClose}
      className="ml-4 mt-0.5 rounded-full p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
    >
      <FiX className="h-4 w-4" />
    </button>
  </div>
);

const ModalBody = ({ children }) => (
  <div className="px-6 py-5">{children}</div>
);

const ModalFooter = ({ children }) => (
  <div className="flex gap-3 border-t border-white/10 px-6 py-4">{children}</div>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */
const ClassApplicationsClient = ({ applications }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const closeDetails = () => setIsDetailsModalOpen(false);
  const closeReject  = () => setIsRejectModalOpen(false);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };


  const handleAccept = async (id) => {
    console.log('id' , id)
    setIsProcessing(true);
    try {
     const approved = await editClass({status: "approved"}, id)
      toast.success("Application accepted! User is now a Trainer."); 
      closeDetails();
    } catch {
      alert("Failed to accept application.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectClick = async ( id) => {
    setFeedback("");
    setIsRejectModalOpen(true);
    const approved = await editClass({status: "reject"}, id)
  };

  const handleRejectConfirm = async () => {
    if (!feedback.trim()) {
      alert("Please provide feedback before rejecting.");
      return;
    }
    setIsProcessing(true);
    try {
      // await rejectApplication(selectedApplication._id, feedback);
      alert("Application rejected.");
      closeReject();
      closeDetails();
    } catch {
      alert("Failed to reject application.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!applications || applications.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <p className="text-white/40">No pending applications</p>
      </div>
    );
  }

  const difficultyStyle = {
    beginner:     "bg-green-400/10 text-green-400",
    intermediate: "bg-yellow-400/10 text-yellow-400",
    advanced:     "bg-red-400/10 text-red-400",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase italic text-white">Class Applications</h1>
          <p className="text-sm text-white/40 mt-1">Showing {applications.length} pending applications</p>
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
          {applications.length} Pending
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              {["Class Name", "Category", "Difficulty", "Duration", "Price", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-white font-medium">{app.className}</td>

                <td className="px-4 py-3 text-lime-300">
                  <span className="flex items-center gap-1">
                    <FiTag className="h-3 w-3" />{app.category}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyStyle[app.difficulty] ?? "bg-blue-400/10 text-blue-400"}`}>
                    {app.difficulty}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-white/60">
                    <FiClock className="h-3 w-3" />{app.duration} min
                  </span>
                </td>

                <td className="px-4 py-3 text-lime-300 font-bold">
                  <span className="flex items-center gap-1">
                    <FiDollarSign className="h-3 w-3" />{app.price}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="text-xs font-medium uppercase px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    {app.status}
                  </span>
                </td>

                {/* ── Action buttons directly in each row ── */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    
                    <button
                      title="Accept"
                      onClick={() => { setSelectedApplication(app); handleAccept(app._id); }}
                      className="rounded-lg p-1.5 text-white/50 transition hover:bg-lime-300/10 hover:text-lime-300"
                    >
                      <FiCheckCircle className="h-4 w-4" />
                    </button>
                    <button
                      title="Reject"
                      onClick={() => { setSelectedApplication(app); setFeedback(""); setIsRejectModalOpen(true); }}
                      className="rounded-lg p-1.5 text-white/50 transition hover:bg-red-400/10 hover:text-red-400"
                    >
                      <FiXCircle className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Details Modal ─────────────────────────────────────────────────── */}
      <Modal isOpen={isDetailsModalOpen} onClose={closeDetails} size="lg">
        <ModalHeader onClose={closeDetails}>
          <h2 className="text-2xl font-bold uppercase italic text-white">Application Details</h2>
          <p className="text-sm text-white/40 mt-0.5">Review and respond to this class application</p>
        </ModalHeader>

        <ModalBody>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-lime-300">
                  Class Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Class Name",  selectedApplication.className],
                    ["Category",    selectedApplication.category],
                    ["Difficulty",  selectedApplication.difficulty],
                    ["Duration",    `${selectedApplication.duration} min`],
                    ["Price",       `$${selectedApplication.price}`],
                    ["Schedule",    selectedApplication.schedule],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-white/40">{label}</p>
                      <p className={`text-sm font-medium ${["Category","Price"].includes(label) ? "text-lime-300 font-bold" : "text-white"}`}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-lime-300">Description</h3>
                <p className="text-sm text-white/60">{selectedApplication.description}</p>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onPress={closeDetails}
            disabled={isProcessing}
            className="flex-1 bg-white/5 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onPress={handleRejectClick}
            disabled={isProcessing}
            className="flex-1 bg-red-500 text-white font-semibold hover:bg-red-600"
            startContent={<FiXCircle className="h-4 w-4" />}
          >
            Reject
          </Button>
          <Button
            onPress={handleAccept}
            disabled={isProcessing}
            className="flex-1 bg-lime-300 text-black font-bold hover:bg-lime-400"
            startContent={<FiCheckCircle className="h-4 w-4" />}
          >
            {isProcessing ? "Processing…" : "Accept"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* ── Reject Feedback Modal ─────────────────────────────────────────── */}
      <Modal isOpen={isRejectModalOpen} onClose={closeReject} size="md">
        <ModalHeader onClose={closeReject}>
          <h2 className="text-2xl font-bold uppercase italic text-white">Reject Application</h2>
          <p className="text-sm text-white/40 mt-0.5">Provide feedback so the applicant can improve</p>
        </ModalHeader>

        <ModalBody>
          <label className="mb-2 block text-sm font-medium text-white/60">
            Feedback <span className="text-red-400">*</span>
          </label>
          <TextArea
            placeholder="Explain why this application is being rejected…"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            minRows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-red-400/50 focus:outline-none focus:ring-1 focus:ring-red-400/30"
          />
          {!feedback.trim() && (
            <p className="mt-1.5 text-xs text-red-400/70">Feedback is required to reject an application.</p>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onPress={closeReject}
            disabled={isProcessing}
            className="flex-1 bg-white/5 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onPress={handleRejectConfirm}
            disabled={isProcessing || !feedback.trim()}
            className="flex-1 bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
            startContent={<FiXCircle className="h-4 w-4" />}
          >
            {isProcessing ? "Rejecting…" : "Confirm Reject"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ClassApplicationsClient;