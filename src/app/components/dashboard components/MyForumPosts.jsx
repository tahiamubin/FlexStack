"use client";

import { useState } from "react";
import { FiCalendar, FiTrash2, FiUser, FiTag } from "react-icons/fi";

import CommunityLikes from "../CommunityLikes";

import { Button, Modal } from "@heroui/react";
import { Rocket } from "lucide-react";

import toast from "react-hot-toast";
import { deleteForum } from "@/lib/api/community";

const MyForumPosts = ({ initialPosts }) => {
  console.log(initialPosts)
  const [posts, setPosts] = useState(initialPosts);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = async(id) => {
    console.log("Deleting id:", id, "Type:", typeof id);
    const deleteData = await deleteForum(id);
     console.log("response:", deleteData);
    toast.success("Post Deleted successfully!");
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
          My Forum Posts
        </h1>
        <span className="text-sm text-white/40">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/30 hover:bg-white/10 hover:scale-[1.01]"
          >
            {/* Glow effect */}
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

                {/* Delete Button */}
                <Modal>
                  <Button
                    variant="danger"
                    className="text-white/30  transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiTrash2 className="h-5 w-5 text-white" />
                  </Button>
                  <Modal.Backdrop>
                    <Modal.Container>
                      <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                          <Modal.Icon className="bg-default text-foreground">
                            <Rocket className="size-5" />
                          </Modal.Icon>
                          <Modal.Heading>Delete Forum Post</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Are you sure you want to delete this post?</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                             onClick={() => handleDelete(post._id)}
                            variant="danger"
                            className="w-full"
                            slot="close"
                          >
                            Continue
                          </Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
                {post.title}
              </h3>

              {/* Image */}
              {post.image && (
                <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl">
                  <img
                    src={post.image}
                    alt={post.title}
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
                <button className="flex items-center gap-2 text-white/40 transition-all duration-300 hover:scale-110 hover:text-lime-300">
                  <CommunityLikes postId={post.userId}></CommunityLikes>
                </button>

                {/* <button className="flex items-center gap-2 text-white/40 transition-all duration-300 hover:scale-110 hover:text-lime-300">
                  <FiMessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {Math.floor(Math.random() * 20) + 1}
                  </span>
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyForumPosts;
