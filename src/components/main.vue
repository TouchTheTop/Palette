<template>
  <div class="container">
    <control-pannel @review="review"></control-pannel>
    <div class="box_dragger" ref="box_dragger" id="box_dragger">
      <ul>
        <li v-for="(item,i) in dragData">
          <div class="ctl" :class="item.type?'ctl-text':''" ref="box">
            <img src="../assets/logo.png" alt="" v-if="!item.type">
            <textarea class="spec" type="text" v-model="initText" v-if="item.type"></textarea>
            <div class="scale" ref="scale"></div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import controlPannel from './control'
  export default {
    name: 'Index',
    components: {
      controlPannel
    },
    data() {
      return {
        dragData: [  //type:0 图片 type:1 文字
          { url: '', id: 1, type: 0 },
          { url: '', id: 1, type: 0 },
          { url: '', id: 1, type: 0 },
          { url: '', id: 1, type: 1 }
        ],
        initText: "请输入文字"
      }
    },
    mounted() {
      this.initDrag()
    },
    methods: {
      initDrag(index) {
        // box是装图片的容器,fa是图片移动缩放的范围,scale是控制缩放的小图标
        var boxs = this.$refs.box;
        var fa = this.$refs.box_dragger;
        var scales = this.$refs.scale;
        
        if(index===undefined)
        this.dragData.map((v, i, arr) => {
          this.initBox(fa, boxs[i]);
          this.initScale(fa, scales[i], boxs[i]);
        })
        else{
          this.initBox(fa, boxs[index]);
          this.initScale(fa, scales[index], boxs[index]);
        }

      },
      review(data) {
        this.add(data);
      },
      add(data) {
        let nextIndex = this.dragData.length;
        this.dragData.push({
          url: '',
          type: data.type,
          id: nextIndex
        })
        this.$nextTick(()=>{
          this.initDrag(nextIndex)
        })
      },
      initBox(fa, box) {
        // 图片移动效果
        box.onmousedown = function (ev) {
          if (ev.target.localName === 'textarea') {
            return;
          }
          var oEvent = ev;
          // 浏览器有一些图片的默认事件,这里要阻止
          oEvent.preventDefault();
          var disX = oEvent.clientX - box.offsetLeft;
          var disY = oEvent.clientY - box.offsetTop;
          fa.onmousemove = function (ev) {
            oEvent = ev;
            oEvent.preventDefault();
            var x = oEvent.clientX - disX;
            var y = oEvent.clientY - disY;

            // 图形移动的边界判断
            x = x <= 0 ? 0 : x;
            x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x;
            y = y <= 0 ? 0 : y;
            y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y;
            box.style.left = x + 'px';
            box.style.top = y + 'px';
          }
          // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
          fa.onmouseleave = function () {
            fa.onmousemove = null;
            fa.onmouseup = null;
          }
          // 鼠标弹起后停止移动
          fa.onmouseup = function () {
            fa.onmousemove = null;
            fa.onmouseup = null;
          }
        }
      },
      initScale(fa, scale, box) {
        // 图片缩放效果
        scale.onmousedown = function (e) {
          // 阻止冒泡,避免缩放时触发移动事件
          e.stopPropagation();
          e.preventDefault();
          var pos = {
            'w': box.offsetWidth,
            'h': box.offsetHeight,
            'x': e.clientX,
            'y': e.clientY
          };
          fa.onmousemove = function (ev) {
            ev.preventDefault();
            // 设置图片的最小缩放为30*30
            var w = Math.max(30, ev.clientX - pos.x + pos.w)
            var h = Math.max(30, ev.clientY - pos.y + pos.h)
            // console.log(w,h)

            // 设置图片的最大宽高
            w = w >= fa.offsetWidth - box.offsetLeft ? fa.offsetWidth - box.offsetLeft : w
            h = h >= fa.offsetHeight - box.offsetTop ? fa.offsetHeight - box.offsetTop : h
            box.style.width = w + 'px';
            box.style.height = h + 'px';
            // console.log(box.offsetWidth,box.offsetHeight)
          }
          fa.onmouseleave = function () {
            fa.onmousemove = null;
            fa.onmouseup = null;
          }
          fa.onmouseup = function () {
            fa.onmousemove = null;
            fa.onmouseup = null;
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: flex;
  }

  .box_dragger {
    width: 600px;
    height: 500px;
    background-color: rgb(249, 249, 249);
    position: relative;
    margin-left: 15px;
  }

  .box_dragger img {
    width: 100%;
    height: 100%;
    cursor: move;
  }

  .box_dragger li {
    position: relative;
  }

  .box_dragger textarea {
    resize: none;
    width: 100% !important;
    height: 100% !important;
  }

  .box_dragger .ctl_text {
    position: absolute;
    top: 0;
  }

  .scale {
    width: 10px;
    height: 10px;
    overflow: hidden;
    cursor: se-resize;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .ctl {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    position: absolute;
  }

  .ctl-text {
    background: transparent;
    width: auto;
    height: auto;
    padding: 10px;
    border: 1px solid transparent;
  }

  .ctl-text:hover {
    border: 1px solid #e2dfdf;
    border-radius: 5px;
    background: #fff;
  }

  .ctl-text .spec {
    background: transparent;
    border: 0px;
    font-size: 16px;
    width: 100%;
  }
</style>