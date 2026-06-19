'use server'
const baseURL = process.env.BASE_URL;

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