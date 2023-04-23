<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">后台管理</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component :is="item.icon" class="icons"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component :is="item.icon" class="icons"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subchiren.path"
            v-for="(subchiren, subindex) in item.children"
            :key="subindex"
            @click="clickMenu(subchiren)"
          >
            <component :is="subchiren.icon" class="icons"></component>
            <span>{{ subchiren.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
export default {
  name: "commonAide",
  setup() {
    let list = [
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage",
      },
      {
        label: "其他",
        icon: "location",
        path: "/Other",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting",
            url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            url: "Other/PageTwo",
          },
        ],
      },
    ];
    let router = useRouter();
    let store = useStore();
    const noChildren = () => {
      return asyncList.filter((item) => {
        return !item.children;
      });
    };
    const hasChildren = () => {
      return asyncList.filter((item) => {
        return item.children;
      });
    };

    const asyncList = store.state.menu;
    function clickMenu(item) {
      router.push(item.name);

      store.commit("selectMenu", item);
    }

    onMounted(() => {});
    return {
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
};
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>
