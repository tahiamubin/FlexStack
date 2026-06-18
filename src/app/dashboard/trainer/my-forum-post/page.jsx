import MyForumPosts from "@/app/components/dashboard components/MyForumPosts";
import { getCommunity } from "@/lib/api/community";
import { getUserSession } from "@/lib/core/session";

import React from "react";

const page = async () => {
  const user = await getUserSession();
  const posts = await getCommunity();
  //console.log(user.id);
const userPost = posts?.filter((post) => post.userId === user.id) || [];
  //console.log(posts)

  return (
    <div>
     
      <MyForumPosts initialPosts={userPost} />
    </div>
  );
};

export default page;
