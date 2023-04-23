<template>
  <div class="common-layout">
    <el-container class="lay-container">
        <commonAideVue></commonAideVue>
      <el-container>
        <commonHander></commonHander>
        <commontab></commontab>
        <el-main class="right-main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import commonAideVue from "../components/commonAide.vue";
import commonHander from "../components/commonHander.vue";
import commontab from "../components/commontab.vue";
export default defineComponent({
  name: "Main",
  setup() {},
  components: {
    commonHander,
    commonAideVue,
    commontab,
  },
});
</script>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}
.common-layout {
  .lay-container {
    flex-wrap: nowrap;
    .right-main {
      height: calc(100% - 124px) !important;
    }
  }
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}
</style>
