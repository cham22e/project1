<template>
  <div class="my-page">
    <div class="box">
      <h1>My Page</h1>
      <p>Email: {{ getUser }}</p>
      <p>UserName: {{ getUser.username }}</p>
      <p>Skill Level: {{ getSkill }}</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyPage',
  computed: {
    ...mapGetters(['getUser']),
  },
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
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>
