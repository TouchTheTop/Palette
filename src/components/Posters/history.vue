<template>
        <div class="box_control">
                <h3>工作区</h3>
                <ul ref="pannel">
                    <li v-for="(item,i) in Stacks" draggable="true" ref="ctl" v-if="!item.hide">
                        <div class="ctl">
                            {{item.data.title}}
                        </div>
                    </li>
                </ul>

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
                    Stacks:this.$store.getters.Stacks
                }
            },
            watch: {
                'nowTab'(){
                    this.Stacks = this.$store.getters.Stacks
                }
            },
            mounted() {
            },
            methods: {
                ...mapMutations(["clearStack","hideStack"]),
                clearALL() {
                    this.Stacks = [];
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
            .box_control {
        width: 280px;
        height: 100%;
        /* margin-left: 15px; */
    }

    .box_control ul {
        padding: 0px;
        margin: 0px;
    }

    .box_control li {
        background: #fff;
        border: 1px solid #ddd;
        padding: 8px 6px;
        font-size: 14px;
        margin-bottom: 4px;
        border-radius: 3px;
        color: #666;
    }
    </style>