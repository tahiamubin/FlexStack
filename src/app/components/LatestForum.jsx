import { getLatestPost } from "@/lib/api/community";
import CommunityCard from "./CommunityCard";

import { HiSparkles } from "react-icons/hi2";

const LatestForum = async () => {
  const posts = await getLatestPost();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black to-zinc-950 py-24">
      {/* Gradient accents */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-lime-300/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-lime-300/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="mb-5 flex items-center justify-center gap-2">
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              Latest from the community
            </span>
          </div>

          <h2 className="max-w-3xl mx-auto text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            What's new in the {" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              community
              <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-lime-300" />
            </span>
            .
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base font-medium text-white/60">
            Fresh voices, real stories, and the latest conversations from
            athletes like you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {posts.map((post) => (
            <CommunityCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestForum;
