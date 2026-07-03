"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FiSend, FiUser } from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";

import { createCommunityComment } from "@/lib/actions/community";
import { deleteComment, getCommunityComment, updateComment } from "@/lib/api/community";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

const Comments = ({ postId }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  // Edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [editName, setEditName] = useState("");

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommunityComment(postId);
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);

    try {
      const formdata = new FormData(e.currentTarget);
      const data = Object.fromEntries(formdata.entries());
      const user = await getUserSession();

      await createCommunityComment(postId, user, data);

      const updated = await getCommunityComment(postId);
      setComments(Array.isArray(updated) ? updated : []);
      setText("");
      router.refresh();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      await updateComment(editingComment._id, {text: editText })
      
      // Refresh comments after update
      const updated = await getCommunityComment(postId);
      setComments(Array.isArray(updated) ? updated : []);
      
      setIsEditModalOpen(false);
      setEditingComment(null);
      router.refresh();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const openEditModal = async(comment) => {
    setEditingComment(comment);
    setEditText(comment.text);
    setEditName(comment.name || "");
    setIsEditModalOpen(true);
  
  };

  const handleDelete = async (commentId) => {
    //console.log(commentId)
   toast.success("Your comment has been deleted")
    
    try {
  
      await deleteComment(commentId)
      
      const updated = await getCommunityComment(postId);
      setComments(Array.isArray(updated) ? updated : []);
      router.refresh();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="space-y-4">
        {/* Comment List */}
        <div className="space-y-3">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id  || Math.random()}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                  <FiUser className="h-4 w-4" />
                </div>
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {comment.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-white/30">•</span>
                      <span className="text-xs text-white/30">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button 
                      onClick={() => openEditModal(comment)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <MdEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(comment._id )}
                      className="text-white/40 hover:text-red-400 transition-colors"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/40 text-center py-2">
              No comments yet
            </p>
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-lime-300/50 transition-colors"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-lime-300 text-black font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-lime-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !text.trim()}
          >
            <FiSend className="h-4 w-4" />
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      </div>

      {/* Edit Modal - Simple */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">Edit Comment</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Comment</label>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300 resize-none"
                  rows="3"
                  placeholder="Your comment"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingComment(null);
                  }}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-lime-300 text-black font-medium rounded-lg hover:bg-lime-400 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;