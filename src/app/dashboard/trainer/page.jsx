import TrainerOverviewClient from "@/app/components/TrainerOverviewClient";
import { getAllClass } from "@/lib/api/allClass";
import { getEnrolledStudent } from "@/lib/api/trainer";
import { getUserSession } from "@/lib/core/session";
import React from 'react';


const page = async () => {
  const user = await getUserSession();
  const classes = await getAllClass();
  //console.log(user?.id)
 
  // Get user's classes (filter bookings by trainer userId)
  const userClasses = classes?.filter(c => c.userId === user?.id) || [];
  
  // Get all students enrolled in trainer's classes
  
   const enrolled = await getEnrolledStudent(user?.id)
   //console.log(enrolled.totalEnrolled)

  return (
    <div className="p-6">
      <TrainerOverviewClient 
        user={user}
        userClasses={userClasses}
       
        enrolled={enrolled.totalEnrolled}
      />
    </div>
  );
};

export default page;