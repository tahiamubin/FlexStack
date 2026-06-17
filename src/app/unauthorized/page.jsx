import { Button } from "@heroui/react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Lock icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        {/* Error code */}
        <p className="text-sm font-medium tracking-widest text-red-500 uppercase mb-3">
          Error 401
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Unauthorized Access
        </h1>

        {/* Description */}
        <p className="text-base text-gray-500 leading-relaxed mb-10">
          You don't have permission to view this page. Please sign in with an
          authorized account or contact your administrator.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-gray-200 mx-auto mb-10" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={'/signin'}>
            <Button
              color="danger"
              radius="sm"
              size="md"
              className="w-full sm:w-auto px-6 font-medium"
            >
              Sign In
            </Button>
          </Link>

          <Link href={"/"}>
            <Button
              variant="bordered"
              radius="sm"
              size="md"
              className="w-full sm:w-auto px-6 font-medium text-gray-600 border-gray-200 hover:bg-gray-50"
            >
              Go Back
            </Button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-gray-400">
          If you believe this is a mistake,{" "}
          <a
            href="#"
            className="text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
          >
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
