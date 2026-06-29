"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiMail,
  FiShield,
  FiShieldOff,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";
import { updateUserRole } from "@/lib/api/user";


const ManageUser = ({ users }) => {
  const router = useRouter();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      trainer: "bg-lime-300/20 text-lime-300 border-lime-300/30",
      member: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
    return colors[role] || "bg-white/5 text-white/40 border-white/10";
  };

  const getStatusBadge = (isBlocked) =>
    isBlocked
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : "bg-green-500/20 text-green-400 border-green-500/30";

  const handleAction = async (user, action) => {
    try {
      if (action === "block") {
        await updateUserRole(
          { role: "member", isBlocked: true, roleBeforeBlock: user?.role },
          user._id
        );
        toast.success(`${user.name} has been blocked.`);
      } else if (action === "unblock") {
        await updateUserRole(
          { role: user.roleBeforeBlock || "member", isBlocked: false, roleBeforeBlock: null },
          user._id
        );
        toast.success(`${user.name} has been unblocked.`);
      } else if (action === "makeAdmin") {
        await updateUserRole(
          { role: "admin"} ,
          user._id
        );
        toast.success(`${user.name} is now an Admin.`);
      }
      router.refresh(); // re-fetches the server component, gets fresh `users`
    } catch (error) {
      console.error(error);
      toast.error("Action failed.");
    }
  };

  if (users.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <FiUser className="h-12 w-12 text-white/20 mb-3" />
        <p className="text-white/40">No users found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold uppercase italic text-white">
              Manage Users
            </h1>
            <p className="text-sm text-white/40 mt-1">Manage all platform users</p>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-lime-300 bg-lime-300/10 px-3 py-1 rounded-full border border-lime-300/20">
            {users.length} Users
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">User</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">Email</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">Role</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">Joined</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-lime-300/10 flex items-center justify-center text-lime-300">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="h-full w-full rounded-full object-cover" />
                        ) : (
                          <FiUser className="h-4 w-4" />
                        )}
                      </div>
                      <p className="font-medium text-white">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm text-white/60">
                      <FiMail className="h-3 w-3" />
                      {user.email}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium uppercase px-2 py-0.5 rounded-full border ${getRoleBadge(user.role)}`}>
                      {user.role || "member"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium uppercase px-2 py-0.5 rounded-full border ${getStatusBadge(user.isBlocked)}`}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm text-white/40">
                      <FiCalendar className="h-3 w-3" />
                      {formatDate(user.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {user.role !== "admin" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white/40 hover:text-purple-400 hover:bg-purple-400/10 transition-all duration-300 text-xs"
                          onClick={() => handleAction(user, "makeAdmin")}
                          startContent={<FiUserPlus className="h-3 w-3" />}
                        >
                          Make Admin
                        </Button>
                      )}
                      {user.role !== "admin" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`transition-all duration-300 text-xs ${
                            user.isBlocked
                              ? "text-white/40 hover:text-green-400 hover:bg-green-400/10"
                              : "text-white/40 hover:text-red-400 hover:bg-red-400/10"
                          }`}
                          onClick={() => handleAction(user, user.isBlocked ? "unblock" : "block")}
                          startContent={user.isBlocked ? <FiShield className="h-3 w-3" /> : <FiShieldOff className="h-3 w-3" />}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      )}
                      {user.role === "admin" && (
                        <span className="text-xs text-purple-400/60">Admin</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;