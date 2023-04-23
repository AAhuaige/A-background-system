<template>
  <el-row>
    <el-col :span="10">
      <div class="youshangdiv">
        <el-card>
          <div :style="{ height: '440px', width: '500px' }" ref="lditu"></div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="10" :push="2">
      <div class="zuoshangdiv">
        <el-card>
          <div :style="{ height: '440px', width: '500px' }" ref="yditu"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
import * as echarts from "echarts";
export default {
  name: "Mall",
  setup() {
    const { proxy } = getCurrentInstance();

    function datas() {
      var ROOT_PATH = "https://echarts.apache.org/examples";
      var myChart = echarts.init(proxy.$refs["lditu"]);
      var option;

      option = {
        title: {
          text: "水一个页面",
          subtext: "两个饼图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
            "rose5",
            "rose6",
            "rose7",
            "rose8",
          ],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "各个城市的占比",
            type: "pie",
            radius: [20, 140],
            center: ["25%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 40, name: "北京" },
              { value: 33, name: "上海" },
              { value: 28, name: "深圳" },
              { value: 22, name: "广州" },
              { value: 20, name: "杭州" },
              { value: 15, name: "南京" },
              { value: 12, name: "苏州" },
              { value: 10, name: "成都" },
            ],
          },
          {
            name: "各个地区的占比",
            type: "pie",
            radius: [20, 140],
            center: ["75%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: [
              { value: 30, name: "广东" },
              { value: 28, name: "河南" },
              { value: 26, name: "山东" },
              { value: 24, name: "浙江" },
              { value: 22, name: "江苏" },
              { value: 20, name: "上海" },
              { value: 18, name: "北京" },
              { value: 16, name: "河北" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    }
    function datass() {
      //   var chartDom = document.getElementById("main");
      var myChart = echarts.init(proxy.$refs["yditu"]);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["青果", "绿果", "红果", "苹果", "橙果", "蓝果", "紫果"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "河北",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "河南",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "江苏",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "浙江",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "辽宁",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "上海",
            type: "bar",
            barWidth: 5,
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "北京",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "内蒙古",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "山东",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      };

      option && myChart.setOption(option);
    }
    onMounted(() => {
      datas();
      datass();
    });
  },
};
</script>

<style lang="less" scoped>
.youshangdiv {
  display: flex;
}
.zuoshangdiv {
  display: flex;
}
</style>
