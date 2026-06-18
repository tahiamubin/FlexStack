"use server";
const baseURL = process.env.BASE_URL;
export const getCommunityForumById = async (id) => {
  const res = await fetch(`${baseURL}/api/community-forum/${id}`)
  return res.json()
}
export const getCommunity = async () => {
  const res = await fetch(`${baseURL}/api/community-forum`);
  
  return res.json();
};
