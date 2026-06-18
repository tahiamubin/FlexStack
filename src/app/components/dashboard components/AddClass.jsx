"use client";

import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";


import { authClient } from "@/lib/auth-client";
import { HiSparkles } from "react-icons/hi2";
import {
  FiAward,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiImage,
  FiSend,
  FiTag,
  FiX,
} from "react-icons/fi";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { createClass } from "@/lib/actions/allClass";
import { imageUpload } from "@/lib/imageUpload";

const AddClass = () => {
  
  const [mounted, setMounted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const fileInputRef = useRef(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
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

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      let imageUrl = null;
      if (data.image && data.image.size > 0) {
        const uploadedImage = await imageUpload(data.image);
        imageUrl = uploadedImage.url;
      }

      const classData = {
        className: data.className,
        category: data.category,
        difficulty: data.difficulty,
        duration: data.duration,
        schedule: data.schedule,
        price: data.price,
        description: data.description,
        image: imageUrl,
        userRole: user?.role || "trainer",
        userId: user?.id || "Anonymous",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      console.log(classData);

      const res = await createClass(classData);

      if (res.insertedId) {
        setStatus("pending");
        toast.success("Class submitted for approval!");
        e.target.reset();
        setPreviewUrl(null);
        setFileName("");
        setSelectedCategory("");
        setSelectedDifficulty("");
      }
    } catch (error) {
      console.error("Error publishing class:", error);
      toast.error("Failed to publish class. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #84cc16 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div
            className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              Add New Class
            </span>
          </div>

          <h1
            className={`text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out sm:text-5xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Create Your{" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              class
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
            Share your expertise and help others achieve their fitness goals
          </p>
        </div>

        {/* Status Message */}
        {/* {status === "pending" && (
          <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center transition-all duration-300">
            <p className="text-sm font-medium text-yellow-400">
              ⏳ Your class has been submitted and is pending approval. You'll
              be notified once it's approved.
            </p>
          </div>
          
        )} */}

        {/* Form */}

        <form
          onSubmit={onSubmit}
          className={`space-y-8 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Image Upload */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-lime-300/50">
            <div className="flex flex-col items-center gap-4">
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
                      alt="Class preview"
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
                      <p className="text-sm font-medium">Upload class image</p>
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
            {/* Class Name */}
            <TextField name="className" isRequired>
              <Label className="text-white font-medium">
                <span className="flex items-center gap-2">
                  <FiFileText className="text-lime-300" />
                  Class Name
                </span>
              </Label>
              <Input
                placeholder="Enter class name..."
                className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <FieldError className="text-red-400" />
            </TextField>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Category */}
              <div>
                <Label className="text-white font-medium mb-2 block">
                  <span className="flex items-center gap-2">
                    <FiTag className="text-lime-300" />
                    Category
                  </span>
                </Label>
                <select
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-lime-300/50"
                  required
                >
                  <option value="" className="bg-black">
                    Select category
                  </option>
                  <option value="yoga" className="bg-black">
                    Yoga
                  </option>
                  <option value="hiit" className="bg-black">
                    HIIT
                  </option>
                  <option value="pilates" className="bg-black">
                    Pilates
                  </option>
                  <option value="crossfit" className="bg-black">
                    CrossFit
                  </option>
                  <option value="dance" className="bg-black">
                    Dance
                  </option>
                  <option value="meditation" className="bg-black">
                    Meditation
                  </option>
                  <option value="strength" className="bg-black">
                    Strength Training
                  </option>
                  <option value="cardio" className="bg-black">
                    Cardio
                  </option>
                  <option value="flexibility" className="bg-black">
                    Flexibility
                  </option>
                  <option value="boxing" className="bg-black">
                    Boxing
                  </option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <Label className="text-white font-medium mb-2 block">
                  <span className="flex items-center gap-2">
                    <FiAward className="text-lime-300" />
                    Difficulty Level
                  </span>
                </Label>
                <select
                  name="difficulty"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-lime-300/50"
                  required
                >
                  <option value="" className="bg-black">
                    Select difficulty
                  </option>
                  <option value="beginner" className="bg-black">
                    Beginner
                  </option>
                  <option value="intermediate" className="bg-black">
                    Intermediate
                  </option>
                  <option value="advanced" className="bg-black">
                    Advanced
                  </option>
                  <option value="all-levels" className="bg-black">
                    All Levels
                  </option>
                </select>
              </div>
            </div>

            {/* Duration & Price */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <TextField name="duration" isRequired>
                <Label className="text-white font-medium">
                  <span className="flex items-center gap-2">
                    <FiClock className="text-lime-300" />
                    Duration (minutes)
                  </span>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 45"
                  className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <FieldError className="text-red-400" />
              </TextField>

              <TextField name="price" isRequired>
                <Label className="text-white font-medium">
                  <span className="flex items-center gap-2">
                    <FiDollarSign className="text-lime-300" />
                    Price ($)
                  </span>
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 29.99"
                  className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <FieldError className="text-red-400" />
              </TextField>
            </div>

            {/* Schedule */}
            <TextField name="schedule" isRequired>
              <Label className="text-white font-medium">
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-lime-300" />
                  Schedule
                </span>
              </Label>
              <Input
                placeholder="e.g., Mon, Wed, Fri at 6:00 PM"
                className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
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
                placeholder="Describe your class, what students will learn, and what to expect..."
                className="rounded-3xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
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
                Submitting...
              </span>
            ) : (
              "Submit Class for Approval"
            )}
          </Button>

          <p className="text-center text-xs text-white/30">
            Your class will be reviewed by admins before being published
          </p>
        </form>
      </div>
    </section>
  );
};

export default AddClass;
