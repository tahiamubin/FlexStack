"use server";

import { getToken } from "../api/token";

export const createClass = async (data) => {
    const token = await getToken()
   
    const res = await fetch("http://localhost:5000/api/all-class" , {
        method: 'POST', 
        headers: {
            'content-type' : 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return res.json()
};
