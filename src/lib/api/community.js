"use server";
const baseURL = process.env.BASE_URL;

export const getLatestPost = async () => {
  const res = await fetch(`${baseURL}/api/community-latest`);
  return res.json();
};
export const deleteForum = async (postId) => {
  //console.log("post", postId);
  const res = await fetch(`${baseURL}/api/community-forum/${postId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  return res.json();
};

export const getCommunityComment = async (postId) => {
  const res = await fetch(`${baseURL}/api/community-forum/${postId}/comment`);
  return res.json();
};

export const getCommunityForumById = async (id) => {
  const res = await fetch(`${baseURL}/api/community-forum/${id}`);
  return res.json();
};
export const getCommunity = async () => {
  const res = await fetch(`${baseURL}/api/community-forum`);

  return res.json();
};
