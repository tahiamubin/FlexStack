"use server";
const baseUrl = process.env.BASE_URL;

export const createFavorite = async (data) => {
  const res = await fetch(`${baseUrl}/api/favorite`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("community-forum API failed:", res.status, text);
    throw new Error(`API request failed with status ${res.status}`);
  }
  return res.json();
};

export const createApplyTrainer = async (data) => {
  const res = await fetch(`${baseUrl}/api/apply-trainer`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("community-forum API failed:", res.status, text);
    throw new Error(`API request failed with status ${res.status}`);
  }

  return res.json();
};
