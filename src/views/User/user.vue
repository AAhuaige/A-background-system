<template>
  <div class="user-header">
    <el-button type="primary" @click="handeradd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handerSeq">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />

      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="bianji(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="handerdeleteUser(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="cogfig.total"
      @current-change="changepage"
      class="pager mt-4"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form
      :inline="true"
      :model="formUser"
      class="demo-form-inline"
      ref="userForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[
              {
                required: true, //必填项
                message: '姓名是必填项',
              },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              {
                required: true, //必填项
                message: '年龄是必填项',
              },
              {
                type: 'number',
                message: '年龄必须是数字',
              },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[
              {
                required: true, //必填项
                message: '性别是必选项',
              },
            ]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="日期"
            prop="birth"
            :rules="[
              {
                required: true, //必填项
                message: '出生日期是必选项',
              },
            ]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期e"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[
            {
              required: true, //必填项
              message: '地址是必填项',
            },
          ]"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handlecan">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
} from "vue";

export default defineComponent({
  name: "User",
  setup() {
    const { proxy } = getCurrentInstance();
    let list = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);

    const cogfig = reactive({
      total: 0,
      page: 1,
      name: "",
    });

    const getUserData = async (cogfig) => {
      let res = await proxy.$api.getUserData(cogfig);
      cogfig.total = res.count;
      list.value = res.list.map((ietm) => {
        ietm.sexLabel = ietm.sex === 0 ? "女" : "男";
        return ietm;
      });
    };

    function changepage(page) {
      cogfig.page = page;
      getUserData(cogfig);
    }

    const formInline = reactive({
      keyword: "",
    });

    function handerSeq() {
      cogfig.name = formInline.keyword;
      getUserData(cogfig);
    }

    //控制模态框的显示隐藏
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗?")
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    //添加用户的form数据
    const formUser = reactive({
      name: "", //添加用户的用户名
      age: "",
      sex: "",
      birth: "",
      addr: "",
    });
    const timefotmat = (time) => {
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      function add(m) {
        return m < 10 ? "0" + m : m;
      }
      return year + "-" + add(month) + "-" + add(date);
    };
    //添加用户
    const onSubmit = () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (action.value == "add") {
            formUser.birth = timefotmat(formUser.birth);
            let res = await proxy.$api.addUser(formUser);
            if (res) {
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(cogfig);
            }
          } else {
            formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
            let res = await proxy.$api.editUser(formUser);
            if (res) {
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(cogfig);
            }
          }
        } else {
          ElMessage({
            showClose: true,
            message: "请输入正确的内容",
            type: "error",
          });
        }
      });
    };
    //取消按钮的红色*消除
    const handlecan = () => {
      dialogVisible.value = false;
      proxy.$refs.userForm.resetFields();
    };

    const action = ref("add");
    //编辑
    const bianji = (row) => {
      action.value = "edit";
      dialogVisible.value = true;
      row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
      proxy.$nextTick(() => {
        Object.assign(formUser, row); //浅拷贝
      });
    };
    const handeradd = () => {
      dialogVisible.value = true;
      action.value = "add";
    };

    const handerdeleteUser = (row) => {
      ElMessageBox.confirm("确定删除吗?").then(async () => {
        await proxy.$api.deleteUser({
          id: row.id,
        });
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        getUserData(cogfig);
      });
    };
    onMounted(() => {
      getUserData(cogfig);
    });

    return {
      list,
      tableLabel,
      cogfig,
      changepage,
      handerSeq,
      formInline,
      dialogVisible,
      handleClose,
      formUser,
      handlecan,
      onSubmit,
      bianji,
      action,
      handeradd,
      handerdeleteUser,
    };
  },
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>
