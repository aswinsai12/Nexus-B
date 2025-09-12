


async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const headers = { ...defaultHeaders, ...(options.headers || {}) };
  const res = await fetch(url, { ...options, headers, credentials: options.credentials ?? 'same-origin' });
  const text = await res.text();
  const data = (() => { try { return JSON.parse(text); } catch { return text; } })();
  if (!res.ok) throw new Error(typeof data === 'string' ? data : (data?.message || 'Request failed'));
  return data;
}
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
if (!API_BASE || !/^https?:\/\//i.test(API_BASE)) {
  // Fail fast in production bundles if the base URL wasn't injected
  throw new Error('VITE_API_BASE_URL is not set to a valid absolute URL');
}

export const api = {
  get: (path, options) => request(path, { method: 'GET', ...options }),
  post: (path, body, options) => request(path, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (path, body, options) => request(path, { method: 'PUT', body: JSON.stringify(body), ...options }),
  del: (path, options) => request(path, { method: 'DELETE', ...options }),
};
