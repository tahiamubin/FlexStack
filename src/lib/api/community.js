"use server";

import { json } from "better-auth";
import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const updateLike = async (postId) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/community-forum/${postId}/like`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

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

export const updateComment = async (commentId, data) => {
  
  const res = await fetch( `${baseURL}/api/community-forum/${commentId}/comment` , {
    method: "PATCH",
    headers: {
     'content-type' : 'application/json'
    },
    body: JSON.stringify(data)
  })
  res.json()
}

export const deleteComment = async (commentId) => {

  const res = await fetch(
    `${baseURL}/api/community-forum/${commentId}/comment`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
       
      },
    },
  );
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      errBody.message || `Delete failed with status ${res.status}`,
    );
  }
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
  const res = await fetch(
    `${baseURL}/api/community-forum?page=${page}&limit=9`,
    {
      cache: "no-store",
    },
  );
  return res.json();
};
