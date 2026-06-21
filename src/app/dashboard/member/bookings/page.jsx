import BookingsClient from '@/app/components/dashboard components/BookingsClient';
import { getBookingsById } from '@/lib/api/allClass';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const page = async () => {
  const user = await getUserSession();
  const userId = user?.id;
  const bookings = await getBookingsById(userId);
  //console.log(bookings)

  return (
    <div className="p-6">
      <BookingsClient bookings={bookings} />
    </div>
  );
};

export default page;