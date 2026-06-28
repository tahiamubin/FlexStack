import ModerationClient from '@/app/components/dashboard components/ModerationClient';
import { getCommunity } from '@/lib/api/community';



const page = async () => {
  const forumPosts = await getCommunity();
  
  return (
    <div className="p-6">
      <ModerationClient posts={forumPosts} />
    </div>
  );
};

export default page;