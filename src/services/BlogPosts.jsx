import { apiUrl } from "./VercelApi";

const CACHE_KEY = 'blog_summaries';
const BLOG_CACHE_KEY = 'blogs_individual';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function postToBlog(author, title, tags, description, text) {
  try {
    const response = await fetch(`${apiUrl}/blog`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author,
          title,
          tags,
          description,
          text
        })
      }
    );
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
    const blogs = existing ? JSON.parse(existing).blogs : {};
    blogs[id] = blogData;

    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify({ blogs, timestamp: Date.now() }));
    return blogData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
