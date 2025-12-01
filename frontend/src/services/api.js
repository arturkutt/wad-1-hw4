import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

function setToken(token) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
}

export default {
  instance,
  setToken,   // <-- üks kord
  // convenience methods
  auth: {
    signup(payload) { return instance.post('/auth/signup', payload); },
    login(payload) { return instance.post('/auth/login', payload); }
  },
  posts: {
    all() { return instance.get('/posts'); },
    get(id) { return instance.get(`/posts/${id}`); },
    create(payload) { return instance.post('/posts', payload); },
    update(id, payload) { return instance.put(`/posts/${id}`, payload); },
    delete(id) { return instance.delete(`/posts/${id}`); },
    deleteAll() { return instance.delete('/posts'); }
  }
};
