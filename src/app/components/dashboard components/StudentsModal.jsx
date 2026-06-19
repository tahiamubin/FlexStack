"use client";

import { useState, useEffect } from "react";
import { FiX, FiUser } from "react-icons/fi";
import { Button } from "@heroui/react";

const StudentsModal = ({ isOpen, onClose, post  }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && post) {
      fetchAttendees();
    }
  }, [isOpen, post]);

  const fetchAttendees = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      // const data = await getAttendees(post._id);
      // setAttendees(data);
      
      // Mock data
      setAttendees([
        { name: "John Doe", email: "john@example.com" },
        { name: "Jane Smith", email: "jane@example.com" },
        { name: "Mike Johnson", email: "mike@example.com" },
        { name: "Sarah Wilson", email: "sarah@example.com" },
      ]);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Students Enrolled</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-white/40 mb-4">
            {post.className || post.title}
          </p>

          {loading ? (
            <p className="text-center text-white/40 py-8">Loading...</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {attendees.length > 0 ? (
                attendees.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-lime-300/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                      <FiUser className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{student.name}</p>
                      <p className="text-sm text-white/40">{student.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-white/40 py-8">
                  No students enrolled yet
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6">
          <Button
            onClick={onClose}
            className="w-full bg-white/5 text-white hover:bg-white/10"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsModal;