import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
    "/allclasses/:id",
    "/dashboard/member",
    "/dashboard/member/bookings",
    "/dashboard/member/favorites",
    "/dashboard/member/apply-trainer",
    "/dashboard/trainer",
    "/dashboard/trainer/add-class",
    "/dashboard/trainer/forum-post",
    "/dashboard/trainer/my-forum-post",
    "/dashboard/admin",
    "/dashboard/admin/users",
    "/dashboard/admin/add-forum",
    "/dashboard/admin/manage-classes",
    "/dashboard/admin/manage-forum",
    "/dashboard/admin/transactions",
  ],
};
