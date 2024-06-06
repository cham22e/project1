<!-- components/MyPage.vue -->
<template>
  <div class="my-page" v-if="user">
    <h1>My Page</h1>
    <p>Username: {{ getUsername }}</p>
    <p>Email: {{ getEmail }}</p>
    <p>Skill Level: {{ getSkill }}</p>
  </div>
  <div class="my-page" v-else>
    Loading...
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyPage',
  computed: {
    ...mapGetters({
      user: 'getUser',
      skill: 'getSkill'
    }),
    getUsername() {
      return this.user ? this.user.username : '';
    },
    getEmail() {
      return this.user ? this.user.email : '';
    },
    getSkill() {
      return this.skill ? this.skill : ''; // 스킬 값 표시
    }
  }
};
</script>

<style scoped>
.my-page {
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #003a9a;
}

p {
  font-size: 18px;
  color: #333;
}
</style>
