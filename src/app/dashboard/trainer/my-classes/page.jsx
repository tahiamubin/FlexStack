import MyClasses from "@/app/components/dashboard components/MyClasses";
import MyForumPosts from "@/app/components/dashboard components/MyForumPosts";
import { getAllClass } from "@/lib/api/allClass";
import { getCommunity } from "@/lib/api/community";
import { getUserSession } from "@/lib/core/session";

import React from "react";

const page = async () => {
  const user = await getUserSession();
  const posts = await getAllClass();
  //console.log(user.id);
  const userPost = posts?.filter((post) => post.userId === user.id) || [];
  //console.log(posts)

  return (
    <div>
      <MyClasses initialPosts={userPost} />
    </div>
  );
};

export default page;
