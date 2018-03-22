<template>
  <div class="home">
    <my-bg/>
    <my-header :userInfo="userInfo" :api="api"/>
    <section class="main">
      <div class="main-one">
        <div class="lists row">
          <ul class="row col-sm-8 math-lists">
            <li class="col-12 col-sm-6">
              <my-list/>
            </li>
            <li class="col-12 col-sm-6">
              <my-list/>
            </li>
            <li class="col-12 col-sm-6">
              <my-list/>
            </li>
            <li class="col-12 col-sm-6">
              <my-list/>
            </li>
          </ul>
          <div class="users col-sm-4">
            <my-user />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {getStorage} from '@/api/sessionStorage';
  import Bg from '@/components/_main_bg/Bg';
  import Header from '@/components/_header/Header';
  import List from '@/components/_main_list/List';
  import UserList from '@/components/_main_user_list/UserList';

  export default {
    name: 'Home',
    data() {
      return {
        api: 'http://10.0.2.251:8007'
      };
    },
    computed: {
      userInfo() {
        return getStorage('userInfo');
      }
    },
    methods: {},
    created: function() {
    },
    components: {
      'my-bg': Bg,
      'my-header': Header,
      'my-list': List,
      'my-user': UserList
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./css/index";
</style>
