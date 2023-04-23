// 整个项目的api管理

import request from "./request";
export default {
  //home组件，左侧表格数据获取
  gettabledata(params) {
    return request({
      url: "/home/gettabledata",
      method: "get",
      data: params,
      mock: true,
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
      method: "get",
      mock: true,
    });
  },
  getEcharsData() {
    return request({
      url: "/home/getCharData",
      method: "get",
      mock: true,
    });
  },
  getUserData(params) {
    return request({
      url: "/user/getUser",
      method: "get",
      mock: false,
      data: params,
      //data:{  total: 0,  page: 1,}
    });
  },
  addUser(params) {
    return request({
      url: "/user/add",
      method: "post",
      mock: false,
      data: params,
    });
  },
  editUser(params) {
    return request({
      url: "/user/edit",
      method: "post",
      mock: false,
      data: params,
    });
  },
  deleteUser(params) {
    return request({
      url: "/user/deleteUser",
      method: "get",
      mock: false,
      data: params,
    });
  },
  //根据用户名的不同返回菜单不同的列表
  getMenu(params) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      mock: false,
      data: params,
    });
  },
};
