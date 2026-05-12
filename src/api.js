const API_ROOT = 'http://localhost:4000';

export async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'API error');
  }
  return response.json();
}

export function loginUser(username) {
  return fetchJson('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username })
  });
}

export function fetchArticles() {
  return fetchJson('/api/articles');
}

export function fetchArticle(id) {
  return fetchJson(`/api/articles/${id}`);
}

export function fetchPersonalizedFeed(userId) {
  return fetchJson(`/api/feed/personalized/${userId}`);
}

export function publishArticle(article) {
  return fetchJson('/api/articles', {
    method: 'POST',
    body: JSON.stringify(article)
  });
}

export function recordView(userId, articleId) {
  return fetchJson(`/api/users/${userId}/interactions`, {
    method: 'POST',
    body: JSON.stringify({ articleId, type: 'view' })
  });
}

export function fetchTags() {
  return fetchJson('/api/tags');
}
