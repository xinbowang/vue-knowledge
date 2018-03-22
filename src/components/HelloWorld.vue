<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="fonts()" class="btn btn-default">点击</button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      };
    },
    methods: {
      fonts() {
        $('h1').css({'font-size': '12px'});
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1 {
    font-weight: normal;
    color: #f00;
  }
</style>
