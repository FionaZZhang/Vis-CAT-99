import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import AppLobby from "./pages/Lobby.vue";
import AppSettings from "./pages/Settings.vue";
import AppPlayground from "./pages/Playground.vue";
import AppTest1 from "./pages/Test1.vue";
import AppTest2 from "./pages/Test2.vue";
import AppTest3 from "./pages/Test3.vue";
import AppAccount from "./pages/Account.vue";
import AppFinish from "./pages/Finish.vue";
import AppChallenge1 from "./pages/Challenge1.vue"
import AppChallenge2 from "./pages/Challenge2.vue"
import { store } from './store';
import axios from 'axios';
import "./assets/global.css";

axios.defaults.baseURL = 'http://localhost:3000';
const routes = [
  {
  path: "/",
  redirect: "/Account"
  },
  {
    path: "/Lobby",
    name: "Lobby",
    component: AppLobby,
  },
  {
    path: "/Account",
    name: "Account",
    component: AppAccount,
  },
  {
    path: "/Settings",
    name: "Settings",
    component: AppSettings,
  },
  {
    path: "/Playground",
    name: "Playground",
    component: AppPlayground,
  },
  {	
    path: "/Test1",	
    name: "Test1",	
    component: AppTest1,	
  },
  {	
    path: "/Test2",	
    name: "Test2",	
    component: AppTest2,	
  },
  {	
    path: "/Test3",	
    name: "Test3",	
    component: AppTest3,	
  },
  {	
    path: "/Finish",	
    name: "Finish",	
    component: AppFinish,	
  },
  {
    path: "/Challenge1",
    name: "Challenge1",
    component: AppChallenge1,
  },
  {
    path: "/Challenge2",
    name: "Challenge2",
    component: AppChallenge2,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((toRoute, fromRoute, next) => {
  const documentTitle =
    toRoute?.meta && toRoute?.meta?.title ? toRoute?.meta?.title : "vue";
  window.document.title = documentTitle;
  if (toRoute?.meta?.description) {
    addMetaTag(toRoute?.meta?.description);
  }
  next();
});

const addMetaTag = (value) => {
  let element = document.querySelector(`meta[name='description']`);

  if (element) {
    element.setAttribute("content", value);
  } else {
    element = `<meta name="description" content="${value}" />`;
    document.head.insertAdjacentHTML("beforeend", element);
  }
};

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

export default router;
