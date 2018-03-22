<template>
  <div class="login-bg">
    <div class="login">
      <div class="login_top">智慧图谱评估系统</div>
      <form class="my-login-main">
        <div class="form-group row">
          <label for="username" class="col-sm-3 control-label my-label">账号：</label>
          <div class="col">
            <input type="text"
                   class="form-control my-control"
                   id="username"
                   placeholder="请输入用户名"
                   v-model="user"
                   :class="{'is-invalid': userBool}"
                   @blur="blurUser()"
                   @focus="focusUser()" >
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-sm-3 control-label my-label">密码：</label>
          <div class="col">
            <input :type="passType"
                   class="form-control my-control"
                   id="password"
                   placeholder="请输入密码"
                   v-model="password"
                   :class="{'is-invalid': passBool}"
                   @focus="focusPass()"
                   @blur="blurPass()" >
          </div>
        </div>
        <div class="form-group row">
          <label for="code" class="col-sm-3 control-label my-label">验证码：</label>
          <div class="col-sm-5 col-6">
            <input type="text"
                   v-model="codes"
                   class="form-control my-control"
                   id="code"
                   :class="{'is-invalid': codeBools}"
                   placeholder="请输入验证码"
                   @focus="focusCode()"
                   @blur="blurCode()">
          </div>
          <div class="col-sm-4 col-6 my-control text-right" @click="refreshCode" id="login_code"></div>
        </div>
        <p class="text-danger my-err" v-show="mages.showed">{{mages.err}}</p>
        <div class="login-btns clearfix">
          <button class="login-btn col-sm-9 col" @click.stop.prevent="login()">{{loading}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import verCode from './js/verCode'
  import {setStorage, getStorage} from '@/api/sessionStorage'
  const MASSAGE = {
    user: ['用户名不能为空！'],
    pass: ['密码不能为空！'],
    code: ['验证码不正确！'],
    loading: ['立即登录', '登陆中...', '重新登录']
  }
  export default {
    name: 'Login',
    data() {
      return {
        user: '',
        userBool: false,
        password: '',
        passBool: false,
        passType: 'password',
        codes: '',
        verifyCode: null,
        codeBool: false,
        codeBools: false,
        loading: MASSAGE.loading[0],
        mages: {
          err: '',
          showed: false
        }
      }
    },
    computed: {

    },
    methods: {
      // 验证码校验
      verCoded() { // 创建验证码
        this.verifyCode = verCode('login_code');
      },
      refreshCode() { // 刷新验证码
        this.verifyCode.refresh();
      },
      blurCode() { // 验证码输入丢失焦点
        // 验证码空提示
        if (this.codes.trim() === '') {
          this.codes = MASSAGE.code[0];
          this.codeBools = true;
          return false;
        } else if (this.codes.trim() === MASSAGE.code[0]) {
          return false;
        }
        // 验证码是否正确
        this.codeBool = this.verifyCode.validate(this.codes);
        // 验证码错误提示
        if (!this.codeBool) {
          this.codes = MASSAGE.code[0];
          this.codeBools = true;
          return false;
        } else {
          return true;
        }
      },
      focusCode() {
        if (this.codes.trim() === MASSAGE.code[0]) {
          this.codes = '';
          this.codeBools = false;
        }
      },

      // 用户名验证
      blurUser() {
        if (this.user.trim() === '') {
          this.user = MASSAGE.user[0];
          this.userBool = true;
          return false;
        } else if (this.user.trim() === MASSAGE.user[0]) {
          return false;
        } else {
          return true;
        }
      },
      focusUser() {
        if (this.user.trim() === MASSAGE.user[0]) {
          this.user = '';
          this.userBool = false;
        }
      },

      // 密码验证
      blurPass() {
        if (this.password.trim() === '') {
          this.password = MASSAGE.pass[0];
          this.passBool = true;
          this.passType = 'text';
          return false;
        } else if (this.password.trim() === MASSAGE.pass[0]) {
          return false;
        } else {
          return true;
        }
      },
      focusPass() {
        if (this.password.trim() === MASSAGE.pass[0]) {
          this.password = '';
          this.passBool = false;
          this.passType = 'password';
        }
      },
      login() {
        // 如果验证全部通过 -> 登录
        if (this.blurUser() && this.blurPass() && this.blurCode()) {
          // 发送的数据
          let postData = {
            UserCode: this.user,
            UserPwd: this.password
          }
          // 发送action -> 并传递数据
          this.$store.dispatch('login', postData).then(res => {
            // 返回数据
            let data = res.data;
            if (data.Flag) {
              this.loading = MASSAGE.loading[1];
              $('.login-btn').attr('disabled', 'disabled');
              // 需要保存的用户信息
              let userInfo = {
                userId: data.ApiData.UserCode,
                userName: encodeURIComponent(data.ApiData.UserName),
                userImg: data.ApiData.UserImg
              }
              // 设置登录sessionStorage，保存登录信息
              setStorage('userInfo', userInfo);
              // 保存全局token: UserCode
              this.$store.dispatch('backToken', data.ApiData.UserCode);
              // 是否显示错误信息提示
              this.mages.showed = false;
              //  console.log(this.$router)
              // 跳转页面
              this.$router.replace('/');
            } else {
              // 是否显示错误 -> 信息提示
              this.mages.err = data.Content;
              this.mages.showed = true;
              this.loading = MASSAGE.loading[2];
              $('.login-btn').removeAttr('disabled');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      isLogin() {
        if (getStorage('userInfo')) {
          this.$router.replace('/');
        }
      }
    },
    created: function() {
      // 是否已登录， 登录状态不能访问
      this.isLogin();
    },
    mounted: function() {
      // 组件创建完毕 -> 获取元素创建验证码
      this.verCoded();
      // 动态计算验证码:宽度/高度
      let $verifyCanvas = $('#verifyCanvas');
      let $loginCode = $('#login_code');
      $(window).resize(() => {
        $verifyCanvas.css({
          width: $loginCode.width(),
          height: $loginCode.height()
        })
      })
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./css/index";
</style>
