<template>
  <el-container class="cointer-box role-container" >
    <el-header style="text-align: left; font-size: 12px; padding: 0 10px;">
      <div class="header-flex" style="width: 50%; float:left">
        <h3>角色列表</h3>
        <el-button type="success" size="mini" @click="addDialog" style="margin-top: 16px;margin-right:20px; height:28px;">新增</el-button>
      </div>

      <div class="header-flex" style="width: 50%; float:right; padding: 0 20px;">
        <h3>角色授权</h3>
      </div>
    </el-header>
  
    <el-container>
  
      <el-aside class="role-aside">
        <template>
          <el-table border :data="dataTable" v-loading="listLoading" size="small">
            <el-table-column prop="name" label="角色名称" align="center" width="180">
            </el-table-column>
            <el-table-column prop="desc" align="center" label="角色描述">
            </el-table-column>
            <el-table-column align="center" width="130" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="delDialog(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-aside>
  
      <el-main class="role-main">
  
      </el-main>
  
    </el-container>

    <el-dialog title="角色新增" :visible.sync="roleDialogVisible" class="dialog-footer">
      <el-form :model="formRole" ref="formRole">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formRole.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="formRole.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRole">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="delRoleVisible" width="30%">
      <span>确认删除该角色吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRole">确 定</el-button>
      </span>
    </el-dialog>
  
  </el-container>
</template>

<script>
import * as service from "./service";
import { statusValid } from "../../utils/status-valid";

export default {
  data() {
    return {
      listLoading: true,
      total: 0,
      dataTable: [],
      roleDialogVisible: false,
      formRole: {},
      delRoleVisible: false,
      delRoleId: 0,
    };
  },
  mounted() {
    this.allRoleList();
  },
  methods: {
    allRoleList() {
      this.listLoading = true;
      let params = {};
      service.getAllRoleList(params).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data;
          this.total = data.totalItems;
          this.listLoading = false;
        }
      });
    },
    addDialog() {
      this.roleDialogVisible = true;
      this.formRole = {};
    },
    addRole() {
      this.roleDialogVisible = false;
      let params = {};
      service.addRole(this.formRole).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.allRoleList();
        }
      });
    },
    delDialog(roleId) {
      this.delRoleVisible = true;
      this.delRoleId = roleId;
    },
    deleteRole(){
      this.delRoleVisible = false;
      let params = {
        roleId: this.delRoleId
      };
      service.delRole(params).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.allRoleList();
        }
      });
    },
  }
};
</script>

<style lang="scss">
.role-container {
  padding: 0px;
}
.role-aside {
  width: 50% !important;
  float: left;
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
}
.role-main {
  width: 50% !important;
  float: right;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
}
.role-table {
  border: 1px !important;
}
.header-flex {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  h3 {
    height: 60px;
    line-height: 60px;
    flex: 1;
  }
}
</style>
