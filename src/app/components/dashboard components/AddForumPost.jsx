"use client";

import { useEffect, useState, useRef } from "react";

import toast from "react-hot-toast";
import { imageUpload } from "@/lib/imageUpload";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { SelectItem } from "@gravity-ui/uikit";
import { HiSparkles } from "react-icons/hi2";
import {
  FiFileText,
  FiHash,
  FiImage,
  FiSend,
  FiTag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";
import { authClient } from "@/lib/auth-client";
import { createCommunity } from "@/lib/actions/community";

const AddForumPost = () => {
  const [mounted, setMounted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const fileInputRef = useRef(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    //console.log(user)

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      // Upload image if exists
      let imageUrl = null;
      if (data.image && data.image.size > 0) {
        const uploadedImage = await imageUpload(data.image);
        console.log("image", uploadedImage);
        imageUrl = uploadedImage.url;
      }
      console.log("image", imageUrl);

      // Prepare post data
      const postData = {
        title: data.title,
        description: data.description,
        image: imageUrl,
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
        userRole: user?.role || "Anonymous",
        userId: user?.id || "Anonymous",
        createdAt: new Date().toISOString(),
      };

      console.log("Post data:", postData);

      // TODO: Send to API
      const res = await createCommunity(postData);
      if (res.insertedId) {
        toast.success("Post published successfully! ");
      }
      // Show success message

      // Reset form
      e.target.reset();
      setPreviewUrl(null);
      setFileName("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

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

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1
            className={`text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out sm:text-5xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Share Your{" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              fitness journey
              <span
                className={`absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime-300 transition-transform duration-500 ease-out ${
                  mounted ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              />
            </span>
          </h1>

          <p
            className={`mt-4 text-base font-medium text-white/60 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Share your experiences, tips, and connect with the community
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className={`space-y-8 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Post Image Upload */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/50">
            <div className="flex flex-col items-center gap-4">
              {/* Image Preview / Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-full max-w-md aspect-video rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group ${
                  previewUrl
                    ? "border-lime-300/50 bg-black/50"
                    : "border-white/20 bg-white/5 hover:border-lime-300/50 hover:bg-white/10"
                }`}
              >
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Post preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        Click to change
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-white/40">
                    <FiImage className="w-12 h-12" />
                    <div className="text-center">
                      <p className="text-sm font-medium">Upload post image</p>
                      <p className="text-xs text-white/30">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Image Controls */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm text-lime-300 hover:text-lime-200 font-medium transition-colors group"
                >
                  <FiImage className="w-4 h-4 transition-transform group-hover:scale-110" />
                  {previewUrl ? "Change image" : "Choose image"}
                </button>

                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 font-medium transition-colors group"
                  >
                    <FiX className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    Remove
                  </button>
                )}
              </div>

              {fileName && (
                <p className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                  📎 {fileName}
                </p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Post Title */}
            <TextField name="title" isRequired>
              <Label className="text-white font-medium">
                <span className="flex items-center gap-2">
                  <FiFileText className="text-lime-300" />
                  Post Title
                </span>
              </Label>
              <Input
                placeholder="Give your post a catchy title..."
                className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                className={{
                  input: "text-white",
                  inputWrapper:
                    "hover:border-lime-300/50 focus:border-lime-300",
                }}
              />
              <FieldError className="text-red-400" />
            </TextField>

            {/* Tags */}
            <TextField name="tags">
              <Label className="text-white font-medium">
                <span className="flex items-center gap-2">
                  <FiHash className="text-lime-300" />
                  Tags
                </span>
              </Label>
              <Input
                placeholder="Add tags separated by commas (e.g., fitness, nutrition, motivation)"
                className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                className={{
                  input: "text-white",
                  inputWrapper:
                    "hover:border-lime-300/50 focus:border-lime-300",
                }}
              />
              <p className="mt-1 text-xs text-white/30">
                Separate tags with commas to help others find your post
              </p>
              <FieldError className="text-red-400" />
            </TextField>

            {/* Description */}
            <TextField name="description" isRequired>
              <Label className="text-white font-medium">
                <span className="flex items-center gap-2">
                  <FiFileText className="text-lime-300" />
                  Description
                </span>
              </Label>
              <TextArea
                placeholder="Share your story, tips, or ask questions..."
                className="rounded-3xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                className={{
                  input: "text-white",
                  inputWrapper:
                    "hover:border-lime-300/50 focus:border-lime-300",
                }}
                rows={6}
              />
              <FieldError className="text-red-400" />
            </TextField>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            radius="full"
            className="relative w-full h-14 bg-lime-300 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_40px_rgba(132,204,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            endContent={
              <FiSend className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            }
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Publishing...
              </span>
            ) : (
              "Publish Post"
            )}
          </Button>

          {/* Footer note */}
          <p className="text-center text-xs text-white/30">
            By publishing, you agree to our community guidelines
          </p>
        </form>
      </div>
    </section>
  );
};

export default AddForumPost;
