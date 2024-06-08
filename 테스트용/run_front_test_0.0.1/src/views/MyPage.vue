<template>
  <div class="materialContainer">
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
    ...mapGetters(['getUser', 'getSkill']),
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

.materialContainer {
  width: 100%;
  max-width: 460px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box {
  position: relative;
  top: 0;
  opacity: 1;
  float: left;
  padding: 60px 50px 40px;
  width: 100%;
  max-width: 500px;
  background: #f2f2f2;
  border-radius: 10px;
  border: 1px solid #ccc;
  transform: scale(1);
  z-index: 5;
}

h1 {
  color: #003a9a;
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 20px;
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
