<template>
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>历史操作</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="clearALL">清空</el-button>
                </div>
                <div v-for="(item,i) in Stacks" :key="i" class="del_l">
                    <!-- <el-checkbox v-model="item.delete">{{item.desc}}</el-checkbox> -->
                    <el-checkbox-group v-model="checkList" text-color="#888888">
                        <el-checkbox :label="item.id">{{item.desc}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-card>
        </div>
    </template>
    
    <script>
        import { mapGetters, mapMutations } from 'vuex'
        export default {
            computed: {
                ...mapGetters(['Stacks']),
            },
            data() {
                return {
                }
            },
            mounted() {
            },
            methods: {
                ...mapMutations(["clearStack"]),
                clearALL() {
                    this.clearStack();
                    console.log(this.$store.state)
                },
            }
        }
    </script>
    
    <style scoped>
    </style>