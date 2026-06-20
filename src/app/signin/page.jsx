"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { HiSparkles } from "react-icons/hi2";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function SignInPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    if (data) {
      redirect('/');
    }
    if (error) {
      toast.error("Sign in not successful");
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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10 text-center">
            <div
              className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <HiSparkles className="h-4 w-4 text-lime-300" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                Welcome Back
              </span>
            </div>

            <h1
              className={`text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Sign In
            </h1>

            <p
              className={`mt-4 text-base font-medium text-white/60 transition-all duration-700 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Continue your fitness journey
            </p>
          </div>

          {/* Form */}
          <div
            className={`rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Email */}
              <TextField isRequired name="email" type="email">
                <Label className="text-white font-medium">
                  <span className="flex items-center gap-2">
                    <FiMail className="text-lime-300" />
                    Email
                  </span>
                </Label>
                <Input
                  placeholder="john@example.com"
                  className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <FieldError className="text-red-400" />
              </TextField>

              {/* Password */}
              <TextField isRequired name="password" type="password">
                <Label className="text-white font-medium">
                  <span className="flex items-center gap-2">
                    <FiLock className="text-lime-300" />
                    Password
                  </span>
                </Label>
                <Input
                  placeholder="Enter your password"
                  className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <FieldError className="text-red-400" />
              </TextField>

              {/* Sign In Button */}
              <Button
                type="submit"
                size="lg"
                radius="full"
                className="relative w-full h-14 bg-lime-300 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_40px_rgba(132,204,22,0.3)]"
                endContent={
                  <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                }
              >
                Sign In
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-white/10 mt-2 text-sm text-white/40">
                New to FitHub?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-lime-300 hover:text-lime-200 transition-colors"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}