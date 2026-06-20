"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationClass = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-10 px-3 rounded-xl border border-white/10 text-white/40 transition-all duration-300 hover:border-lime-300/50 hover:text-lime-300 hover:bg-lime-300/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-white/40 disabled:hover:bg-transparent"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`flex items-center justify-center h-10 w-10 rounded-xl font-medium transition-all duration-300 ${
            currentPage === page
              ? "bg-lime-300 text-black"
              : page === "..."
                ? "text-white/40 cursor-default"
                : "text-white/60 hover:text-lime-300 hover:border-lime-300/50 hover:bg-lime-300/10 border border-transparent hover:border"
          }`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center h-10 px-3 rounded-xl border border-white/10 text-white/40 transition-all duration-300 hover:border-lime-300/50 hover:text-lime-300 hover:bg-lime-300/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-white/40 disabled:hover:bg-transparent"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PaginationClass;
