import AdminHomeClient from '@/app/components/dashboard components/AdminHomeClient ';
import { getAllClass, getBookings } from '@/lib/api/allClass';
import { getUser } from '@/lib/api/user';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const AdminHomePage = async () => {
  const classes = await getAllClass();
  const users = await getUser();
  const bookings = await getBookings();
  const admin = await getUserSession();

  return (
    <div className="p-6">
      <AdminHomeClient 
        classes={classes}
        users={users}
        bookings={bookings}
        admin={admin}
      />
    </div>
  );
};

export default AdminHomePage;