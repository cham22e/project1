<template>
   <div id="app">
    <router-view></router-view>
    <vue-toast></vue-toast> <!-- vue-toast 컴포넌트 추가 -->
  </div>
  <div class="quiz-page">
    <!-- 문제 생성 및 선택 컨테이너 -->
    <div class="problem-creation-container">
      <div class="problem-creation-row">
        <h5>문제 생성</h5>
        <select v-model="selectedDifficulty">
          <option value="">난이도 선택</option>
          <option v-for="level in 10" :key="level" :value="level">{{ level }}</option>
        </select>
        <select v-model="selectedLanguage">
          <option value="">사용할 언어 선택</option>
          <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
        </select>
        <button class="btn" @click="createProblem" :disabled="!selectedDifficulty || !selectedLanguage">생성</button>
        <button class="btn" @click="loadPreviousProblems">지난 문제 불러오기</button>
      </div>
    </div>
    <!-- 문제 리스트 및 문제 풀이 영역 -->
    <div class="problem-section">
      <!-- 왼쪽 컨테이너 - 생성된 문제 보기 -->
      <div class="left-container">
        <h5>생성된 문제</h5>
        <ul v-if="displayedProblems.length" class="problem-list-ul">
          <li v-for="problem in displayedProblems" :key="problem.id" @click="showProblemDetail(problem)">
            {{ problem.title }}
          </li>
        </ul>
      </div>

      <!-- 오른쪽 컨테이너 - 문제 풀기 영역 -->
      <div class="right-container">
        <div v-if="selectedProblemDetail" class="editor-section">
          <h2>{{ selectedProblemDetail.title }}</h2>
          <div class="problem-description">{{ selectedProblemDetail.description }}</div>
          
          <!-- 코드 입력 영역 -->
          <div v-if="selectedProblemDetail">
            <textarea v-model="code" class="code-editor" placeholder="여기에 코드를 입력하세요."></textarea>
            <button class="btn" @click="submitCode">제출</button>
          </div>
        </div>

        <div v-if="message" class="message">{{ message }}</div>
        <div v-if="result" class="result">
          <h5>결과</h5>
          <pre>{{ result }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedDifficulty: "",
      selectedLanguage: "92", // 기본 언어 설정 (Python 3.11.2)
      languages: [
        { id: 45, name: "Assembly (NASM 2.14.02)" },
        { id: 46, name: "Bash (5.0.0)" },
        { id: 47, name: "Basic (FBC 1.07.1)" },
        { id: 75, name: "C (Clang 7.0.1)" },
        { id: 76, name: "C++ (Clang 7.0.1)" },
        { id: 48, name: "C (GCC 7.4.0)" },
        { id: 52, name: "C++ (GCC 7.4.0)" },
        { id: 49, name: "C (GCC 8.3.0)" },
        { id: 53, name: "C++ (GCC 8.3.0)" },
        { id: 50, name: "C (GCC 9.2.0)" },
        { id: 54, name: "C++ (GCC 9.2.0)" },
        { id: 86, name: "Clojure (1.10.1)" },
        { id: 51, name: "C# (Mono 6.6.0.161)" },
        { id: 77, name: "COBOL (GnuCOBOL 2.2)" },
        { id: 55, name: "Common Lisp (SBCL 2.0.0)" },
        { id: 90, name: "Dart (2.19.2)" },
        { id: 56, name: "D (DMD 2.089.1)" },
        { id: 57, name: "Elixir (1.9.4)" },
        { id: 58, name: "Erlang (OTP 22.2)" },
        { id: 44, name: "Executable" },
        { id: 87, name: "F# (.NET Core SDK 3.1.202)" },
        { id: 59, name: "Fortran (GFortran 9.2.0)" },
        { id: 60, name: "Go (1.13.5)" },
        { id: 95, name: "Go (1.18.5)" },
        { id: 88, name: "Groovy (3.0.3)" },
        { id: 61, name: "Haskell (GHC 8.8.1)" },
        { id: 91, name: "Java (JDK 17.0.6)" },
        { id: 62, name: "Java (OpenJDK 13.0.1)" },
        { id: 63, name: "JavaScript (Node.js 12.14.0)" },
        { id: 93, name: "JavaScript (Node.js 18.15.0)" },
        { id: 78, name: "Kotlin (1.3.70)" },
        { id: 64, name: "Lua (5.3.5)" },
        { id: 89, name: "Multi-file program" },
        { id: 79, name: "Objective-C (Clang 7.0.1)" },
        { id: 65, name: "OCaml (4.09.0)" },
        { id: 66, name: "Octave (5.1.0)" },
        { id: 67, name: "Pascal (FPC 3.0.4)" },
        { id: 85, name: "Perl (5.28.1)" },
        { id: 68, name: "PHP (7.4.1)" },
        { id: 43, name: "Plain Text" },
        { id: 69, name: "Prolog (GNU Prolog 1.4.5)" },
        { id: 70, name: "Python (2.7.17)" },
        { id: 92, name: "Python (3.11.2)" },
        { id: 71, name: "Python (3.8.1)" },
        { id: 80, name: "R (4.0.0)" },
        { id: 72, name: "Ruby (2.7.0)" },
        { id: 73, name: "Rust (1.40.0)" },
        { id: 81, name: "Scala (2.13.2)" },
        { id: 82, name: "SQL (SQLite 3.27.2)" },
        { id: 83, name: "Swift (5.2.3)" },
        { id: 74, name: "TypeScript (3.7.4)" },
        { id: 94, name: "TypeScript (5.0.3)" },
        { id: 84, name: "Visual Basic.Net (vbnc 0.0.0.5943)" },
      ],
      problemList: [],
      previousProblems: [],
      selectedProblemDetail: null,
      message: "",
      result: "",
      code: "",
      userSkillLevel: "", // 사용자 스킬 레벨을 초기 값으로 설정 (예: 5)
    };
  },
  computed: {
    
    displayedProblems() {
      return this.previousProblems.length ? this.previousProblems : this.problemList;
    },
  },
  created() {
    // 사용자 스킬 레벨을 기반으로 난이도를 설정합니다.
    this.selectedDifficulty = this.userSkillLevel;
  },
  methods: {
    
    createProblem() {
      if (this.selectedDifficulty && this.selectedLanguage) {
        axios
          .post("https://destiny-back-63f6h32ypq-de.a.run.app/blue/question/make_question", {
            difficulty: this.selectedDifficulty,
            language: this.selectedLanguage,
          })
          .then((response) => {
            this.problemList.push(response.data.problem);
            this.showProblemDetail(response.data.problem);
          })
          .catch((error) => {
            console.error("문제 생성 중 에러 발생: ", error);
            this.showMessage("문제를 생성하는 중 에러가 발생했습니다.");
          });
      }
    },
    loadPreviousProblems() {
      axios
        .get("https://destiny-back-63f6h32ypq-de.a.run.app/blue/question/get_my_question")
        .then((response) => {
          this.previousProblems = response.data.problems;
          if (!this.selectedProblemDetail && this.previousProblems.length > 0) {
            this.showProblemDetail(this.previousProblems[0]);
          }
        })
        .catch((error) => {
          console.error("이전 문제를 불러오는 중 에러 발생: ", error);
          this.showMessage("이전 문제를 불러오는 중 에러가 발생했습니다.");
        });
    },
    showProblemDetail(problem) {
      this.selectedProblemDetail = problem;
      this.code = ""; // 코드 에디터 초기화
      this.result = ""; // 결과 초기화
    },
    submitCode() {
      axios
        .post("https://destiny-back-63f6h32ypq-de.a.run.app/blue/question/check_answer", {
          user_code: this.code,
          question_id: this.selectedProblemDetail.id,
          language_id: this.selectedLanguage,
        })
        .then((response) => {
          this.result = response.data.result;
        })
        .catch((error) => {
          console.error("코드 제출 중 에러 발생: ", error);
          this.result = "코드 제출 중 에러가 발생했습니다.";
        });
    },
    showMessage(message) {
      this.message = message;
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
  },
};
</script>

<style scoped>
.quiz-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  background-color: #f0f0f0;
  width: 100%;
  padding: 20px 0;
  text-align: center;
}
.problem-creation-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}
.problem-creation-row {
  display: flex;
  align-items: center; /* 높이 중앙 정렬 */
  gap: 10px;
  width: 100%;
  justify-content: center;
}

select, .btn, h5 {
  height: 40px; /* 동일한 높이로 설정 */
  display: flex;
  align-items: center; /* 높이 중앙 정렬 */
  margin-bottom: 0;
}
.problem-section {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 1000px;
}

.left-container {
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 600px;
}

.right-container {
  flex: 2;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}

.problem-list-ul {
  list-style-type: none;
  padding: 0;
  cursor: pointer;
}

.problem-list-ul li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.problem-list-ul li:hover {
  background-color: #f0f0f0;
}

.editor-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.problem-description {
  margin-bottom: 20px;
}

.code-editor {
  width: 100%;
  min-height: 400px;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.message {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.result {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 0;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
