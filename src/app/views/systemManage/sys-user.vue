<template>
  <div class="cointer-box clear">
    <div class="cointer-info-left">
      <div class="toolbar">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="keyword" @keyup.enter.native="search" placeholder="输入部门，按回车搜索"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-scrollbar>
        <LiquorTree :data="items" :options="options">
          <span class="tree-text" slot-scope="{ node }">
            <template v-if="!node.hasChildren()">
              <i class="iconfont icon-geren5"></i>
              {{ node.text }}
            </template>
            <template v-else>
              <i class="iconfont icon-custom-department"></i>
              {{ node.text }}
            </template>
          </span>
        </LiquorTree>
      </el-scrollbar>
    </div>
    <div class="cointer-info-right">
      <div class="toolbar el-col el-col-24">
        <el-form :inline="true" class="demo-form-inline" style="text-align:right;">
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
          <el-table-column prop="city" align="center" label="城市">
          </el-table-column>
          <el-table-column prop="createTime" align="center" label="创建日期">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button v-if="scope.row.is_admin === 0" size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">设置为管理员</el-button>
              <el-button v-else size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">取消管理员</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" background :page-sizes="[10, 20, 30, 40]" @current-change="handleCurrentChange" style="height:31px;" :page-size="10" :total="total" layout="total, sizes, prev, pager, next">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import * as service from "./service";
import { statusValid } from "../../utils/status-valid";
import LiquorTree from "liquor-tree";

export default {
  data() {
    return {
      listLoading: true,
      total: 0,
      pageSize: 10,
      formStatus: false,
      keyword: "",
      current: 1,
      dataTable: [],
      items: [
        {
          text: "Disc C:",
          state: { expanded: true },
          children: [
            { text: "PerfLogs" },
            {
              text: "Users",
              children: [
                { text: "User 1" },
                { text: "User 2" },
                {
                  text: "Users",
                  children: [
                    { text: "User 1" },
                    { text: "User 2" },
                    {
                      text: "Users",
                      children: [
                        { text: "User 1" },
                        { text: "User 2" },
                        {
                          text: "Users",
                          children: [
                            { text: "User 1" },
                            { text: "User 2" },
                            {
                              text: "Users",
                              children: [
                                { text: "User 1" },
                                { text: "User 2" },
                                {
                                  text: "Users",
                                  children: [
                                    { text: "User 1" },
                                    { text: "User 2" },
                                    { text: "User 3" }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            { text: "tomcat" },
            { text: "sysCache" },
            {
              text: "Program Files",
              children: [
                { text: "Intel" },
                { text: "Internet Explorer" },
                { text: "Opera" },
                { text: "Oracle" }
              ]
            }
          ]
        }
      ],
      options: {
        parentSelect: true
      }
    };
  },
  components: {
    LiquorTree
  },
  mounted() {
    this.findlist();
  },
  filters: {},
  methods: {
    findlist() {
      this.listLoading = true;
      const { current, pageSize, keyword } = this;
      const params = {
        nickname: keyword
      };
      service.getSystemUserList(params, current, pageSize).then(res => {
        const { data, status } = res;
        if (statusValid(this, status, data)) {
          const { list, total } = data.data;
          this.dataTable = list;
          this.total = total;
          this.listLoading = false;
        }
      });
    },
    search() {
      this.current = 1;
      this.findlist();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.current = 1;
      this.findlist();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.findlist();
    },
    handleEdit(index, row) {
      service.pdateProgramUserAdmin(row.id).then(res => {
        let { data, status } = res;
        if (statusValid(this, status, data)) {
          this.$message({
            message: "设置成功",
            duration: 1000,
            type: "success"
          });
          row.is_admin = row.is_admin === 0 ? 1 : 0;
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "#/styles/tree.scss";
</style>

<style lang="scss" scoped>
.cointer-box {
  flex-direction: row;
}
.el-form-item {
  margin-bottom: 0;
}
.portrait {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.cointer-info-left {
  width: 218px;
  float: left;
  height: 100%;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  margin-right:-218px;
  background:#fff;
}
.cointer-info-right {
  height: 100%;
  width: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  padding-left:218px;
}
</style>
