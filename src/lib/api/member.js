"use server";
const baseURL = process.env.BASE_URL;

export const getApplication = async () => {
  const res = await fetch(`${baseURL}/api/apply-trainer`);
  return res.json();
};
export const getFavoriteClass = async () => {
  const res = await fetch(`${baseURL}/api/favorite`);
  return res.json();
};
