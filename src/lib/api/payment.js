"use server";
const baseURL = process.env.BASE_URL;

export const getPaymentInfo = async () => {
  const res = await fetch(`${baseURL}/api/payment`);
  return res.json();
};