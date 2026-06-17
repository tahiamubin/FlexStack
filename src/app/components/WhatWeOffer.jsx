"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { 
  FiCheckCircle, 
  FiClock, 
  FiTrendingUp,
  FiSmile,
  FiTarget,
  FiZap,
  FiArrowRight
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

/**
 * WhatWeOffer — Key benefits and value proposition
 * 
 * Stack: Next.js, Tailwind CSS, HeroUI, react-icons
 * Theme: Matches HeroBanner (black/lime accent)
 */
export default function WhatWeOffer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const benefits = [
    {
      icon: FiTrendingUp,
      title: "Track Your Progress",
      description: "Monitor your fitness journey with detailed analytics, personal records, and milestone celebrations.",
    },
    {
      icon: FiClock,
      title: "Flexible Scheduling",
      description: "Workout anytime, anywhere with 24/7 access to live classes and on-demand recordings.",
    },
    {
      icon: FiTarget,
      title: "Goal-Oriented Plans",
      description: "Customized training programs designed to help you achieve specific fitness goals, from weight loss to muscle gain.",
    },
    {
      icon: FiSmile,
      title: "Supportive Community",
      description: "Join thousands of like-minded individuals who motivate, encourage, and celebrate each other's success.",
    },
    {
      icon: FiZap,
      title: "Real-Time Feedback",
      description: "Get instant performance feedback and form correction tips from AI-powered movement analysis.",
    },
    {
      icon: FiCheckCircle,
      title: "Guaranteed Results",
      description: "Backed by science and proven methodologies, with 98% of members achieving their fitness goals.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black to-zinc-950 py-24">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-lime-300/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-lime-300/5 blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div
            className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              What We Offer
            </span>
          </div>

          <h2
            className={`max-w-3xl mx-auto text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out sm:text-5xl lg:text-6xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            More than just{" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              a fitness app
              <span
                className={`absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime-300 transition-transform duration-500 ease-out ${
                  mounted ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              />
            </span>
            .
          </h2>

          <p
            className={`mt-4 max-w-2xl mx-auto text-base font-medium text-white/60 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Discover the features that make us the ultimate fitness companion.
          </p>
        </div>

        {/* Benefits Grid - Alternating Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const delay = 150 + index * 100;

            return (
              <div
                key={index}
                className={`group flex gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-lime-300/50 hover:bg-white/10 hover:scale-[1.02] ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="inline-flex rounded-xl bg-lime-300/10 p-3 text-lime-300 transition-colors duration-300 group-hover:bg-lime-300/20">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-1 text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-white/60">
                    {benefit.description}
                  </p>

                  {/* Decorative indicator */}
                  <div className="mt-3 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="h-[2px] w-8 bg-lime-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-lime-300">
                      Learn More
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats / Trust Indicators */}
        <div
          className={`mt-16 grid gap-8 border-t border-white/10 pt-16 sm:grid-cols-4 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          {[
            { number: "10K+", label: "Active Members" },
            { number: "500+", label: "Expert Trainers" },
            { number: "1M+", label: "Workouts Completed" },
            { number: "98%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold uppercase tracking-tight text-lime-300 sm:text-3xl">
                {stat.number}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/40 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}