<template>
  <div class="tags">
    <el-tag
      :key="item.name"
      :closable="item.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      v-for="(item, index) in tags"
      >{{ item.label }}</el-tag
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    function changeMenu(item) {
      router.push({ name: item.name });
    }
    const tags = store.state.tabsList;

    const handleClose = (item, index) => {
      let lenght = tags.length - 1;
      //处理vuex中的tabsList
      store.commit("closeTab", item);
      //判断
      if (item.name !== route.name) {
        return;
      }
      if (index === lenght) {
        router.push({
          name: tags[index - 1].name,
        });
      } else {
        router.push({
          name: tags[index].name,
        });
      }
    };
    return { tags, changeMenu, handleClose };
  },
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
