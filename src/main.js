import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
//引入图标并全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 引入vuex(store)
import store from "./store/index";
//引入mock
import "./api/mock.js";
//引入less
import "./assets/less/index.less";
//引入api
import api from "./api/api";
//创建app并挂载ElementPlus
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.$api = api;
store.commit("addmenu", router);

function checkRouter(path) {
  let hasChech = router.getRoutes().filter(route => route.path == path).length;
  if (hasChech) {
    return true;
  } else {
    return false;
  }
}

router.beforeEach((to, from, next) => {
  store.commit("gettoken");
  const token = store.state.token;
  if (!token && to.name !== "Login") {
    next({
      name: "Login",
    });
  } else if (!checkRouter(to.path)) {
    next({
      name: "home",
    });
  } else {
    next();
  }
});

app.use(router).use(store).mount("#app");
