import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import AppLobby from "./pages/Lobby.vue";
import AppSettings from "./pages/Settings.vue";
import AppPlayground from "./pages/Playground.vue";
import AppStart from "./pages/Start.vue";
import AppInstruction from "./pages/Instruction.vue";
import AppInstruction2 from "./pages/Instruction2.vue";
import AppInstruction3 from "./pages/Instruction3.vue";
import AppAccount from "./pages/Account.vue";
import AppFinish from "./pages/Finish.vue";
import AppChallenge1 from "./pages/Challenge1.vue"
import AppChallenge2 from "./pages/Challenge2.vue"
import AppDashboard from "./pages/Dashboard.vue"
import { store } from './store';

import "./global.css";


const routes = [
  {
  path: "/",
  redirect: "/Lobby"
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
    path: "/Start",
    name: "Start",
    component: AppStart,
  },
  {	
    path: "/Instruction",	
    name: "Instruction",	
    component: AppInstruction,	
  },
  {	
    path: "/Instruction2",	
    name: "Instruction2",	
    component: AppInstruction2,	
  },
  {	
    path: "/Instruction3",	
    name: "Instruction3",	
    component: AppInstruction3,	
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
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: AppDashboard,
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
