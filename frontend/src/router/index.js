import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Home from '../components/Home.vue';
import AddPost from '../components/AddPost.vue';
import PostDetail from '../components/PostDetail.vue';
import Contact from '../components/Contact.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, meta: { public: true } },
  { path: '/signup', component: Signup, meta: { public: true } },
  { path: '/contact', component: Contact, meta: { public: true } },

  // Protected routes
  { path: '/home', component: Home },
  { path: '/add-post', component: AddPost },
  { path: '/post/:id', component: PostDetail, props: true },

  // fallback
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global guard: if route is not public, require token
router.beforeEach((to, from, next) => {
  if (to.meta.public) {
    return next();
  }
  const token = localStorage.getItem('token');
  if (!token) {
    return next('/login');
  }
  next();
});

export default router;
