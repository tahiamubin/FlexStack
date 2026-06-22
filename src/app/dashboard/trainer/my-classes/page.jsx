import MyClasses from "@/app/components/dashboard components/MyClasses";
import MyForumPosts from "@/app/components/dashboard components/MyForumPosts";
import { getAllClass } from "@/lib/api/allClass";
import { getCommunity } from "@/lib/api/community";
import { getUserSession } from "@/lib/core/session";

import React from "react";

const page = async () => {
  const user = await getUserSession();
  const posts = await getAllClass();
  console.log('post',posts)
  console.log('user',user)
  const userPost =
    posts?.filter(
      (post) => post.userId?.toString() === (user._id || user.id)?.toString(),
    ) || [];
  

  return (
    <div>
      <MyClasses initialPosts={userPost} />
    </div>
  );
};

export default page;
