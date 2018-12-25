<template>
    <div class="box_control" ref="box_control">
        <h3>基础元素</h3>
        <com-pannel @addItem="addItem"></com-pannel>
        <h3>工作区</h3>
        <ul ref="pannel">
            <li v-for="(item,i) in Stacks" draggable="true" ref="ctl" v-if="!item.hide">
                <div class="ctl">
                    {{item.data.title}}
                </div>
            </li>
        </ul>

        <history-pannel ref="Stack" :data="Stacks"></history-pannel>

    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import comPannel from './panel'
    import historyPannel from './history'
    export default {
        components: {
            comPannel,
            historyPannel
        },
        data() {
            return {
                dragData: [],
                checkList: [],
                Stacks:[],
                title:'新建'
            }
        },
        watch:{
            '$store.state.Stacks'(){
                console.log('重新排序')
            this.initDarg();
            }
        },
        mounted() {
            this.initDarg();
            setTimeout(()=>{
                    this.Stacks = this.$store.state.Stacks
                })
        },
        methods: {
            ...mapMutations(["addStack"]),
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
    .box_control {
        width: 280px;
        height: 100%;
    }

    .box_control ul {
        padding: 0px;
        margin: 0px;
    }

    .box_control li {
        background: #fff;
        border: 1px solid #ddd;
        padding: 8px 6px;
        font-size: 14px;
        margin-bottom: 4px;
        border-radius: 3px;
        color: #666;
    }
</style>