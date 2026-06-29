"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const deleteSave = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/favorite/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getApplication = async () => {
  const res = await fetch(`${baseURL}/api/apply-trainer`);
  return res.json();
};
export const getFavoriteClass = async () => {
  const res = await fetch(`${baseURL}/api/favorite`);
  return res.json();
};
