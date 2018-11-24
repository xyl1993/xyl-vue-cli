<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="account">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.account"
                auto-complete="off"
                placeholder="请输入用户名">
        <i slot="prefix"
           class="iconfont icon-yonghuming"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix"
           class="iconfont icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    :maxlength="code.len"
                    v-model="loginForm.code"
                    auto-complete="off"
                    placeholder="请输入验证码">
            <i slot="prefix"
               class="iconfont icon-yunongtongqingshuruyanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"
                 v-else/>
            <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
          </div>
        </el-col>
      </el-row>

    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 :loading="logining"
                 @click.native.prevent="handleLogin"
                 class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import Cookies from "js-cookie";
import { randomLenNum } from "@/utils/util";
import { setToken,setUserInfo } from '@/utils/auth';
import * as service from "./service";
import { statusValid } from "@/utils/status-valid";
const md5 = require('md5');
export default {
  name: "userlogin",
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (this.code.value != value) {
        this.loginForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      logining:false,
      loginForm: {
        account: "admin",
        password: "654321",
        code: "",
        redomStr: ""
      },
      checked: false,
      code: {
        src: "",
        value: "",
        len: 4,
        type: "text"
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, message: "密码长度最少为4位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateCode }
        ]
      },
      passwordType: "password"
    };
  },
  created () {
    this.refreshCode();
  },
  mounted () { 
    this.loginForm.account = Cookies.get("repairAccount") || '';
    this.loginForm.password = Cookies.get("repairPassword") || '';
  },
  computed: {
  },
  props: [],
  methods: {
    refreshCode () {
      this.loginForm.redomStr = randomLenNum(this.code.len, true);
      this.code.type == "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}/${this.loginForm.redomStr}`);
      this.loginForm.code = this.code.value;
    },
    showPassword () {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.logining = true;
          const {account,password} = this.loginForm;
          const loginParams = {
            account: account,
            password: md5(password)
          };
          service.webLoigin(loginParams).then(res => {
            this.logining = false;
            let { data, status } = res;
            if (statusValid(this, status, data)) {
              setToken(data.token);
              setUserInfo(JSON.stringify(data.user));
              //将用户名密码存在cookie中
              //7天
              if(this.checked){
                Cookies.set("repairAccount", account, { expires: 7 });
                Cookies.set("repairPassword", password, { expires: 7 });
              }
              this.$router.push({ path: "/sysUser" });
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
