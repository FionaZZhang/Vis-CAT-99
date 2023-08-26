import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import AppLobby from "./pages/Lobby.vue";
import AppSettings from "./pages/Settings.vue";
import AppPlayground from "./pages/Playground.vue";
import AppStart from "./pages/Start.vue";
import AppInstruction from "./pages/Instruction.vue";
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

createApp(App).use(router).mount("#app");

export default router;
