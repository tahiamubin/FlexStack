"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const getLatestPost = async () => {
  const res = await fetch(`${baseURL}/api/community-latest`);
  return res.json();
};

export const deleteForum = async (postId) => {
  const token = await getTokenServer();
  //console.log("post", postId);
  const res = await fetch(`${baseURL}/api/community-forum/${postId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getCommunityComment = async (postId) => {
  const res = await fetch(`${baseURL}/api/community-forum/${postId}/comment`);
  return res.json();
};

export const getCommunityForumById = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/community-forum/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};




// admin --> manage community froum
export const getCommunity = async (page = 1) => {
  const res = await fetch(`${baseURL}/api/community-forum?page=${page}&limit=9`, {
    cache: "no-store"
  });
  return res.json(); 
};
