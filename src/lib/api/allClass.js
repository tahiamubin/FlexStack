'use server'
const baseURL = process.env.BASE_URL;


export const getBookingsById = async (id) => {
  const res = await fetch(`${baseURL}/api/payment/${id}`);
  return res.json();
};


export const getClassesById = async (id) => {
  const res = await fetch(`${baseURL}/api/all-classes/${id}`);
  return res.json();
};

export const editClass = async (data,postId) => {
   const res = await fetch(`${baseURL}/api/all-class/${postId}` , {
    method: "PATCH" ,
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(data)
   })
   return res.json()
}

export const deleteClass = async(postId) => {
    console.log('post',postId)
    const res = await fetch (`${baseURL}/api/all-class/${postId}` , {
        method: "DELETE" ,
        headers: {
            'content-type' : 'application/json'
        },    
    })
   return res.json()
}

export const getAllClass = async(page) => {
    const res = await fetch (`${baseURL}/api/all-class?page=${page}`)
    return res.json()
}