import mockjs from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import permission from "./mockData/permission";
//拦截请求
mockjs.mock("/home/getData", homeApi.getHomeData);

//本地获取user数据
mockjs.mock(/user\/getUser/, "get", userApi.getUserList);
mockjs.mock(/user\/add/, "post", userApi.createUser);
mockjs.mock(/user\/edit/, "post", userApi.updateUser);
mockjs.mock(/user\/deleteUser/, "get", userApi.deleteUser);

mockjs.mock(/permission\/getMenu/, "post", permission.getMenu);
