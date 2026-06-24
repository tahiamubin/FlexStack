"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const getLatestClasses = async () => {
  const res = await fetch(`${baseURL}/api/classes-latest`);
  return res.json();
};

export const getBookingsById = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/payment/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getBookings = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/payment`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getClassesById = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/all-classes/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const editClass = async (data, postId) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/all-class/${postId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteClass = async (postId) => {
  const token = await getTokenServer();
  console.log("post", postId);
  const res = await fetch(`${baseURL}/api/all-class/${postId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getAllClass = async (search) => {
  const res = await fetch(`${baseURL}/api/all-class?search=${search}`);
  return res.json();
};
