<template>
    <div class="container">
        <el-button type="primary" @click="newPannel">新建面板</el-button>
        <el-dialog title="新建面板" :visible.sync="dialogVisible" width="500">
            <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                           <el-input v-model="form.name" style="width: 100%;"></el-input>
                    </el-form-item>
                <el-form-item label="尺寸">
                    <el-select v-model="form.size" placeholder="请选择">
                        <el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="固定比例">
                    <el-radio-group v-model="form.ratio">
                        <el-radio :label="false">不固定</el-radio>
                        <el-radio :label="true">固定</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="比例">
                        <el-col :span="11">
                            <el-input v-model="form.w_e" style="width: 100%;"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">*</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.h_e" style="width: 100%;"></el-input>
                        </el-col>
                </el-form-item>
                <el-form-item label="宽*高">
                    <el-col :span="11">
                        <el-input placeholder="请输入宽" v-model="form.w" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">*</el-col>
                    <el-col :span="11">
                        <el-input placeholder="请输入高" v-model="form.h" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="背景填充">
                        <el-color-picker v-model="form.bgColor" show-alpha></el-color-picker>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import options from '@/json/size.json'
    export default {
        data() {
            return {
                dialogVisible: false,
                form: {
                    name:'新建面板',
                    size: 400,
                    w: 400,
                    h: 400,
                    w_e:1,
                    h_e:1,
                    ratio: false,
                    options: [],
                    bgColor:"rgba(255, 255, 255, 0)"
                },
                isRatioTrigger:false
            }
        },
        watch: {
            'form.size'(val){
                this.form.w = val;
                this.form.h = val;
            },
            'form.ratio'(val){
                if(val){
                    this.form.h = (this.form.w / this.ratio).toFixed(2)
                    this.form.w_e = 1;
                    this.form.h_e = 1;
                }
            },
            'form.w'(val){
                !this.isRatioTrigger&&this.reloadComp('h')
            },
            'form.h'(val){
                !this.isRatioTrigger&&this.reloadComp('w')
            },
            'ratio'(val){
                !this.isRatioTrigger&&this.reloadComp('h')
            }
        },
        computed: {
            ratio(){
                return this.form.w_e / this.form.h_e
            }
        },
        mounted() {
            this.form.options = options;
        },
        methods: {
            newPannel() {
                this.dialogVisible = true;
            },
            reloadComp(typeName){
                this.isRatioTrigger = true;
                if(this.form.ratio){
                    if(typeName=='h'){
                        this.form.h = (this.form.w / this.ratio).toFixed(2)
                    }else{
                        this.form.w = (this.form.h / this.ratio).toFixed(2)
                    }
                }
                this.$nextTick(()=>{

                this.isRatioTrigger = false;
                })
                
            }
        },
    }
</script>

<style scoped>
    .line {
        text-align: center;
    }
</style>