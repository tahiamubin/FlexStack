"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FiSend, FiUser } from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";

import { createCommunityComment } from "@/lib/actions/community";
import { getCommunityComment } from "@/lib/api/community";

const Comments = ({ postId }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommunityComment(postId);
        console.log("Fetched comments:", data);
        // The data is already an array of comments
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
      console.log("User:", user, "Data:", data, "PostId:", postId);
      
      await createCommunityComment(postId, user, data);

      // Refetch comments after posting
      const updated = await getCommunityComment(postId);
      console.log("Updated comments:", updated);
      setComments(Array.isArray(updated) ? updated : []);

      setText("");
      router.refresh();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
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
    <div className="space-y-4">
      {/* Comment List */}
      <div className="space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id || comment.id || Math.random()} className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                <FiUser className="h-4 w-4" />
              </div>
              <div>
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
  );
};

export default Comments;