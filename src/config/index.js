// 环境配置文件
//  一般项目有三个环境，线上环境，测试环境，开发环境

//当前的环境
const env = import.meta.env.MODE || "prod";

const EnvConfig = {
  development: {
    baseApi: "/getData",
    mockApi:
      "https://www.fastmock.site/mock/23f7ef946b9909cab1e546ba10cf8852/getData",
  },
  test: {
    baseApi: "//test.future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/23f7ef946b9909cab1e546ba10cf8852/getData",
  },
  pro: {
    baseApi: "//future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/23f7ef946b9909cab1e546ba10cf8852/getData",
  },
};

export default {
  env,
  mock: true,
  ...EnvConfig[env],
};
