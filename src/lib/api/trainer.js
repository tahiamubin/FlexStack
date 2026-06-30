"use server";

import { getTokenServer } from "../core/getTokenServer";

const baseURL = process.env.BASE_URL;

export const getEnrolledStudent = async (trainerId) => {
  const res = await fetch(`${baseURL}/trainer/${trainerId}/total-enrollment`)
  
  return res.json()
}

export const getAppliedTrainer = async () => {
  const token = await getTokenServer()
  const res = await fetch(`${baseURL}/api/apply-trainer` ,
    {
    headers: {
      authorization: token
    }
  }
  );
  return res.json();
};