<template>
  <div class="community">
    <div class="community-header">
      <h2>커뮤니티 게시판</h2>
      <div class="header-actions">
        <!-- 검색 입력 부분 교체 -->
        <MaterialInput
          class="search-input"
          icon="search"
          type="text"
          v-model="searchQuery"
          placeholder="검색어 입력"
          size="sm"  
        />
        
        <!-- 수정된 부분: 검색 버튼에 컴포넌트 적용 -->
        <Button class="btn-search" @click="searchPosts">
          검색
        </Button>
        <!-- 수정된 부분: 글 쓰기 버튼에 컴포넌트 적용 -->
        <Button class="btn-write"  @click="goToWritePage">  
          게시글 작성
        </Button>
      </div>
        
    </div>
    <div class="community-posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-content">{{ post.content }}</p>
        <div class="post-meta">
          <span class="post-author">{{ post.author }}</span>
          <span class="post-date">{{ post.date }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 페이지네이션 컴포넌트 추가 -->
  <section class="py-7">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-lg-4 mx-auto">
          <MaterialPagination>
            <!-- 이전 버튼을 '<<'로 설정 -->
            <MaterialPaginationItem prev class="ms-auto">
              <i class="fas fa-angle-double-left"></i>
            </MaterialPaginationItem>
            <MaterialPaginationItem label="1" active />
            <MaterialPaginationItem label="2" />
            <MaterialPaginationItem label="3" />
            <MaterialPaginationItem label="4" />
            <MaterialPaginationItem label="5" />
            <!-- 다음 버튼을 '>>'로 설정 -->
            <MaterialPaginationItem next>
              <i class="fas fa-angle-double-right"></i>
            </MaterialPaginationItem>
          </MaterialPagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MaterialPagination from "../components/MaterialPagination.vue";
import MaterialPaginationItem from "../components/MaterialPaginationItem.vue";
import MaterialInput from "../components/MaterialInput.vue";

export default {
  data() {
    return {
      posts: [
        { id: 1, title: '게시물 제목 1', content: '게시물 내용 1', author: '작성자1', date: '2024-06-06' },
        { id: 2, title: '게시물 제목 2', content: '게시물 내용 2', author: '작성자2', date: '2024-06-05' },
        { id: 3, title: '게시물 제목 3', content: '게시물 내용 3', author: '작성자3', date: '2024-06-04' },
        // 다른 게시물들도 추가할 수 있습니다.
      ],
      searchQuery: '',
      
    };
  },
  methods: {
    goToWritePage() {
      if (this.$store.getters.isAuthenticated) {
        this.$router.push(`/writepagetest`);
      } else {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        console.log("로그인된 유저가 없습니다.");
        this.$store.dispatch('goToLoginPage');
      }
    },
    searchPosts() {
      // TODO: 게시물 검색하는 기능을 구현합니다.
      console.log("게시물을 검색합니다.");
    }
},
  components: {
    MaterialPagination,
    MaterialPaginationItem,
    MaterialInput,
    
  }
};

</script>
<style scoped>
.community {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.community-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  align-items: center;
}

.header-actions button {
  margin-left: 8px;
}
.btn-write, .btn-search {
  color: #003a9a; /* 기본 글씨 색상 */
  border: 1px solid #003a9a; /* 기본 테두리 색상 */
  background: none; /* 배경 제거 */
  cursor: pointer;
  padding: 6px 10px; /* 크기 조정 */
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* 호버 시 반응 추가 */
  border-radius: 4px; /* 테두리 둥글게 */
  height: 40px; /* search-input과 같은 높이 */
  width: 80px; /* 넓이 조정 */
  font-size: 14px; /* 폰트 크기 줄이기 */
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap; /* 텍스트 한 줄로 유지 */
}

.btn-write:hover, .btn-search:hover {
  background-color: #fff; /* 호버 시 배경색 유지 */
  color: #87CEEB; /* 호버 시 글씨 색상 하늘색 */
  border-color: #87CEEB; /* 호버 시 테두리 색상 하늘색 */
}

.search-input {
  padding: 6px 10px; /* 크기 조정 */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.community-posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post {
  border: 1px solid #ccc;
  padding: 20px;
}

.post h3 {
  margin-top: 0;
}

.post-title {
  font-size: 1.2em;
  margin-bottom: 8px;
}

.post-content {
  margin-bottom: 12px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.post-author,
.post-date {
  color: #6c757d;
}
</style>
