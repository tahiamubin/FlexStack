"use server";
// const baseUrl = process.env.BASE_URL;
// console.log(baseUrl)
export const createClass = async (data) => {
    const res = await fetch("http://localhost:5000/api/all-class" , {
        method: 'POST', 
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json()
};
