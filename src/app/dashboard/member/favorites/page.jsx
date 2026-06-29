import FavoriteClassesClient from '@/app/components/dashboard components/FavoriteClassesClient';
import { getFavoriteClass } from '@/lib/api/member';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page = async () => {
  const user = await getUserSession()
  const favPosts = await getFavoriteClass()
  const userPost = favPosts?.filter((post) => post.MemberId === user.id) || [];
 //console.log('user post',userPost)
  //console.log('fav',favPosts)
 // console.log('user',user)
  
  return (
    <div>
       <FavoriteClassesClient favorites={userPost} />
    </div>
  );
};

export default page;