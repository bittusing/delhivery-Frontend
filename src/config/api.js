import axios from 'axios';

/**
 * Backend JSON routes live under /api (e.g. POST /api/auth/google).
 * public/.env:
 *   REACT_APP_API_URL — preferred full base including /api
 *   REACT_APP_API_BASE — default when REACT_APP_API_URL is unset (no hardcoded host in code)
 */
function normalizeApiBaseUrl(raw) {
  const fallback =
    (process.env.REACT_APP_API_BASE && String(process.env.REACT_APP_API_BASE).trim()) || '';

  if (!raw || typeof raw !== 'string') {
    return fallback || 'http://localhost:5000/api';
  }

  let base = raw.trim().replace(/\/+$/, '');
  if (!base) {
    return fallback || 'http://localhost:5000/api';
  }

  base = base.replace(/\/api\/api(\/|$)/g, '/api$1');
  base = base.replace(/\/api\/api$/g, '/api');

  if (/\/api(\/|$)/.test(base)) {
    return base;
  }
  return `${base}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(
  process.env.REACT_APP_API_URL || process.env.REACT_APP_API_BASE || ''
);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const path = error.response?.data?.path;
    const url = error.config?.url || '';
    const isAuthRoute =
      url.includes('/auth/login') ||
      url.includes('/auth/signup') ||
      url.includes('/auth/google') ||
      url.includes('/auth/forgot-password') ||
      url.includes('/auth/reset-password');

    if (status === 401 && !isAuthRoute) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (status === 404 && path && typeof path === 'string') {
      error.apiHint =
        `API 404 on ${path}. Check REACT_APP_API_URL in public/.env (must end with /api) and deploy the latest backend on that host so POST /api/auth/google exists.`;
    }

    return Promise.reject(error);
  }
);

export default api;
