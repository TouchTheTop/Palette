<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,i) in tabs" v-if="item.desc" :label="item.desc" :key="i"></el-tab-pane>
        </el-tabs>
        <el-row>
            <el-col :span="24">
                <!-- <div class="grid-content bg-purple-dark">
                    <img v-for="(item,i) in libs" :src="item.target" alt="item.desc" />
                </div> -->
                <waterfall :line-gap="150" :watch="libs">
                        <!-- each component is wrapped by a waterfall slot -->
                        <waterfall-slot
                          v-for="(item, index) in libs"
                          :order="index"
                          :height="300"
                          :width="150"
                          :key="index"
                        >
                        <img :src="item.target" alt="item.desc" />
                        </waterfall-slot>
                      </waterfall>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Waterfall from 'vue-waterfall/lib/waterfall'
    import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
    export default {
        data() {
            return {
                activeName: '0',
                tabs: [],
                libs: [],
                page: 0,
                pageSize: 10
            }
        },
        components: {
            Waterfall,
            WaterfallSlot
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
            async getCat() {
                let res = await this.$ASK(this.$API.Posters.getCat, null, 'get')
                this.tabs = res.data
                this.getListByCat(this.tabs[0].cid)
            },
            async handleClick(t) {
                this.getListByCat(this.tabs[t.index].cid)
            },
            async getListByCat(cid) {
                let res = await this.$ASK(this.$API.Posters.getListByCat, {
                    cid: cid,
                    page: this.page,
                    pageSize: this.pageSize
                }, 'get')
                this.libs = res.data
            }
        },
    }
</script>

<style scope>
</style>