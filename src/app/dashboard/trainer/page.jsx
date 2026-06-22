import TrainerOverviewClient from "@/app/components/TrainerOverviewClient";
import { getBookings } from "@/lib/api/allClass";
import { getUserSession } from "@/lib/core/session";
import React from 'react';


const page = async () => {
  const user = await getUserSession();
  const bookings = await getBookings();
  
  // Get user's classes (filter bookings by trainer userId)
  const userClasses = bookings?.filter(booking => booking.userId === user?.id) || [];
  
  // Get all students enrolled in trainer's classes
  const allStudents = bookings?.filter(booking => 
    userClasses.some(cls => cls.className === booking.className)
  ) || [];

  return (
    <div className="p-6">
      <TrainerOverviewClient 
        user={user}
        userClasses={userClasses}
        allStudents={allStudents}
      />
    </div>
  );
};

export default page;