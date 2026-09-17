import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://projected-puerto-six-explanation.trycloudflare.com';
const API_BASE_URL = rawBaseUrl.endsWith('/api/v1') ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, '')}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercept request to add Sanctum Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('biznetwork_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: clear auth if token expired
    }
    return Promise.reject(error);
  }
);
