<template>
  <div class="container">
    <div class="control-bar">
      <post-pannel @getIMG="getIMG"></post-pannel>
      <size-pannel></size-pannel>
    </div>

      <main-pannel></main-pannel>
    <img v-show="poster" :src="poster" alt="">



  </div>
</template>

<script>
  import mainPannel from './main'
  import postPannel from './unit/post'
  import sizePannel from './unit/size'
  export default {
    name: 'Index',
    components: {
      mainPannel,
      postPannel,
      sizePannel
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