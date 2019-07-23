<template>
        <div class="box_control">
            <p style="font-family:'iconfont1'">试一下字体</p>
                <el-form  label-width="80px" :model="formLabelAlign" class="sm-table">
                        <el-form-item label="字体颜色">
                                <el-color-picker v-model="formLabelAlign.color" size="mini"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="字体大小">
                          <el-input placeholder="请输入内容" v-model="formLabelAlign.fontSize" size="mini">
                                <template slot="append">px</template>
                              </el-input>
                        </el-form-item>
                        <el-form-item label="字体样式">

                        </el-form-item>
                      </el-form>
        </div>
    </template>
    
    <script>
        import { mapGetters, mapMutations } from 'vuex'
        
        export default {
            props: {
                data:{
                    type:Array,
                    default:function(){
                        return []
                    }
                },
                nowTab:{
                    type:String,
                    default:0
                }
            },
            data() {
                return {
                    checkList:[],
                    Stacks:this.$store.getters.Stacks,
                    formLabelAlign:{
                        color:"",
                        fontSize:"",
                        fontStyle:"'"
                    }
                }
            },
            watch: {
            },
            mounted() {
            },
            methods: {
            }
        }
    </script>
    <style scoped>
        @import '../../../assets/style/font.css'

    </style>