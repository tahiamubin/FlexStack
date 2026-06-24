"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const getPaymentInfo = async () => {
  const token = await getTokenServer();

  const res = await fetch(`${baseURL}/api/payment`, {
    headers: {
       authorization: `Bearer ${token}`
    },
  });
  return res.json();
};
