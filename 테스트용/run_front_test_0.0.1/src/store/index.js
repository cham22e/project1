// store/index.js
import { createStore } from 'vuex';
import router from '../router';

const skillFromLocalStorage = localStorage.getItem('skill');
let skill = {};

if (skillFromLocalStorage) {
  try {
    skill = JSON.parse(skillFromLocalStorage);
  } catch (error) {
    console.error('Error parsing skill from localStorage:', error);
  }
}

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    skill: skill,
    posts: [],
    showAlert: false,
    alertMessage: '',
    isLoggedIn: !!localStorage.getItem('token'),
    comments: [], // 변경된 부분: 댓글 목록을 추가하는 state 추가
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setSkill(state, skill) {
      state.skill = skill;
      localStorage.setItem('skill', JSON.stringify(skill));
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.skill = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('skill');
    },
    setLogin(state, status) {
      state.isLoggedIn = status;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
    deleteComment(state, commentId) {
      state.comments = state.comments.filter(comment => comment.id !== commentId);
    },
    updateComment(state, updatedComment) {
      const index = state.comments.findIndex(comment => comment.id === updatedComment.id);
      if (index !== -1) {
        state.comments.splice(index, 1, updatedComment);
      }
    },
  },
  actions: {
    login({ commit }, { user, token, skill }) {
      commit('setUser', user);
      commit('setToken', token);
      commit('setSkill', skill);
      commit('setLogin', true);
    },
    logout({ commit }) {
      commit('clearAuth');
    },
    goToLoginPage() {
      router.push('/login'); // 로그인 페이지로 이동합니다.
    },
    async fetchPosts({ commit }) {
      const posts = [
        { id: 1, title: 'First Post' },
        { id: 2, title: 'Second Post' },
      ];
      commit('setPosts', posts);
    },
    async fetchComments({ commit }, postId) {
      // postId에 해당하는 글의 댓글을 서버에서 가져옴
      try {
        // 서버에서 댓글을 가져오는 비동기 작업을 수행합니다.
        const comments = [
          // 댓글 데이터 형식에 맞게 수정이 필요합니다.
          { id: 1, postId: postId, content: '댓글 내용 1' },
          { id: 2, postId: postId, content: '댓글 내용 2' },
          // ...
        ];
        commit('setComments', comments);
      } catch (error) {
        console.error('댓글을 불러오는 중 에러 발생:', error);
      }
    },
    async addComment({ commit }, comment) {
      // comment를 서버에 전송하고 추가
      try {
        // 서버에 댓글을 추가하는 비동기 작업을 수행합니다.
        // 성공하면 추가된 댓글의 정보를 받아옵니다.
        const addedComment = {
          // 추가된 댓글의 정보를 적절히 설정합니다.
          id: 3, // 예시로 3번 댓글이 추가되었다고 가정합니다.
          postId: comment.postId,
          content: comment.content,
          // 추가할 댓글의 다른 정보가 있다면 추가합니다.
        };
        commit('addComment', addedComment);
      } catch (error) {
        console.error('댓글을 추가하는 중 에러 발생:', error);
      }
    },
    async updateComment({ commit }, updatedComment) {
      // updatedComment를 서버에 전송하고 수정
      try {
        // 서버에 댓글을 수정하는 비동기 작업을 수행합니다.
        // 성공하면 수정된 댓글의 정보를 받아옵니다.
        commit('updateComment', updatedComment);
      } catch (error) {
        console.error('댓글을 수정하는 중 에러 발생:', error);
      }
    },
    async deleteComment({ commit }, commentId) {
      // commentId에 해당하는 댓글을 서버에서 삭제
      try {
        // 서버에서 댓글을 삭제하는 비동기 작업을 수행합니다.
        commit('deleteComment', commentId);
      } catch (error) {
        console.error('댓글을 삭제하는 중 에러 발생:', error);
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
    getSkill: state => state.skill,
    getPosts: state => state.posts,
    getAlertStatus: state => ({ status: state.showAlert, message: state.alertMessage }),
    getComments: state => state.comments,
  },
});

export default store;
