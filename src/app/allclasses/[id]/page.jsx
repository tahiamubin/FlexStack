import ClassDetailsClient from '@/app/components/ClassDetailsClient';
import { getClassesById } from '@/lib/api/allClass';
import { getUser } from '@/lib/api/user';

import React from 'react';


const page = async ({ params }) => {
  const { id } = await params;
  const details = await getClassesById(id);
 

  return (
    <div className="p-6">
      <ClassDetailsClient classData={details} />
    </div>
  );
};

export default page;