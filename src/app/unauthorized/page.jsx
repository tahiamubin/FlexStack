import { Button } from "@heroui/react";
import Link from "next/link";
import { FiLock, FiArrowLeft, FiHome } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function UnauthorizedPage() {
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
          {/* Lock Icon */}
          <div className="flex justify-center mb-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
              <FiLock className="h-12 w-12 text-red-400" />
            </div>
          </div>

          {/* Error code */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">
              Error 401
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white text-center">
            Unauthorized{" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              Access
              <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-center text-base font-medium text-white/60 leading-relaxed">
            You don't have permission to view this page. Please sign in with an
            authorized account or contact your administrator.
          </p>

          {/* Divider */}
          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/30">
              Access Denied
            </span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signin" className="w-full sm:w-auto">
              <Button
                className="w-full bg-lime-300 text-black font-bold uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(132,204,22,0.3)] active:scale-95"
                radius="full"
                size="lg"
                startContent={<FiLock className="h-4 w-4" />}
              >
                Sign In
              </Button>
            </Link>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="bordered"
                className="w-full border-white/20 text-white/60 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
                radius="full"
                size="lg"
                startContent={<FiHome className="h-4 w-4" />}
              >
                Go Home
              </Button>
            </Link>
          </div>

          {/* Footer note */}
          <p className="mt-10 text-center text-xs text-white/30">
            If you believe this is a mistake,{" "}
            <a
              href="#"
              className="text-lime-300 hover:text-lime-200 transition-colors underline underline-offset-2"
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}