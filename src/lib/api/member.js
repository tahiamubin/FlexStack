"use server";
const baseURL = process.env.BASE_URL;
export const getFavoriteClass = async () => {
  const res = await fetch(`${baseURL}/api/favorite`);
  return res.json();
};
