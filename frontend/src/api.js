import axios from 'axios';
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000'
});

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append('file', file);
  const r = await API.post('/api/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return r.data.url;
}

export async function createProfile(profile) {
  const r = await API.post('/api/profiles', profile);
  return r.data;
}

export async function updateProfile(id, profile) {
  const r = await API.put(`/api/profiles/${id}`, profile);
  return r.data;
}

export async function getProfiles(q = '') {
  const r = await API.get('/api/profiles', { params: q ? { q } : {} });
  return r.data;
}

export async function getProfile(id) {
  const r = await API.get(`/api/profiles/${id}`);
  return r.data;
}
