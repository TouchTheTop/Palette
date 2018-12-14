<template>
        <div class="container">
          <post-pannel @getIMG="getIMG"></post-pannel>
          <main-pannel></main-pannel>    
          <img v-show="poster" :src="poster" alt="">


          
        </div>
      </template>
      
      <script>
        import mainPannel from './main'
        import postPannel from './post'
      export default {
        name: 'Index',
        components:{
            mainPannel,
            postPannel
        },
        data () {
          return {
            poster: ''
          }
        },
        mounted(){
          this.$message({
              message: "设置成功！",
              type: "success"
            });
        },
        methods:{
          getIMG(img){
            this.poster = img;
          }
            
        }
      }
      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      
      </style>
      