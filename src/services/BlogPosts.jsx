import { apiUrl } from "./VercelApi";

const CACHE_KEY = 'blog_summaries';
const BLOG_CACHE_KEY = 'blogs_individual';
const TAGS_CACHE_KEY = 'blogs_by_tag';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function postToBlog(author, title, tags, description, text) {
  try {
    const response = await fetch(`${apiUrl}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, title, tags, description, text })
    });
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getBlogSummaries() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { summariesData, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) return summariesData;
  }

  try {
    const response = await fetch(`${apiUrl}/blog/summary`);
    const summariesData = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ summariesData, timestamp: Date.now() }));
    return summariesData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getBlogFromId(id) {
  const cached = localStorage.getItem(BLOG_CACHE_KEY);
  if (cached) {
    const { blogs, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION && blogs[id]) {
      return blogs[id];
    }
  }

  try {
    const response = await fetch(`${apiUrl}/blog/${id}`);
    const blogData = await response.json();

    const existing = localStorage.getItem(BLOG_CACHE_KEY);
    const existingParsed = existing ? JSON.parse(existing) : null;
    const blogs = existingParsed ? existingParsed.blogs : {};
    const timestamp = existingParsed ? existingParsed.timestamp : Date.now();

    blogs[id] = blogData;
    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify({ blogs, timestamp }));
    return blogData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function addCommentToBlog(author, text, blogId) {
  try {
    await fetch(`${apiUrl}/blog/${blogId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text })
    });

    const cached = localStorage.getItem(BLOG_CACHE_KEY);
    if (cached) {
      const { blogs, timestamp } = JSON.parse(cached);
      delete blogs[blogId];
      localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify({ blogs, timestamp }));
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getBlogsByTag(tag) {
  const cached = localStorage.getItem(TAGS_CACHE_KEY);
  if (cached) {
    const { tagMap, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION && tagMap[tag]) {
      return tagMap[tag];
    }
  }

  try {
    const response = await fetch(`${apiUrl}/blog/tag/${tag}`);
    const data = await response.json();

    const existing = localStorage.getItem(TAGS_CACHE_KEY);
    const existingParsed = existing ? JSON.parse(existing) : null;
    const tagMap = existingParsed ? existingParsed.tagMap : {};
    const timestamp = existingParsed ? existingParsed.timestamp : Date.now();

    tagMap[tag] = data;
    localStorage.setItem(TAGS_CACHE_KEY, JSON.stringify({ tagMap, timestamp }));
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
