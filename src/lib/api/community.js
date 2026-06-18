"use server";
const baseURL = process.env.BASE_URL;
export const getCommunity = async () => {
  const res = await fetch(`${baseURL}/api/community-forum`);
  
  return res.json();
};
