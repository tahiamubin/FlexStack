

import React from "react";

import { getCommunity } from "@/lib/api/community";
import CommunityCard from "../components/CommunityCard";

const communityForumPage = async () => {
  const posts = await getCommunity();
  const postsArray = Array.isArray(posts) ? posts : [posts];

  return (
    <div className="space-y-6 m-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase italic text-white">
            Community Forum
          </h1>
          
        </div>
        
      </div>

      <div className="grid gap-4 md:grid-cols-2 p-10">
        {postsArray.map((post) => (
          <CommunityCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default communityForumPage;
