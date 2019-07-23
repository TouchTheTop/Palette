<template>
    <div class="marsk_Diaolog" v-if="show">
        <div class="content">
            <div class="header">
                <el-tabs v-model="activeName" class="tabs_f" @tab-click="handleClick">
                    <el-tab-pane v-for="(item,i) in tabs" v-if="item.desc" :label="item.desc" :key="i"></el-tab-pane>
                </el-tabs>
                <div class="r_h">
                    <icon name="collect" width="25px" height="25px"></icon>
                    <a href="#" @click="closeIt">
                        <icon name="close" width="25px" height="25px"></icon>
                    </a>
                </div>
            </div>
            <vueWaterfallEasy style="width: 100%;height: 85%;" :imgsArr="libs" @scrollReachBottom="fetchImgsData">
                <template slot-scope="props">
                    <div class="player_info">
                        <a href="javascript:void(0)" @click="useIt(props.value)">
                            <icon name="paste" width="25px" height="25px"></icon>
                        </a>
                        <a href="javascript:void(0)" @click="closeIt">
                            <icon name="collect_i" width="25px" height="25px"></icon>
                        </a>
                        <a href="javascript:void(0)" download="props.value.desc" @click="downloadIt(props.value.src)">
                            <icon name="download" width="25px" height="25px"></icon>
                        </a>
                    </div>
                </template>
            </vueWaterfallEasy>
        </div>

        <form :action="url + '/album/download'" method="get" enctype="application/json">
            <button type="submit">提交</button>
        </form>
    </div>
</template>

<script>
    import vueWaterfallEasy from 'vue-waterfall-easy'
    import Icon from 'vue-svg-icon/Icon.vue'
    import COS from '@/sdk/cos'
    export default {
        data() {
            return {
                url: 'http://localhost:3030/',
                activeName: '0',
                tabs: [],
                libs: [],
                nowTab: null,
                allCount: 0,
                page: 0,
                pageSize: 20,
                show: false
            }
        },
        components: {
            vueWaterfallEasy,
            Icon
        },
        mounted() {
            this.getCat();
        },
        filters: {
            widthString(val) {
                return val.toString
            }
        },
        methods: {
            showIt() {
                this.show = true;
            },
            closeIt() {
                this.show = false;
            },
            reset() {
                this.page = 0;
                this.allCount = 0;
                this.libs = [];
            },
            downloadIt(url) {
                COS.getObject({
                    Bucket: 'beewal-1253736812', /* 必须 */
                    Region: 'ap-guangzhou',    /* 必须 */
                    Key: url,              /* 必须 */
                }, function (err, data) {
                    console.log(err || data.Body);
                });
            },
            useIt(data){
                this.$emit("addItem", {
                            type: 0,
                            text: data.src
                })
                this.show = false;
            },
            async getCat() {
                let res = await this.$ASK(this.$API.Posters.getCat, null, 'get')
                this.tabs = res.data
                this.nowTab = this.tabs[0].cid;
                this.getListByCat(1)
            },
            async handleClick(t) {
                this.nowTab = this.tabs[t.index].cid;
                this.getListByCat(1)
            },
            async getListByCat(isClear) {
                if (isClear)
                    this.reset();
                let res = await this.$ASK(this.$API.Posters.getListByCat, {
                    cid: this.nowTab,
                    page: this.page,
                    pageSize: this.pageSize
                }, 'get')
                for (var i = 0; i < res.data.length; i++) {
                    this.libs.push({
                        id: i,
                        src: res.data[i].target,
                        link: res.data[i].target,
                        info: res.data[i].desc
                    })
                }
                this.allCount = res.count

            },
            async fetchImgsData() {
                this.page++;
                if (this.libs.length < this.allCount)
                    await this.getListByCat();
                else
                    return false;
            }
        },
    }
</script>

<style scoped lang='scss'>
    .content {
        padding: 15px;
        height: 100%;
        padding-bottom: 0;

        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .r_h {
                svg {
                    margin-left: 15px;
                    color: #fff;
                }
            }
        }
    }
</style>