import { getAllClass } from "@/lib/api/allClass";
import ClassCard from "../components/ClassCard";

import SearchProduct from "../components/SearchProduct";

const allClassPage = async ({searchParams}) => {
  const {search} = await searchParams
  //const params = await searchParams;
  const classes = await getAllClass(search);
  //console.log(classes)

  // Filter only approved classes
  const approvedClasses =
    classes?.filter((classItem) => classItem.status === "approved") || [];

  return (
    <div className="space-y-6 m-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase italic text-white">
            All Classes
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Showing {approvedClasses.length} approved{" "}
            {approvedClasses.length === 1 ? "class" : "classes"}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-medium uppercase tracking-wider text-lime-300 bg-lime-300/10 px-3 py-1 rounded-full border border-lime-300/20">
            {approvedClasses.length} Available
          </span>
          <div className="h-0.5 w-full bg-lime-300/30 mt-2 rounded-full" />
        </div>
      </div>
      
      <SearchProduct></SearchProduct>

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
