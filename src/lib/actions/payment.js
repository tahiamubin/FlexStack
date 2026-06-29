"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const payment = async (data) => {

  const res = await fetch(`${baseURL}/api/payment`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  return resData;
};
