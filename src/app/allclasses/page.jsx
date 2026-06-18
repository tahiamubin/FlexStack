import React from 'react';
import { getAllClass } from '@/lib/api/allClass';
import ClassCard from '../components/ClassCard';



const allClassPage = async () => {
  const classes = await getAllClass();
  
  // Filter only approved classes
  const approvedClasses = classes?.filter(classItem => classItem.status === 'approved') || [];

  return (
    <div className="space-y-6 m-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase italic text-white">
          All Classes
        </h1>
        <span className="text-sm text-white/40">
          Showing {approvedClasses.length} approved classes
        </span>
      </div>

      {/* Classes Grid */}
      {approvedClasses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {approvedClasses.map((classItem) => (
            <ClassCard key={classItem._id} classData={classItem} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <p className="text-white/40">No approved classes available</p>
        </div>
      )}
    </div>
  );
};

export default allClassPage;