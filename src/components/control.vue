<template>
    <div class="box_control" ref="box_control">
        <h3>基础元素</h3>
        <com-pannel @addItem="addItem"></com-pannel>
        <h3>工作区</h3>
        <ul ref="pannel">
            <li v-for="(item,i) in dragData" draggable="true" ref="ctl">
                <div class="ctl">
                    {{item.title}}
                </div>
            </li>
        </ul>

        <history-pannel></history-pannel>

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
                dragData: [
                    { title: "1111111", id: 1, delete: 0 },
                    { title: "2222222", id: 2, delete: 0 },
                    { title: "3333333", id: 3, delete: 0 },
                    { title: "受到粉丝的饭", id: 3, delete: 0 },
                    { title: "3333对对方的333", id: 3, delete: 0 }
                ],
                checkList: []
            }
        },
        mounted() {
            this.initDarg();
            // var aa = document.getElementById('test')
            // var bb = document.getElementById('test1')
            // bb.insertBefore("<li>sdfsd</li>",aa)
        },
        methods: {
            ...mapMutations(["addStack"]),
            addItem(data) {
                switch (data.type) {
                    case 1: this.addText(data); break;
                }
                this.$emit('review', data);
            },
            addText(data) {
                this.dragData.push({
                    title: data.text,
                    delete: 0,
                    id: this.dragData.length
                })
                this.addStack(data);
                console.log(this.$store.state)
            },
            initDarg() {
                var source = this.$refs.ctl,
                    dragElement = null;

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