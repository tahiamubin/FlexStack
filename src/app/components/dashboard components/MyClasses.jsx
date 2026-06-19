"use client";

import { useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiTag,
  FiEdit,
  FiUsers,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";
import CommunityLikes from "../CommunityLikes";
import { Button } from "@heroui/react";
import { deleteClass } from "@/lib/api/allClass";
import EditClassModal from "./EditClassModal";
import StudentsModal from "./StudentsModal";

const MyClasses = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Delete handlers
  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteClass(selectedPostId);
      setPosts((prev) => prev.filter((p) => p._id !== selectedPostId));
      toast.success("Post deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

  // Edit handlers
  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
    );
    setIsEditModalOpen(false);
  };

  // Students handlers
  const handleViewStudents = (post) => {
    setSelectedPost(post);
    setIsStudentsModalOpen(true);
  };

  if (posts.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <p className="text-white/40">You haven't created any posts yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold uppercase italic text-white">
          My Classes
        </h1>
        <span className="text-sm text-white/40">
          {posts.length} {posts.length === 1 ? "class" : "classes"}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.01]"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-300/0 via-lime-300/5 to-lime-300/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-lime-300/20 text-lime-300 border-lime-300/30">
                        {post.userRole || "member"}
                      </span>
                      <span className="text-xs text-white/30">•</span>
                      <span className="text-xs text-white/30 flex items-center gap-1">
                        <FiCalendar className="h-3 w-3" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewStudents(post)}
                    className="text-white/30 transition-all duration-300 hover:scale-110 hover:text-blue-400"
                    title="View Students"
                  >
                    <FiUsers className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEditClick(post)}
                    className="text-white/30 transition-all duration-300 hover:scale-110 hover:text-lime-300"
                    title="Edit"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post._id)}
                    className="text-white/30 transition-all duration-300 hover:scale-110 hover:text-red-400"
                    title="Delete"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
                {post.className || post.title}
              </h3>

              {/* Image */}
              {post.image && (
                <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl">
                  <img
                    src={post.image}
                    alt={post.className || post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Description */}
              <p className="mt-4 text-sm font-medium leading-relaxed text-white/60 line-clamp-3">
                {post.description}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 rounded-full bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-300 border border-lime-300/20"
                    >
                      <FiTag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex items-center gap-6 border-t border-white/10 pt-4">
                <CommunityLikes postId={post._id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white">Delete Class</h2>
            <p className="mt-2 text-white/60">
              Are you sure you want to delete this class? This action cannot be
              undone.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-white/5 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <EditClassModal
       
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={selectedPost}
        onSuccess={handleEditSuccess}
      />
   

      {/* Students Modal */}
      <StudentsModal
        isOpen={isStudentsModalOpen}
        onClose={() => setIsStudentsModalOpen(false)}
        post={selectedPost}
      />
    </div>
  );
};

export default MyClasses;
