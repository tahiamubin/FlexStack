'use server'
const baseURL = process.env.BASE_URL;

export const getLatestClasses = async () => {
  const res = await fetch(`${baseURL}/api/classes-latest`);
  return res.json();
};

export const getBookingsById = async (id) => {
  const res = await fetch(`${baseURL}/api/payment/${id}`);
  return res.json();
};
export const getBookings = async () => {
  const res = await fetch(`${baseURL}/api/payment`);
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

export const getAllClass = async() => {
    const res = await fetch (`${baseURL}/api/all-class`)
    return res.json()
}