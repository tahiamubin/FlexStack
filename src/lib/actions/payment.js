"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const payment = async (data) => {
  //   console.log("BASE_URL:", baseURL);
  // console.log("Sending data:", data);

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
