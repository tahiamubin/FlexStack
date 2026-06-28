import { getCommunity} from "@/lib/api/community";
import CommunityCard from "../components/CommunityCard";
import PaginationForum from "../components/PaginationForum";


const CommunityForumPage = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { data: posts, totalPage } = await getCommunity(currentPage);

  return (
    <div className="space-y-6 m-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase italic text-white">
          Community Forum
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 p-10">
        {posts.map((post) => (
          <CommunityCard key={post._id} post={post} />
        ))}
      </div>

      <PaginationForum totalPage={totalPage} currentPage={currentPage} />
    </div>
  );
};

export default CommunityForumPage;