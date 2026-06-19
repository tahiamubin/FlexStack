import ClassApplicationsClient from '@/app/components/ClassApplicationsClient';
import { getAllClass } from '@/lib/api/allClass';
import React from 'react';


const page = async () => {
  const classApplications = await getAllClass();
  // Filter only pending applications
  const pendingApplications = classApplications?.filter(
    (app) => app.status === 'pending'
  ) || [];

  return (
    <div className="p-6">
      <ClassApplicationsClient applications={pendingApplications} />
    </div>
  );
};

export default page;