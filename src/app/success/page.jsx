import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { payment } from "@/lib/actions/payment";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import { FiCheckCircle, FiArrowRight, FiMail, FiShoppingBag } from "react-icons/fi";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await payment({ ...metadata, sessionId: session_id });

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
          <div className="w-full max-w-2xl">
            {/* Success Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center shadow-2xl backdrop-blur-sm">
              {/* Success Icon */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-lime-300/20">
                <FiCheckCircle className="h-12 w-12 text-lime-300" />
              </div>

              {/* Heading */}
              <div className="mb-5 flex items-center justify-center gap-2">
                <HiSparkles className="h-4 w-4 text-lime-300" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                  Payment Successful
                </span>
              </div>

              <h1 className="text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white sm:text-5xl">
                Thank You for{" "}
                <span className="relative inline-block text-lime-300">
                  Your Purchase
                  <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
                </span>
              </h1>

              {/* Confirmation Message */}
              <div className="mt-6 space-y-4">
                <p className="text-lg font-medium text-white/80">
                  We appreciate your business!
                </p>

                <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <FiMail className="h-5 w-5 text-lime-300" />
                  <p className="text-sm text-white/60">
                    A confirmation email will be sent to{" "}
                    <span className="font-medium text-white">
                      {customerEmail}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <FiShoppingBag className="h-5 w-5 text-lime-300" />
                  <p className="text-sm text-white/60">
                    Session ID:{" "}
                    <span className="font-mono text-xs text-white/40">
                      {session_id}
                    </span>
                  </p>
                </div>

                <p className="text-sm text-white/40">
                  If you have any questions, please email{" "}
                  <a
                    href="mailto:orders@example.com"
                    className="text-lime-300 hover:text-lime-200 transition-colors"
                  >
                    orders@example.com
                  </a>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard/member"
                  className="flex-1 rounded-2xl bg-lime-300 px-6 py-3.5 text-center font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(132,204,22,0.3)] active:scale-95"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/allclasses"
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-center font-medium text-white transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
                >
                  Browse More Classes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}