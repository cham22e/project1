<template>
  <div>
    <h2 v-if="isEditMode">글 수정하기</h2>
    <h2 v-else>글 작성하기</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">제목</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="content">내용</label>
        <textarea v-model="content" id="content" required></textarea>
      </div>
      <button type="submit">{{ isEditMode ? "수정" : "작성" }}</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "",
      content: "",
      isEditMode: false,
      postId: null,
    };
  },
  computed: {
    ...mapGetters(["getUsername"]),
  },
  methods: {
    ...mapActions(["addPost"]),
    async handleSubmit() {
      const post = {
        id: Date.now(), // 임시 ID 사용
        title: this.title,
        content: this.content,
        author: this.getUsername,
      };
      await this.addPost(post);
      this.$router.push("/community");
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.isEditMode = true;
      this.postId = this.$route.params.id;
      const post = this.$store.getters.getPosts.find(
        (post) => post.id === Number(this.postId)
      );
      if (post) {
        this.title = post.title;
        this.content = post.content;
      }
    }
  },
};
</script>

<style scoped>
/* 스타일 추가 또는 수정 가능 */
</style>
