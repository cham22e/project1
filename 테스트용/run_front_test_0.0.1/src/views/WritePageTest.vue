<template>
    <div class="write-page">
      <h2>커뮤니티 글 작성하기</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">제목</label>
          <input type="text" v-model="title" id="title" required />
        </div>
        <div class="form-group">
          <label for="content">내용</label>
          <textarea v-model="content" id="content" rows="5" required></textarea>
        </div>
        <button type="submit">게시하기</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        content: ''
      };
    },
    methods: {
      handleSubmit() {
        // 게시하기 버튼 클릭 시 이벤트 처리
        // 여기에 게시글을 서버에 전송하는 로직을 추가할 수 있습니다.
        console.log('게시하기 버튼이 클릭되었습니다.');
        console.log('제목:', this.title);
        console.log('내용:', this.content);
        // 전송 후, 예를 들어 커뮤니티 페이지로 이동할 수 있습니다.
        this.$router.push('/community');
      }
    }
  };
  </script>
  
  <style scoped>
  .write-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  textarea {
    resize: vertical;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  