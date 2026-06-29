"use client";

import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { HiSparkles } from "react-icons/hi2";
import {
  FiAward,
  FiBriefcase,
  FiFileText,
  FiPhone,
  FiSend,
  FiUser,
} from "react-icons/fi";
import {
  Button,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { createApplyTrainer } from "@/lib/actions/member";

const ApplyTrainerClient = () => {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const specialties = [
    { value: "yoga", label: " Yoga" },
    { value: "weights", label: " Weights / Strength Training" },
    { value: "cardio", label: " Cardio / HIIT" },
    { value: "pilates", label: " Pilates" },
    { value: "crossfit", label: " CrossFit" },
    { value: "dance", label: " Dance / Zumba" },
    { value: "meditation", label: " Meditation / Mindfulness" },
    { value: "nutrition", label: "Nutrition / Diet" },
    { value: "recovery", label: " Recovery / Stretching" },
    { value: "sports", label: " Sports Specific Training" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const applicationData = {
        userId: user?.id || "Anonymous",
        userEmail: user?.email || "",
        userName: user?.name || "Anonymous",
        experience: data.experience,
        specialty: data.specialty,
        bio: data.bio,
        status: "pending",
        appliedAt: new Date().toISOString(),
      };

      await createApplyTrainer(applicationData);

      // await applyForTrainer(applicationData);

      toast.success("Application submitted successfully! Status: Pending");
      e.target.reset();
      setSelectedSpecialty("");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
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

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div
            className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              Become a Trainer
            </span>
          </div>

          <h1
            className={`text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out sm:text-5xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Apply to become a{" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              trainer
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* User Info Display */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-lime-300/50">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                <FiUser className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-white">
                  {user?.name || "Guest"}
                </p>
                <p className="text-sm text-white/40">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <TextField name="experience" isRequired>
            <Label className="text-white font-medium">
              <span className="flex items-center gap-2">
                <FiBriefcase className="text-lime-300" />
                Years of Experience
              </span>
            </Label>
            <Input
              type="number"
              placeholder="e.g., 5"
              className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              min="0"
              step="0.5"
            />
          </TextField>

          {/* Specialty */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white font-medium flex items-center gap-2">
              <FiAward className="text-lime-300" />
              Specialty
            </label>
            <select
              name="specialty"
              required
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="rounded-2xl bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-lime-300/50 transition-colors [&>option]:bg-black"
            >
              <option value="" disabled>
                Select your specialty
              </option>
              {specialties.map((specialty) => (
                <option key={specialty.value} value={specialty.value}>
                  {specialty.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <TextField name="bio" isRequired>
            <Label className="text-white font-medium">
              <span className="flex items-center gap-2">
                <FiFileText className="text-lime-300" />
                Bio / Qualifications
              </span>
            </Label>
            <TextArea
              placeholder="Tell us about your experience, certifications, and why you want to become a trainer..."
              className="rounded-3xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              rows={6}
            />
          </TextField>

          {/* Status Info */}
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
            <p className="text-sm text-yellow-400">
              ⏳ Your application will be reviewed by admins. Status:{" "}
              <span className="font-bold uppercase">Pending</span>
            </p>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </Button>

          <p className="text-center text-xs text-white/30">
            Your application will be reviewed within 24-48 hours
          </p>
        </form>
      </div>
    </section>
  );
};

export default ApplyTrainerClient;
