"use server";
const baseURL = process.env.BASE_URL;

export const getAppliedTrainer = async () => {
  const res = await fetch(`${baseURL}/api/apply-trainer`);
  return res.json();
};