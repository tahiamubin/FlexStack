import FavoriteClassesClient from '@/app/components/dashboard components/FavoriteClassesClient';
import { getFavoriteClass } from '@/lib/api/member';
import React from 'react';

const page = async () => {
  const favPosts = await getFavoriteClass()
  //console.log(favPosts)
  return (
    <div>
       <FavoriteClassesClient favorites={favPosts} />
    </div>
  );
};

export default page;