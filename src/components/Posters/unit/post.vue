<template>
  <div class="container">
    <el-button type="primary" @click="makePort">一键生成海报</el-button>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas';
  import Canvas2Image from 'canvas2image';
  export default {
    props: {
      keepPrue: {
        // 维持用户选择的图片类型及背景，原组件会填充白色背景 例如:上传的透明png图片希望维持透明状态
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loading: false,
        clipData: null
      }
    },
    mounted() {
    },
    methods: {
      makePort() {
        var that = this;

        var cntElem = document.getElementById('box_dragger');   

        var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 1; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 

        var opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height,
          useCORS: true // 【重要】开启跨域配置
        };
        html2canvas(shareContent, opts).then(function (canvas) {

            var context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

            // 【重要】默认转化的格式为png,也可设置为其他格式
            var img = canvas.toDataURL();
            that.$emit("getIMG",img)

            // $(img).css({
            //   "width": canvas.width / 2 + "px",
            //   "height": canvas.height / 2 + "px",
            // }).addClass('f-full');

          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>