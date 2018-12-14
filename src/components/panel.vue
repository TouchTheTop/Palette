<template>
    <div class="box_com" ref="box_com">
        <ul>
            <li v-for="(item,i) in comData" draggable="true" @click="getItem(item)">
                <div class="wrapper">
                    <icon :name="item.svg" width="50px" height="50px"></icon>
                </div>
                <span>{{item.name}}</span>
            </li>
        </ul>
        <input type="file" @change="getUpIMG" />

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
    import Icon from 'vue-svg-icon/Icon.vue'
    import Modules from '../json/module'
    import { mapMutations } from 'vuex'
    export default {
        name: 'Index',
        components: {
            Icon
        },
        data() {
            return {
                comData: [
                    { type: 0, name: '图片', svg: 'img' },
                    { type: 1, name: '文字', svg: 'text' }
                ],
                dialogTableVisible: false
            }
        },
        created() {
            this.comData = Modules;
        },
        mounted() {
        },
        methods: {
            ...mapMutations(["addStack"]),
            getItem(obj) {
                if (obj.type === 0) {
                    this.dialogTableVisible = true;
                }
                else if (obj.type === 1) {
                    this.$emit("addItem", {
                        type: obj.type,
                        text: "请输入文字"
                    })
                }
            },
            getUpIMG(e) {
                console.log(e)
                let URL = "http://localhost:3030"

                this.$axios.request({
                    url: URL + '/Upload/sliceUploadFile', //仅为示例，并非真实的接口地址
                    method: "POST",
                    data: {
                        Key: e.target.files[0].name,
                        FilePath: e.target.files[0]
                    },
                    success: function (res) {
                        let result = res.data;

                    }
                });

                // e.target.value = "";
            },
        }
    }
</script>

<style scoped>
    .box_com ul {
        overflow: auto;
    }

    .box_com ul li {
        display: block;
        background: #ddd;
        float: left;
        background-color: #f8f8fa;
        width: 76px;
        height: 76px;
        margin: 0px 4px;
        text-align: center;
        border: 1px solid #F2F2F3;
        box-sizing: border-box;
        color: #666;
    }

    .box_com ul li span {
        font-size: 12px;
        display: inherit;
    }

    .wrapper {
        display: flex;
        width: 100%;
        font-size: 21px;
        align-items: center;
        justify-content: center;
        color: rgb(48, 91, 141);
        ;
    }
</style>