<template>
    <div>
        <div class="phone">
                <div id="editor1" class="title" contenteditable="true">
                        <h1>标题</h1>
                </div>
                <div id="editor2" class="content" contenteditable="true">
                        <h1>文章内容</h1>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        CKEDITOR.disableAutoInline = true;
        CKEDITOR.inline( 'editor1');
        CKEDITOR.inline( 'editor2' ,{
            fontSize_sizes:'12/12px;16/16px;18/18px;20/20px;22/22px;24/24px;36/36px;48/48px;',
            fontSize_defaultLabel:'16px',
                image_previewText : '',
                removeDialogTabs : 'image:advanced;image:Link',//隐藏超链接与高级选项
                filebrowserImageUploadUrl : "http://localhost:3030/Upload/sliceUploadIMG"//上传图片的地址
        });
    },
}
</script>

<style>
.phone{
background: url(../../assets/img/Editor/phone.png) center/cover;
width: 375px;
height: 760px;
padding: 42px 32px 35px 32px;
box-sizing: border-box;
margin:0 auto;
margin-top:40px;
overflow: auto;
}
.phone:focus{
outline: none;
}
.phone .content{
    position: relative;
    padding: 0px 10px;
}
.phone .content img{
    width: 100% !important;
}
</style>