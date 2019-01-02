<template>
  <div class="container">

      <main-pannel></main-pannel>
      <div class="control-bar">
        <post-pannel @getIMG="getIMG"></post-pannel>
      </div>
    <img v-show="poster" :src="poster" alt="">



  </div>
</template>

<script>
  import mainPannel from './main'
  import postPannel from './unit/post'
  export default {
    name: 'Index',
    components: {
      mainPannel,
      postPannel
    },
    data() {
      return {
        poster: '',
      
      }
    },
    mounted() {
      this.$message({
        message: "设置成功！",
        type: "success"
      });
    },
    methods: {
      getIMG(img) {
        this.poster = img;
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control-bar{
  display: flex;
}
.separator{
  margin:15px 0px;
}
</style>