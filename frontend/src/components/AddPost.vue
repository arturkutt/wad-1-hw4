<template>
  <section class="add-post-page">
    <h2>Add Post</h2>

    <form @submit.prevent="onSubmit" class="add-post-form">
      <label>
        Body
        <textarea v-model="body" rows="6" required></textarea>
      </label>

      <div class="actions">
        <button type="submit" class="btn">Add</button>
        <button type="button" class="btn outline" @click="$router.push('/home')">Cancel</button>
      </div>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </section>
</template>

<script>
import api from '../services/api';

export default {
  name: 'AddPost',
  data() {
    return { body: '', message: '' };
  },
  methods: {
    async onSubmit() {
      try {
        await api.posts.create({ body: this.body });
        this.$router.push('/home');
      } catch (err) {
        this.message = err.response?.data?.error || 'Failed to add post';
      }
    }
  }
};
</script>
