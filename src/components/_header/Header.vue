<template>
  <header class="my-nav">
    <nav class="navbar navbar-expand-lg flex-column my-navbar">
      <a class="navbar-brand my-logo" href="/">LOGO</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse my-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <div class="my-user">
              <span class="user-icon" :style="userImg"></span>
              <p class="user-name">{{decodeURIComponent(userInfo.userName)}}</p>
              <!--<p class="user-inf">四年级三班</p>-->
            </div>
          </li>
          <!--<li class="nav-item">-->
            <!--<a class="nav-link" href="#">Link</a>-->
          <!--</li>-->
        </ul>
        <div class="text-center my-logout">
          <a href="javascript:;" class="my-logout-btn" @click="logout()">退出系统<i class="icon icon2"></i></a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import modals from 'static/js/modals/modals.js'
  export default {
    name: 'Header',
    data() {
      return {
      }
    },
    props: {
      userInfo: {
        type: Object,
        default: function() {
          return {};
        }
      },
      api: {
        type: String,
        default: ''
      }
    },
    computed: {
      userImg() {
        return {'backgroundImage': 'url(' + this.api + '/' + this.userInfo.userImg + ')'}
      }
    },
    methods: {
      logout() {
        let _self = this;
        modals({
          name: 'confirm',
          message: '确定退出吗？',
          btnClass: 'btn-primary',
          callback: function(result) {
            if (result) {
              _self.$store.dispatch('logout').then(() => {
                _self.$router.push('/login')
              })
            }
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./css/index";
</style>
