import OverviewClient from "@/app/components/dashboard components/OverviewClient";
import { getBookingsById } from "@/lib/api/allClass";
import { getApplication, getFavoriteClass } from "@/lib/api/member";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const user = await getUserSession();
  const userId = user?.id;
  console.log(userId)

  const bookings = await getBookingsById(userId);
  console.log('bookings',bookings)
  const favorites = await getFavoriteClass();
  const userPost = favorites?.filter((post) => post.MemberId === user.id) || [];
  const trainerApplication = await getApplication();
  const applications =
    trainerApplication?.filter((post) => post.userId === user.id) || [];

  return (
    <div className="p-6">
      <OverviewClient
        user={user}
        bookings={bookings}
        favorites={userPost}
        trainerApplication={applications}
      />
    </div>
  );
};

export default page;
