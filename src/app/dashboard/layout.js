// import React from "react";
// import Dashboard from "../components/dashboard components/Dashboard";

// export const DashboardLayout = ({children}) => {
//   return (
//     <div className="flex min-h-screen">
//       <Dashboard></Dashboard>
//       <div className={"flex"}>{children}</div>
//     </div>
//   );
// };

// export default DashboardLayout;
import Dashboard from "../components/dashboard components/Dashboard";

export default function DashboardLayout({ children }) {
  return <Dashboard>{children}</Dashboard>;
}
