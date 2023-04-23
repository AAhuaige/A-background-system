import axios from "axios";
import config from "../config/index.js";
import { ElMessage } from "element-plus";
const NETWORK_ERROR = "网络请求异常，请稍后重试.....";

//创建一个实例对象
const service = axios.create({
  baseURL: config.baseApi,
});
//请求拦截
service.interceptors.request.use((req) => {
  //可以自定义Hander
  //jwt-token认证的时候
  return req;
});

//响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  //根据后端视情况而定
  if (code == 200) {
    // console.log(data);
    return data;
  } else {
    //网络请求错误
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

//封装的核心函数
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() == "get") {
    options.params = options.data;
    // console.log(options.params);
  }
  //对mock的处理
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }
  //对线上环境做处理
  if (config.env == "prod") {
    //不给你用到mock的机会
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return service(options);
}
export default request;
