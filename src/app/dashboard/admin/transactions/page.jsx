import { getPaymentInfo } from '@/lib/api/payment';
import React from 'react';
import PaymentHistoryClient from '../../PaymentHistoryClient';


const page = async () => {
  const payments = await getPaymentInfo();
  
  return (
    <div className="p-6">
      <PaymentHistoryClient payments={payments} />
    </div>
  );
};

export default page;