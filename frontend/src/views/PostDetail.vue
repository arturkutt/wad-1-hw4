<template>
  <section class="post-detail-page">
    <h2>Post</h2>

    <div v-if="loading">Loading...</div>

    <div v-else-if="post">
      <textarea v-model="editableBody" rows="8"></textarea>

      <div class="actions">
        <button class="btn" @click="updatePost">Update</button>
        <button class="btn danger" @click="deletePost">Delete</button>
        <button class="btn outline" @click="$router.push('/home')">Back</button>
      </div>
    </div>

    <div v-else>
      <p>Post not found.</p>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </section>
</template>

<script>
import api from '../services/api';

export default {
  name: 'PostDetail',
  props: ['id'],
  data() {
    return { post: null, editableBody: '', loading: false, message: '' };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      try {
        const res = await api.posts.get(this.$route.params.id);
        this.post = res.data;
        this.editableBody = this.post.body;
      } catch (err) {
        this.message = err.response?.data?.error || 'Failed to fetch post';
      } finally {
        this.loading = false;
      }
    },
    async updatePost() {
      try {
        await api.posts.update(this.$route.params.id, { body: this.editableBody });
        this.message = 'Updated';
        // refresh list or redirect
        setTimeout(() => this.$router.push('/home'), 600);
      } catch (err) {
        this.message = err.response?.data?.error || 'Failed to update';
      }
    },
    async deletePost() {
      if (!confirm('Delete this post?')) return;
      try {
        await api.posts.delete(this.$route.params.id);
        this.$router.push('/home');
      } catch (err) {
        this.message = err.response?.data?.error || 'Failed to delete';
      }
    }
  }
};
</script>
