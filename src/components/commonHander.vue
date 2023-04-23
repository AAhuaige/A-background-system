<template>
  <el-header>
    <div class="l-content">
      <!-- 图标展示 -->
      <el-button size="small" plain @click="handercollper">
        <el-icon :size="20"><Menu /></el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="imgsrc(5)" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="tuichu">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "CommonHander",
  setup() {
    let store = useStore();
    const router = useRouter();
    const imgsrc = (user) => {
      // console.log(import.meta.url);
      return new URL(`../assets/${user}.jpg`, import.meta.url).href;
    };
    function handercollper() {
      store.commit("UpdataIsCollapse");
    }
    const current = computed(() => {
      return store.state.currentMenu;
    });
    const tuichu = () => {
      store.commit("closemenu");
      router.push({
        name: "Login",
      });
    };
    return {
      imgsrc,
      handercollper,
      current,
      tuichu,
    };
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #333;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
// .bread /deep/ span {
//   color: #fff !important;
//   cursor: pointer !important;
// }
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
