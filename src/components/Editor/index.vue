<template>
    <div class="container">
            <div class="phone">
                    <div class="phone-inner">
                        <div id="editor1" class="title" contenteditable="true">
                            <h2>标题</h2>
                        </div>
                        <div class="time-info">
                            <div class="con-info">XXXX科技</div>
                            <div class="mime-info">11月19日</div>
                        </div>
                        <div id="editor2" class="content" contenteditable="true">
                            <h3>文章内容</h3>
                        </div>
                    </div>
                </div>
                <el-button type="success" @click="getHTML">生成带标签的H5内容</el-button>
                <el-button type="success" @click="addSomething">追加内容</el-button>
    </div>

</template>

<script>
    export default {
        data(){
            return {

            }
        },
        mounted() {
            CKEDITOR.disableAutoInline = true;
            CKEDITOR.inline('editor1');
            CKEDITOR.inline('editor2', {
                fontSize_defaultLabel: '16px',
                fontSize_sizes: '12/12px;16/16px;18/18px;20/20px;22/22px;24/24px;36/36px;48/48px;',
                image_previewText: '',
                bodyClass:'contents',
                removeDialogTabs: 'image:advanced;image:Link',//隐藏超链接与高级选项
                filebrowserImageUploadUrl: "http://localhost:3030/Upload/sliceUploadIMG"//上传图片的地址
            });
//             CKEDITOR.instances["editor2"].on("instanceReady", function(){
//                 this.document.getBody().setStyle("font-family", "KaiTi");
//                 this.document.getBody().setStyle("fontSize_sizes", "16px");
// });


        },
        methods: {
            addSomething() {
                var element = CKEDITOR.dom.element.createFromHtml( '<span>hellow!</span>' );
                CKEDITOR.instances.editor1.insertElement( element );
            },
            getHTML() {
                var CTitle = CKEDITOR.instances.editor1.getData();
                var Ccontent = CKEDITOR.instances.editor2.getData();
                console.log(CTitle)
                console.log(Ccontent)
            }

        },
    }
</script>

<style>
    .phone {
        background: url(../../assets/img/Editor/phone.png) center/cover;
        width: 375px;
        height: 760px;
        padding: 42px 32px 35px 32px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 40px;
        overflow: auto;
    }
    .phone .phone-inner{
        width: 311px;
    height: 670px;
    overflow: auto;
    /* margin-top: 40px;
    margin: 40px 0px; */
    }

    .title:focus,.content:focus {
        outline: none;
    }

    .phone .content {
        position: relative;
        padding: 0px 10px;
    }

    .phone .content img {
        width: 100% !important;
    }

    .time-info{
        flex-direction: row;
    display: flex;
    /* justify-content: space-between; */
    color: #9e9e9e;
    font-size: 14px;
    }

    .time-info .con-info{
        margin-right: 8px;
    color: #1773c2;
    }
</style>