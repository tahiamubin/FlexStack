import ApplyTrainerClient from '@/app/components/ApplyTrainerClient';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page =async () => {
    
    return (
        <div className='p-6'>
            <ApplyTrainerClient></ApplyTrainerClient>
        </div>
    );
};

export default page;