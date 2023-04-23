<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="/src/assets/5.jpg" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间:<span>2022-7-11</span></p>
          <p>上次登录的地点:<span>北京</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tabledata">
          <el-table-column
            v-for="(value, key) in tablelable"
            :key="key"
            :prop="key"
            :label="value"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countdata"
          :key="item.name"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card :style="{ height: '280px' }">
        <div :style="{ height: '280px' }" ref="echart"></div>
      </el-card>
      <div class="graph">
        <el-card :style="{ height: '260px' }">
          <div :style="{ height: '240px' }" ref="userechart"></div>
        </el-card>
        <el-card :style="{ height: '260px' }">
          <div :style="{ height: '240px' }" ref="videoechart"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import * as echarts from "echarts";
export default {
  name: "Home",
  setup() {
    const { proxy } = getCurrentInstance();
    let tabledata = ref([]);
    let countdata = ref([]);
    const tablelable = {
      name: "课程",
      todayBuy: "今日购买",
      montyBuy: "本月购买",
      totalBuy: "总购买",
    };
    const getTableList = async () => {
      let res = await proxy.$api.gettabledata();
      tabledata.value = res.tableData;
    };
    //获取首页count数据
    const getcountdata = async () => {
      let ress = await proxy.$api.getCountData();
      // console.log(ress);
      countdata.value = ress;
    };
    //获取echars数据
    const echardata = async () => {
      let res = await proxy.$api.getEcharsData();
      // console.log(res);
      let orderres = res.orderData;
      let userres = res.userData;
      let videores = res.videoData;
      orderData.xData = orderres.date;
      const keyArray = Object.keys(orderres.data[0]);
      // console.log(keyArray);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: orderres.data.map((item) => item[key]),
          type: "line",
        });
      });
      // console.log(series);
      orderData.series = series;
      xopions.xAxis.data = orderData.xData;
      xopions.series = orderData.series;
      //进行渲染
      let echars = echarts.init(proxy.$refs["echart"]);
      echars.setOption(xopions);

      //柱状图
      userData.xData = userres.map((item) => {
        return item.date;
      });
      userData.series = [
        {
          name: "新增用户",
          data: userres.map((item) => {
            return item.new;
          }),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userres.map((item) => {
            return item.active;
          }),
          type: "bar",
        },
      ];
      //饼状图的配置项
      xopions.xAxis.data = userData.xData;
      xopions.series = userData.series;
      //进行饼状图的渲染
      let uechars = echarts.init(proxy.$refs["userechart"]);
      uechars.setOption(xopions);

      videoData.series = [
        {
          data: videores,
          type: "pie",
        },
      ];
      pieOptions.series = videoData.series;
      let vechars = echarts.init(proxy.$refs["videoechart"]);
      vechars.setOption(pieOptions);
    };
    onMounted(() => {
      getTableList();
      //获取首页count数据
      getcountdata();
      //获取首页echars数据
      echardata();
    });
    //echars配置---表格渲染部分
    let xopions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    let orderData = reactive({
      xData: [],
      series: [],
    });
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      series: [],
    });

    return { tabledata, tablelable, countdata };
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>
