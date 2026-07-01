"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseUrl = process.env.BASE_URL;

export const createCommunityComment = async (postId, user, data) => {
  const res = await fetch(`${baseUrl}/api/community-forum/${postId}/comment`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId: user?.id,
      postId,
      name: user?.name,
      ...data,
    }),
  });
  return res.json()
};

export const createCommunity = async (data) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseUrl}/api/community-forum`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("community-forum API failed:", res.status, text);
    throw new Error(`API request failed with status ${res.status}`);
  }

  return res.json();
};
