"use server";

import { getTokenServer } from "../core/getTokenServer";



const baseURL = process.env.BASE_URL;



export const updateUserRole = async (data,postId) => {
  const token = await getTokenServer()
   const res = await fetch(`${baseURL}/api/manage-user/${postId}` , {
    method: "PATCH" ,
    headers: {
      'content-type' : 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
   })
   return res.json()
}

export const editRole = async (postId , data) => {
  const res = await fetch(`${baseURL}/apply-trainer/${postId}`, {
    method: "PATCH",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getUser = async () => {
  const res = await fetch(`${baseURL}/api/alluser`);
  return res.json();
};
