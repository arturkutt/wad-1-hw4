<template>
  <section class="home-page">
    <h2>Home</h2>

    <div class="home-actions">
      <button @click="goAdd" class="btn">Add Post</button>
      <button @click="deleteAll" class="btn danger">Delete All</button>
    </div>

    <div v-if="loading">Loading posts...</div>
    <div v-else>
      <ul class="post-list">
        <li v-for="p in posts" :key="p.id" class="post-item">
          <a @click.prevent="openPost(p.id)" href="#">
            <div class="post-body">{{ p.body }}</div>
            <div class="post-meta">{{ formatDate(p.created_at) }} • {{ p.author || 'unknown' }}</div>
          </a>
        </li>
      </ul>

      <div v-if="posts.length === 0" class="empty">No posts yet.</div>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </section>
</template>

<script>
import api from '../services/api';

export default {
  name: 'HomePage',
  data() {
    return { posts: [], loading: false, message: '' };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const res = await api.posts.all();
        this.posts = res.data;
      } catch (err) {
        this.message = err.response?.data?.error || 'Failed to load posts';
      } finally {
        this.loading = false;
      }
    },
    formatDate(d) {
      if (!d) return '';
      return new Date(d).toLocaleString();
    },
    openPost(id) {
      this.$router.push(`/post/${id}`);
    },
    goAdd() {
      this.$router.push('/add-post');
    },
    async deleteAll() {
      if (!confirm('Delete all posts?')) return;
      try {
        await api.posts.deleteAll();
        this.posts = [];
      } catch (err) {
        this.message = err.response?.data?.error || 'Failed to delete all';
      }
    }
  }
};
</script>
