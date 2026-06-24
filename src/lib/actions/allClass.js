"use server";

import { getToken } from "../api/token";
const baseUrl = process.env.BASE_URL

export const createClass = async (data) => {
    const token = await getToken()
   
    const res = await fetch(`${baseUrl}/api/all-class` , {
        method: 'POST', 
        headers: {
            'content-type' : 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return res.json()
};
