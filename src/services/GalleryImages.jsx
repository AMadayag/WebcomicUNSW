import { apiUrl } from "./VercelApi";

export const gallery_images = [];

const CACHE_KEY = 'gallery_images_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getAllImages() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { galleryData, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) return galleryData;
  }

  try {
    const response = await fetch(`${apiUrl}/gallery/images/all`);
    const galleryData = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ galleryData, timestamp: Date.now() }));
    return galleryData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getUsernameFromImage(img) {
  const { artist } = await getDiscordFromImage(img);
  return (await showDiscordUsername(artist)) ? artist : null;
}

// returns true if user has opted to show their username alongside images
async function showDiscordUsername(username) {
  const response = await fetch(`${apiUrl}/form/showUsername/${username}`);
  console.log(response)
  return response.json();
}

export async function getArtistLinkFromImage(img) {
  const { artist } = await getDiscordFromImage(img);
  return await getArtistLink(artist);
}

async function getDiscordFromImage(img) {
  const response = await fetch(`${apiUrl}/gallery/artists?image=${encodeURIComponent(img)}`);
  return response.json();
}

async function getArtistLink(username) {
  try {
    const response = await fetch(`${apiUrl}/form/link/${username}`);
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
