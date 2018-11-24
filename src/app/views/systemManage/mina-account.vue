<template>
  <div class="cointer-box">
    <div class="toolbar el-col el-col-24">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="keyword" @keyup.enter.native="search" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native.prevent="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="my-table">
      <el-table :data="dataTable" :header-cell-style="{background:'#FAFAFA'}" v-loading="listLoading" size="small" height="250" style="width: 100%;margin-top:0;">
        <el-table-column type="index" style="width:35px">
        </el-table-column>
        <el-table-column prop="nickname" align="center" label="昵称">
        </el-table-column>
        <el-table-column prop="portrait" align="center" label="头像">
          <template slot-scope="scope">
            <img v-if="scope.row.portrait" class="portrait" :src="scope.row.portrait" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="country" align="center" label="国家">
        </el-table-column>
        <el-table-column prop="province" align="center" label="省份">
        </el-table-column>
        <el-table-column prop="city" align="center"  label="城市">
        </el-table-column>
        <el-table-column prop="createTime"  align="center" label="创建日期">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_admin === 0" size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">设置为管理员</el-button>
            <el-button v-else size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">取消管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" style="height:31px;" :page-size="pageSize" :total="total" layout="total, prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import * as service from "./service";
import { statusValid } from "../../utils/status-valid";

export default {
  data() {
    return {
      listLoading: true,
      total: 0,
      pageSize: 10,
      formStatus: false,
      keyword:'',
      current: 1,
      dataTable: [],
    };
  },

  mounted() {
    this.findlist();
  },
  filters: {
  },
  methods: {
    findlist() {
      this.listLoading = true;
      const { current,pageSize,keyword } = this;
      let params = {
        keyword:this.keyword
      };
      service.getMinaAccountList(params,current,pageSize).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.dataTable = data.data.list;
          this.total = data.totalItems;
          this.listLoading = false;
        }
      });
    },
    search() {
      this.current = 1;
      this.findlist(this);
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.current = val;
      findlist(this);
    },
    handleEdit(index, row) {
      service.pdateProgramUserAdmin(row.id).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
           this.$message({
            message: '设置成功',
            duration:1000,
            type: 'success'
          });
          row.is_admin = row.is_admin===0?1:0;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
.portrait{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
