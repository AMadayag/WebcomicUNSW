import { apiUrl } from "./mongodb";

export const gallery_images = [];

const CACHE_KEY = 'gallery_images_c';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getAllImages() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) return data;
  }

  try {
    const response = await fetch(`${apiUrl}/gallery/images/all`);
    const data = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
