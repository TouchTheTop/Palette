<template>
    <div class="box_control" ref="box_control">
        <h3>基础元素</h3>
        <com-pannel @addItem="addItem"></com-pannel>
        <h3>我的收藏</h3>
        <collect-pannel @addItem="addItem"></collect-pannel>
        <h3>素材库</h3>
        <el-button @click="showIt">打开</el-button>
        <lib-pannel ref="lib" @addItem="addItem"></lib-pannel>


    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import comPannel from './panel'
    import libPannel from './unit/lib'
    import collectPannel from './unit/collect'
    export default {
        components: {
            comPannel,
            collectPannel,
            libPannel
        },
        props: {
                nowTab:{
                    type:String,
                    default:0
                }
            },
        data() {
            return {
                dragData: [],
                checkList: [],
                Stacks:this.$store.getters.Stacks,
                title:'新建'
            }
        },
        watch:{
            '$store.state.Stacks'(){
                console.log('重新排序')
            this.initDarg();
            },
            'nowTab'(){
                    this.Stacks = this.$store.getters.Stacks
                }
        },
        mounted() {
            this.initDarg();
        },
        methods: {
            ...mapMutations(["addStack"]),
            showIt(){
                this.$refs.lib.showIt();
            },
            addItem(data) {
                switch (data.type) {
                    case 0: this.addText(data); break;
                    case 1: this.addText(data); break;
                }
                // this.$emit('review', data);
            },
            addText(data) {
                this.addStack({
                    type:data.type,
                    text:data.text,
                    title: this.title+(this.Stacks.length>0?`(${this.Stacks.length})`:''),
                    delete: 0,
                    id: this.Stacks.length
                });
                console.log(this.Stacks)
                console.log(this.$store.state)
            },
            initDarg() {
                var source = this.$refs.ctl,
                    dragElement = null;
                    if(!source){
                        return ;
                    }

                for (var i = 0; i < source.length; i++) {
                    source[i].addEventListener('dragstart', function (ev) {
                        dragElement = this;
                    }, false);

                    source[i].addEventListener('dragenter', function (ev) {
                        if (dragElement != this) {
                            this.parentNode.insertBefore(dragElement, this);
                        }
                    }, false)

                    source[i].addEventListener('dragleave', function (ev) {
                        if (dragElement != this) {
                            if (this == this.parentNode.lastElementChild || this == this.parentNode.lastChild) {
                                this.parentNode.appendChild(dragElement);
                            }
                        }
                    }, false)
                };

                document.ondragover = function (e) { e.preventDefault(); }
                document.ondrop = function (e) { e.preventDefault(); }
            }
        }
    }
</script>

<style scoped>
.box_control{
    min-width: 320px;
}
</style>