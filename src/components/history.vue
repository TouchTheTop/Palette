<template>
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>历史操作</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="clearALL">清空</el-button>
                </div>
                <div v-for="(item,i) in Stacks" :key="i" class="del_l">
                    <el-checkbox-group v-model="checkList" text-color="#888888" @change="setHistory">
                        <el-checkbox :label="item.id">{{item.desc}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-card>
        </div>
    </template>
    
    <script>
        import { mapGetters, mapMutations } from 'vuex'
        
        export default {
            
            props: {
                data:{
                    type:Array,
                    default:[]
                }
            },
            data() {
                return {
                    checkList:[],
                    Stacks:[]
                }
            },
            mounted() {
                setTimeout(()=>{
                    this.Stacks = this.$store.state.Stacks
                })
            },
            methods: {
                ...mapMutations(["clearStack","hideStack"]),
                clearALL() {
                    this.clearStack();
                    console.log(this.$store.state)
                },
                getData(){
                    console.log(this.$store.state.Stacks)
                },
                setHistory(val){
                    this.hideStack(val);
                }
            }
        }
    </script>
    
    <style scoped>
    </style>