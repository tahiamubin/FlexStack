"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { editClass } from "@/lib/api/allClass";


const EditClassModal = ({ isOpen, onClose, post, onSuccess }) => {
  
  const [loading, setLoading] = useState(false);

  if (!isOpen || !post) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      console.log(post._id)

      const updatedPost = await editClass(data, post._id);
      
      onSuccess(updatedPost);
      toast.success("Class updated successfully!");
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("Failed to update class.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-black p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit Class</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-white/60">
              Class Name
            </label>
            <input
              name="className"
              defaultValue={post.className || post.title}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/60">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={post.description}
              rows="4"
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/60">
              Category
            </label>
            <input
              name="category"
              defaultValue={post.category || ""}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/60">
              Difficulty
            </label>
            <input
              name="difficulty"
              defaultValue={post.difficulty || ""}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-white/60">
                Duration (min)
              </label>
              <input
                name="duration"
                type="number"
                defaultValue={post.duration || ""}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/60">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                defaultValue={post.price || ""}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-white/60">
              Schedule
            </label>
            <input
              name="schedule"
              defaultValue={post.schedule || ""}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/60">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              defaultValue={post.tags?.join(", ") || ""}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white focus:border-lime-300/50 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 text-white hover:bg-white/10"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-lime-300 text-black font-bold hover:bg-lime-400"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassModal;