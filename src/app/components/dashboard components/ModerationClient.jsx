"use client";

import { deleteForum } from "@/lib/api/community";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiAlertTriangle,
  FiCalendar,
  FiTag,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const ModerationClient = ({ posts }) => {
  //console.log(posts)
  const allPosts = posts.data
 
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (id) => {
    setIsProcessing(true);
    try {
      const post = await deleteForum(id);

      toast.success("Post deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete post.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <p className="text-white/40">No posts to moderate</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase italic text-white">
            Moderation Panel
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Manage and moderate community posts
          </p>
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-lime-300 bg-lime-300/10 px-3 py-1 rounded-full border border-lime-300/20">
          {allPosts.length} Posts
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                Title
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                Tags
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((post) => (
              <tr
                key={post._id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="text-white font-medium line-clamp-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-white/40 line-clamp-1 mt-0.5">
                    {post.description}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium uppercase px-2 py-0.5 rounded-full ${
                      post.userRole === "trainer"
                        ? "bg-lime-300/20 text-lime-300 border border-lime-300/30"
                        : post.userRole === "admin"
                          ? "bg-purple-400/20 text-purple-400 border border-purple-400/30"
                          : "bg-blue-400/20 text-blue-400 border border-blue-400/30"
                    }`}
                  >
                    {post.userRole || "member"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-0.5 rounded-full bg-lime-300/10 px-2 py-0.5 text-[10px] font-medium text-lime-300"
                      >
                        <FiTag className="h-2 w-2" />
                        {tag}
                      </span>
                    ))}
                    {post.tags?.length > 2 && (
                      <span className="text-[10px] text-white/30">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-white/40 text-sm">
                    <FiCalendar className="h-3 w-3" />
                    {formatDate(post.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                    onClick={() => handleDeleteClick(post)}
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Delete Confirmation Modal — HeroUI v3 API */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white">Delete Class</h2>
              <p className="mt-2 text-white/60">
                Are you sure you want to delete this class? This action cannot
                be undone.
              </p>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 bg-white/5 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => handleDeleteConfirm(selectedPost._id)}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModerationClient;
