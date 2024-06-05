<script setup>
import { RouterLink } from "vue-router";
import { ref, watch, computed } from "vue";
import { useWindowsWidth } from "../assets/js/useWindowsWidth";
import { defineProps } from 'vue';
import MaterialButton from "../components/MaterialButton.vue";

// images
import ArrDark from "../assets/img/down-arrow-dark.svg";
import DownArrWhite from "../assets/img/down-arrow-white.svg";

const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "https://www.creative-tim.com/product/vue-material-kit",
      color: "bg-gradient-success",
      label: "Free Download"
    })
  },
  transparent: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  darkText: {
    type: Boolean,
    default: false
  }
});
  // 초기값은 false로 설정되어 있으며, 사용자가 로그인되어 있지 않다고 가정합니다.
  const userLoggedIn = ref(false); 

  function handleLogin() {
  // 로그인 처리 로직
  userLoggedIn.value = true; // 사용자가 로그인한 상태로 설정
  localStorage.setItem("userLoggedIn", true); // 사용자가 로그인한 상태를 로컬 스토리지에 저장
}

function handleLogout() {
  // 로그아웃 처리 로직
  userLoggedIn.value = false; // 사용자가 로그아웃한 상태로 설정
  localStorage.removeItem("userLoggedIn"); // 로그인 상태를 로컬 스토리지에서 삭제
}
  // set arrow  color
function getArrowColor() {
    if (props.transparent && textDark.value) {
      return ArrDark;
    } else if (props.transparent) {
      return DownArrWhite;
    } else {
      return ArrDark;
    }
}

  // set text color
  const getTextColor = () => {
    let color;
    if (props.transparent && textDark.value) {
        color = "text-dark";
      } else if (props.transparent) {
        color = "text-white";
      } else {
        color = "text-dark";
      }

      return color;
  };

  // set nav color on mobile && desktop

  let textDark = ref(props.darkText);
  const { type } = useWindowsWidth();

  if (type.value === "mobile") {
        textDark.value = true;
      } else if (type.value === "desktop" && textDark.value == false) {
        textDark.value = false;
  }

  watch(
    () => type.value,
    (newValue) => {
      if (newValue === "mobile") {
        textDark.value = true;
      } else {
        textDark.value = false;
      }
    }
  );
  const userNameDisplay = computed(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn"); // 로그인 상태 확인
    if (userLoggedIn.value) {
      // 사용자가 로그인한 경우 사용자 이름을 표시합니다.
      const userEmail = localStorage.getItem("userEmail");
      return "UserName";
    } else {
      // 사용자가 로그인하지 않은 경우 기본 메시지 또는 빈 문자열을 표시합니다.
      return "Hello, Guest!";
    }
  });
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-dark font-weight-bolder ms-sm-3'
            : 'text-white font-weight-bolder ms-sm-3'
        ]"
        :to="{ name: 'Home' }"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
        style="font-size: 1.5rem;"
      >
        BlueCode
      </RouterLink>
      <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        to="/"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
        style="font-size: 1.5rem;"
      >
        블루코드!!!
      </RouterLink>
      <a
        href="/login"
        class="btn btn-outline-info w-auto me-2 d-lg-none d-block ms-auto login-button-container"
        >Login</a
      >
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
      <!-- Sections -->
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <!-- 문제, 해답 페이지 -->
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"  
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            <i><img src="../assets/img/iconimg1.png" /></i > <!-- 여기서 material-icons 아이콘을 사용 -->
              Pages
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <div
                        class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                      >
                        Study
                      </div>
                      <RouterLink
                        :to="{ name: 'Quiz' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Quiz</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'Solution' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Solution</span>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <div
                  class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0"
                >
                  Landing Pages
                </div>
                <RouterLink
                  :to="{ name: 'Quiz' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Quiz</span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'Solution' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Solution</span>
                </RouterLink>
              </div>
            </div>
          </li>
          <!-- 문제 등록 페이지 nav --> 
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuBlocks"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            <i><img src="../assets/img/iconimg1.png" /></i ><!-- 여기서 material-icons 아이콘을 사용 -->
              Community 
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <div
                        class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                      >
                        SAAAY~
                      </div>
                      <RouterLink
                        :to="{ name: 'Community' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Communtiy</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'RegisterProblem' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Regist</span>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <div
                  class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0"
                >
                  Landing Pages
                </div>
                <RouterLink
                  :to="{ name: 'Community' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Community</span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'RegisterProblem' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Regist</span>
                </RouterLink>
              </div>
            </div>

          </li>
          <!-- Sections -->
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuDocs"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i><img src="../assets/img/iconimg1.png" /></i ><!-- 여기서 material-icons 아이콘을 사용 -->
                {{ userNameDisplay }}
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md mt-0 mt-lg-3 p-3 border-radius-lg"
              aria-labelledby="dropdownMenuDocs"
            >
              <div class="d-none d-lg-block">
                <ul class="list-group">
                  <li class="nav-item list-group-item border-0 p-0">
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="/mypage"
                    >
                      <h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        My Page
                      </h6>
                    </a>
                  </li>
                  <li class="nav-item list-group-item border-0 p-0">
                    <a
                      class="dropdown-item py-2 ps-3 border-radius-md"
                      href="/solution"
                    >
                      <h6
                        class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                      >
                        Solved
                      </h6>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row d-lg-none">
                <div class="col-md-12 g-0">
                  <a
                    class="dropdown-item py-2 ps-3 border-radius-md"
                    href="/mypage"
                  >
                    <h6
                      class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0"
                    >
                      My Page
                    </h6>
                  
                  </a>
                  <a
                    class="dropdown-item py-2 ps-3 border-radius-md"
                    href="/solution"
                  >
                    <h6
                    class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente aign-items-center p-0"
                    >
                      Solved
                    </h6>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <!-- Sections -->
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              href="https://www.github.com/"
              class="nav-link d-flex cursor-pointer align-items-center"
            >
              <svg
                width="20px"
                height="20px"
                class="material-icons me-2 opacity-6"
                viewBox="0 0 24 24"
                aria-hidden="true"
                data-testid="GitHubIcon"
                :fill="props.transparent && '#fff'"
              >
                <path
                  d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"
                ></path>
              </svg>
              Github
            </a>
          </li>
          <!-- Sections -->
        </ul>
        <!-- 로그인 버튼 시작 해결 못함--> 
        <ul class="navbar-nav d-lg-block d-none">
          <li class="row justify-space-between text-center py-2 nav-item">
            <div class="col-12 mx-auto">
              <a href="/login" class="w-auto me-2">
                <MaterialButton variant="outline" color="info" class="w-auto me-2 login-button-container">Login</MaterialButton>  
              </a>    
            </div>
          </li>
        </ul>
        <!-- 로그인 버튼 끝 -->
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
<style>
.login-button-container {
  margin-top : 16px;
  margin-left: 8px;
}
</style>