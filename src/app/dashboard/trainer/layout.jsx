import { requireRole } from "@/lib/core/session";


const layout = async ({ children }) => {
  await requireRole("trainer");
  return children;
};

export default layout;
