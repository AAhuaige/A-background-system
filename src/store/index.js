import { createStore } from "vuex";
import Cookie from "js-cookie";
export default createStore({
  //准备state————用于存储数据
  state: {
    isCollapse: true,
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    menu: [],
    token: "",
  },

  //准备actions————用于响应组件中的动作，用dispatch触发
  actions: {
    // UpdataIsCollapse(context, value) {
    //context是上下文
    //   context.commit("JISHUSUM", value);
    // },
  },

  //准备mutations————用于操作数据(state)，用 context.commit触发
  mutations: {
    UpdataIsCollapse(state, value) {
      state.isCollapse = !state.isCollapse;
    },

    selectMenu(state, value) {
      // value.name == "home" ? (state.currentMenu = null) : (state.currentMenu = value)

      if (value.name == "home") {
        state.currentMenu = null;
      } else {
        state.currentMenu = value;
        let result = state.tabsList.findIndex(
          (item) => item.name === value.name
        );
        result == -1 ? state.tabsList.push(value) : "";
      }
    },
    closeTab(state, value) {
      let res = state.tabsList.findIndex((item) => item.name == value.name);
      state.tabsList.splice(res, 1);
    },
    setmenu(state, value) {
      state.menu = value;
      localStorage.setItem("menu", JSON.stringify(value));
    },
    addmenu(state, router) {
      if (!localStorage.getItem("menu")) {
        return;
      }
      const menus = JSON.parse(localStorage.getItem("menu"));
      state.menu = menus;

      const menrArry = [];
      menus.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            let url = `../views/${item.url}.vue`;
            item.component = () => import(url);
            return item;
          });
          menrArry.push(...item.children);
        } else {
          let url = `../views/${item.url}.vue`;
          item.component = () => import(url);
          menrArry.push(item);
        }
      });

      menrArry.forEach((item) => {
        router.addRoute("home1", item);
      });
    },
    closemenu(state) {
      (state.menu = []), localStorage.removeItem("menu");
    },

    settoken(state, value) {
      state.token = value;
      Cookie.set("token", value);
    },
    cleartoken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    gettoken(state) {
      state.token = state.token || Cookie.get("token");
    },
    //加工state的数据
    // getters: {},
  },

  modules: {
    namespaced: true,
  },
});
