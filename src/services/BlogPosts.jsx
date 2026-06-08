import { apiUrl } from "./VercelApi";

const SUMMARIES_CACHE_KEY = 'blog_summaries';
const SUMMARIES_LAST_CHECKED_KEY = 'blog_summaries_last_checked';
const BLOG_CACHE_KEY = 'blog_full';
const TAGS_CACHE_KEY = 'blog_tags';

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const CHECK_DURATION = 1000 * 60;      // 1 minute

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

export async function getBlogSummaries(onUpdate) {
  const cached = localStorage.getItem(SUMMARIES_CACHE_KEY);
  let cachedData = null;

  if (cached) {
    const { summariesData } = JSON.parse(cached);
    cachedData = summariesData;
  }

  const lastChecked = localStorage.getItem(SUMMARIES_LAST_CHECKED_KEY);
  const checkedRecently = lastChecked && Date.now() - parseInt(lastChecked) < CHECK_DURATION;

  if (cachedData && checkedRecently) return cachedData;

  const fetchPromise = fetch(`${apiUrl}/blog/summary`)
    .then(res => res.json())
    .then(summariesData => {
      localStorage.setItem(SUMMARIES_LAST_CHECKED_KEY, Date.now().toString());

      const isDifferent =
        summariesData.length !== cachedData?.length ||
        summariesData[0]?._id !== cachedData[0]?._id;

      if (isDifferent) {
        localStorage.setItem(SUMMARIES_CACHE_KEY, JSON.stringify({ summariesData }));
        onUpdate?.(summariesData);
      }
      return summariesData;
    })
    .catch(err => console.error('Fetch error:', err));

  if (cachedData) {
    // Fire-and-forget background refresh — don't await
    fetchPromise;
    return cachedData;
  }

  return fetchPromise;
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
    const blogs = existingParsed?.blogs ?? {};
    const timestamp = existingParsed?.timestamp ?? Date.now();

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
    const tagMap = existingParsed?.tagMap ?? {};
    const timestamp = existingParsed?.timestamp ?? Date.now();

    tagMap[tag] = data;
    localStorage.setItem(TAGS_CACHE_KEY, JSON.stringify({ tagMap, timestamp }));
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}


export async function addReplyToComment(author, text, blogId, commentId) {
  try {
    await fetch(`${apiUrl}/blog/${blogId}/comment/${commentId}`, {
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
