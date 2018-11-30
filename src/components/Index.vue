<template>
        <div class="container">
          <post-pannel @getIMG="getIMG"></post-pannel>
          <main-pannel></main-pannel>    
          <img v-show="poster" :src="poster" alt="">

          <el-dialog title="上传图片" :visible.sync="dialogTableVisible">
            <input type="file" @change="getUpIMG" />
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          
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
            poster: '',
            dialogTableVisible:true
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
          },
          getUpIMG(files){
            console.log(files)
          }
            
        }
      }
      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      
      </style>
      