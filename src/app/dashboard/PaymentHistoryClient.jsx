"use client";

import { useState } from "react";
import {
  FiDollarSign,
  FiMail,
  FiCalendar,
  FiHash,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const PaymentHistoryClient = ({ payments }) => {
  const [copiedId, setCopiedId] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount) => {
    if (!amount) return "$0.00";
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!payments || payments.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <FiDollarSign className="h-12 w-12 text-white/20 mb-3" />
        <p className="text-white/40">No payment history found</p>
        <p className="text-sm text-white/20 mt-1">
          Payments will appear here once users make purchases
        </p>
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiSparkles className="h-4 w-4 text-lime-300" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                Payment History
              </span>
            </div>
            <h1 className="text-2xl font-bold uppercase italic text-white">
              All Payments
            </h1>
            <p className="text-sm text-white/40 mt-1">
              Complete payment history across the platform
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-lime-300 bg-lime-300/10 px-3 py-1 rounded-full border border-lime-300/20">
            {payments.length} Transactions
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  User Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                  Transactions ID
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id || index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-sm text-white">
                      <FiMail className="h-3.5 w-3.5 text-white/40" />
                      {payment.userEmail || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-white/80">
                      {payment.className || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm font-bold text-lime-300">
                      <FiDollarSign className="h-4 w-4" />
                      {formatAmount(payment.amount || payment.price || "0")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-sm text-white/40">
                      <FiCalendar className="h-3.5 w-3.5" />
                      {formatDate(payment.createdAt || payment.paidAt)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/40 truncate max-w-[120px]">
                        {payment.sessionId || payment.session_id || "N/A"}
                      </span>
                      {(payment.sessionId || payment.session_id) && (
                        <button
                          onClick={() => handleCopy(payment.sessionId || payment.session_id)}
                          className="text-white/20 hover:text-lime-300 transition-colors flex-shrink-0"
                          title="Copy Session ID"
                        >
                          {copiedId === (payment.sessionId || payment.session_id) ? (
                            <FiCheck className="h-3.5 w-3.5 text-lime-300" />
                          ) : (
                            <FiCopy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-white/30 text-center">
          Showing {payments.length} {payments.length === 1 ? "transaction" : "transactions"}
        </div>
      </div>
    </section>
  );
};

export default PaymentHistoryClient;