import ManageUser from '@/app/components/dashboard components/ManageUser';

import { getUser } from '@/lib/api/user';



const page = async () => {
  const users = await getUser();
  const filterUser = users.filter(user => user.role === 'member' || user.role === 'trainer')

  
  return (
    <div className="p-6">
      <ManageUser users={filterUser} />
    </div>
  );
};

export default page;