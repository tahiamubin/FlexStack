import OverviewClient from '@/app/components/dashboard components/OverviewClient';
import { getBookingsById } from '@/lib/api/allClass';
import { getApplication, getFavoriteClass } from '@/lib/api/member';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const page = async () => {
  const user = await getUserSession();
  const userId = user?.id;
  
  const bookings = await getBookingsById(userId);
  const favorites = await getFavoriteClass();
  const trainerApplication = await getApplication()
  
  // Get trainer application data from user or separate API
  //const trainerApplication = user?.trainerApplication || null;

  return (
    <div className="p-6">
      <OverviewClient
        user={user}
        bookings={bookings}
        favorites={favorites}
        trainerApplication={trainerApplication}
      />
    </div>
  );
};

export default page;