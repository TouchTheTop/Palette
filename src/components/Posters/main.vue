<template>
  <div class="container">
    <control-pannel @review="review" :nowTab="nowTab"></control-pannel>

    <el-tabs class="tap-box" v-model="nowTab" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane :key="item.id" v-for="(item, index) in Tabs" :label="item.title" :name="index+''" class="tap-pane">
        <div class="box_dragger" :ref="'box_dragger'+nowTab" :style="{width:item.w+'px',height:item.h+'px',background:item.bgColor}"
          id="box_dragger" @mousemove="mousemove" @mouseup="releaseRotate">
          <ul>
            <li v-for="(item,i) in Stacks" @click="chose(i)" :class="nowIndex===i?'active':''" v-show="!item.hide"
              :title="item.data.title">
              <div class="ctl" :class="item.data.type?'ctl-text':''" :ref="'box'+nowTab" :style="{transform:'rotate('+site.rotate+'deg)',zIndex:9999-i}">
                <img :src="item.data.text" alt="" v-if="!item.data.type">
                <textarea class="spec" type="text" v-model="item.data.text" v-if="item.data.type"></textarea>
                <div class="dragTemplate" style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #fff;opacity: 0;"></div>
                <div class="scale" :ref="'scale'+nowTab"></div>
                <div class="coner coner_a h_display"></div>
                <div class="bot bot_a h_display"></div>
                <div class="coner coner_b h_display"></div>
                <div class="bot bot_b h_display"></div>
                <div class="coner coner_c h_display"></div>
                <div class="bot bot_c h_display"></div>
                <div class="coner coner_d h_display"></div>
                <div class="bot bot_d h_display"></div>

                <div class="coner coner_a_1 " @mousedown="preTrans"></div>
                <div class="bot bot_a_1 "></div>

              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
    <history-pannel ref="Stack" :data="Stacks" :nowTab="nowTab"></history-pannel>

    <size-dialog ref="sizeDialog" @setInfo="setInfo"></size-dialog>
  </div>
</template>

<script>
  import controlPannel from './control'
  import sizeDialog from '@/components/Posters/unit/size'
  import historyPannel from '@/components/Posters/history'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'Index',
    components: {
      controlPannel,
      sizeDialog,
      historyPannel
    },
    computed: {
      ...mapGetters(["Tabs"]),
      // Stacks(){
      //   return this.$store.getters.Stacks
      // }
    },
    data() {
      return {
        dragData: [  //type:0 图片 type:1 文字
        ],
        initText: "请输入文字",
        nowIndex: null,
        site: {
          x: null,
          y: null,
          rotate: 0
        },
        Stacks: this.$store.getters.Stacks,
        keepMove: true,
        nowTab: '0',
        tabIndex: 2
      }
    },
    watch: {
      'Stacks'(val) {
        console.log("重绘")
        this.$nextTick(() => {
          this.initDrag()
        })
      },
      nowTab(val) {
        this.setNowTab(val)
        this.Stacks = this.$store.getters.Stacks
      }
    },
    mounted() {
      console.log(this.Stacks)
      this.initDrag()
    },
    methods: {
      ...mapMutations(["addTabs", "setNowTab", "delTab"]),
      setInfo(obj) {
        this.addTabs(obj);
        console.log(this.$store.state.Tabs)
        console.log("就哈哈哈哈")
        this.$nextTick(() => {
          this.nowTab = (this.Tabs.length - 1).toString();
          this.dialogVisible = false;
        })
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          this.$refs.sizeDialog.newPannel()
        }
        if (action === 'remove') {
          this.delTab();
          this.nowTab = this.$store.getters.nowTab.toString()
          // let tabs = this.editableTabs;
          // let activeName = this.editableTabsValue;
          // if (activeName === targetName) {
          //   tabs.forEach((tab, index) => {
          //     if (tab.name === targetName) {
          //       let nextTab = tabs[index + 1] || tabs[index - 1];
          //       if (nextTab) {
          //         activeName = nextTab.name;
          //       }
          //     }
          //   });
          // }

          // this.editableTabsValue = activeName;
          // this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
      chose(i) {
        this.nowIndex = i;
      },
      preTrans(e) {
        this.site.x = e.x;
        this.site.y = e.y;
        this.keepMove = false;
      },
      releaseRotate() {
        console.log("hahahhah")
        this.keepMove = true;
        this.removeChosed();
      },
      removeChosed(){
        this.nowIndex = -1;
      },
      mousemove(e) {
        if (this.keepMove) {
          return;
        }
        var x = this.site.x, y = this.site.y;
        if (e.x === x && e.y === y) {
          return;
        } else {
          if (x > e.x) {
            console.log("->")

          } else {
            console.log("<-")

          }
          console.log(Math.atan((e.y - y) / (e.x - x)) * 180 / Math.PI)
          this.site.rotate = Math.asin(Math.abs(e.y - y) / Math.abs(e.x - x)) * 180 / Math.PI
        }
      },
      getAngle(x, y) {
        if (x === 0) {
          return y > 0 ? 90 : 270;
        }
        var a = Math.atan(y / x);
        var ret = a * 180 / Math.PI; //弧度转角度，方便调试
        if (x < 0) {
          ret = 180 + ret;
        }
        if (ret > 360) {
          ret -= 360;
        }
        if (ret < 0) {
          ret += 360;
        }
        return ret;
      },
      initDrag(index) {
        // box是装图片的容器,fa是图片移动缩放的范围,scale是控制缩放的小图标
  
        var boxs = this.$refs['box'+this.nowTab];
        var fa = this.$refs['box_dragger'+this.nowTab][0];
        var scales = this.$refs['scale'+this.nowTab];

        if (index === undefined){
          this.Stacks.map((v, i, arr) => {
            this.initBox(fa, boxs[i]);
            this.initScale(fa, scales[i], boxs[i]);
          })
        }
        else {
          this.initBox(fa, boxs[index]);
          this.initScale(fa, scales[index], boxs[index]);
        }

      },
      review(data) {
        this.add(data);
      },
      add(data) {
        let nextIndex = this.Stacks.length;
        this.Stacks.push({
          url: '',
          type: data.type,
          id: nextIndex
        })
        this.$nextTick(() => {
          this.initDrag(nextIndex)
        })
      },
      initBox(fa, box) {
        let _this = this;
        // 图片移动效果
        box.onmousedown = function (ev) {
          if (ev.target.localName === 'textarea' || !_this.keepMove) {
            return;
          }
          var oEvent = ev;
          // 浏览器有一些图片的默认事件,这里要阻止
          oEvent.preventDefault();
          var disX = oEvent.clientX - box.offsetLeft;
          var disY = oEvent.clientY - box.offsetTop;
          console.log("box移动啦哈哈哈")
          fa.onmousemove = function (ev) {
            //   if (!this.keepMove)  {
            //   return;
            // }
            
          console.log("父组件移动啦哈哈哈")
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
        let _this = this;
        // 图片缩放效果
        scale.onmousedown = function (e) {
          if (!_this.keepMove) {
            return;
          }
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
    background-color: rgb(249, 249, 249);
    background-image: url(../../assets/img/bg_1.png);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    /* line-height: 100px; */
    margin: auto;
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
    position: relative;
    z-index: 1;
    width: 100% !important;
    height: 100% !important;
  }

  .box_dragger .ctl_text {
    position: absolute;
    top: 0;
  }

  .scale {
    width: 20px;
    height: 15px;
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

  .ctl:hover .h_display {
    display: inline-block;
  }

  .active .ctl .coner,
  .active .ctl .bot {
    display: inline-block;
  }

  .ctl .coner,
  .ctl .bot {
    display: none;
  }

  .ctl-text {
    background: transparent;
    width: auto;
    height: auto;
    border: 1px solid transparent;
  }

  .ctl-text:hover {
    border: 1px solid #e2dfdf;
    border-radius: 5px;
    background: transparent;
  }

  .ctl-text .spec {
    background: transparent;
    border: 0px;
    font-size: 16px;
    width: 100%;
  }

  .coner {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    display: block;
    border: 1px solid #04569c;
    z-index: 1;
  }

  .bot {
    background: #04569c;
    position: absolute;
  }

  .coner.coner_a {
    top: -5px;
    left: -5px;
  }

  .bot.bot_a {
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
  }

  .coner.coner_b {
    top: -5px;
    right: -5px;
  }

  .bot.bot_b {
    width: 1px;
    height: 100%;
    right: 0;
    top: 0;
  }

  .coner.coner_c {
    bottom: -5px;
    right: -5px;
  }

  .bot.bot_c {
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
  }

  .coner.coner_d {
    bottom: -5px;
    left: -5px;
  }

  .bot.bot_d {
    width: 1px;
    height: 100%;
    left: 0;
    top: 0;
  }

  .coner.coner_a_1 {
    left: 50%;
    top: -25px;
    transform: translate(-50%, -50%);
    cursor: url(../../assets/img/mouserotate.png), default;
    background: #185b8a;
  }

  .bot.bot_a_1 {
    left: 50%;
    top: -13px;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 25px;
    background: #185b8a;
  }

  .tap-pane {
    background: #fff;
    width: 800px;
    height: 700px;
  }

  .tap-box{
    margin: 0px 15px;
  }
</style>