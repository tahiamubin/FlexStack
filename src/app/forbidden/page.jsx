import { Button } from "@heroui/react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Shield icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Error code */}
        <p className="text-sm font-medium tracking-widest text-orange-500 uppercase mb-3">
          Error 403
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Access Forbidden
        </h1>

        {/* Description */}
        <p className="text-base text-gray-500 leading-relaxed mb-10">
          You're authenticated, but you don't have the right permissions to
          access this resource. Reach out to your admin to request access.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-gray-200 mx-auto mb-10" />

        {/* Reason badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-4 py-2.5 mb-10">
          <svg
            className="w-4 h-4 text-orange-400 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span className="text-sm text-orange-600 font-medium">
            Insufficient permissions for this resource
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            color="warning"
            radius="sm"
            size="md"
            className="w-full sm:w-auto px-6 font-medium text-white"
          >
            Request Access
          </Button>
          <Link href={"/"}>
            <Button
              variant="bordered"
              radius="sm"
              size="md"
              className="w-full sm:w-auto px-6 font-medium text-gray-600 border-gray-200 hover:bg-gray-50"
            >
              Go Home
            </Button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-gray-400">
          Need help?{" "}
          <a
            href="#"
            className="text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
          >
            Contact your administrator
          </a>
          .
        </p>
      </div>
    </div>
  );
}
