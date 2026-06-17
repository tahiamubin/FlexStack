import { Dashboard } from "../components/dashboard components/Dashboard";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
        <Dashboard></Dashboard>
        <main>{children}</main>
    </div>
  );
}