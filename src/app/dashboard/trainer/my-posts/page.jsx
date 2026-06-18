import { getAllClass } from '@/lib/api/allClass';
import { getCommunity } from '@/lib/api/community';

import { getUserSession } from '@/lib/core/session';

import React from 'react';

const page = async() => {
    const user = await getUserSession()  
    const classData = await getAllClass()
    console.log(classData)
    const communityPost = await getCommunity()
    //console.log(communityPost)
    
    return (
        <div>
            hiii
        </div>
    );
};

export default page;