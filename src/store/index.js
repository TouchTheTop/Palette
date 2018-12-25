import Vue from 'Vue'
import Vuex from 'vuex'
import Modules from '@/json/module'
import md5 from 'js-md5'

Vue.use(Vuex)
const state = {
    Stacks:[]
}

const mutations = {
    addStack:(state,data)=>{
        let r = Math.floor(Math.random() * 999999) + new Date().getTime();
        let t = r.toString();
        
        try {
            const opts = {
                id:md5(t),
                type:0,
                desc:"新增["+Modules[data.type].name+"]",
                time:t,
                delete:false,
                data:data,
                hide:false
            }
            if(!state.Stacks){
                state.Stacks = [];
            }
            state.Stacks.unshift(opts)
        }catch(e){
            console.log("something is wrong!")
        }
    },
    //重置工作区
    hideStack:(state,hideArr)=>{
        let arr = state.Stacks;
        for(var i =0;i<arr.length;i++){
            if(hideArr.indexOf(arr[i].id)>=0){
                arr[i].hide = true;
            }else{
                arr[i].hide = false;
            }
        }
        state.Stacks = arr;
    },
    delStack:(state,data)=>{

    },
    clearStack:(state,data)=>{
        state.Stacks = [];
    }
}

// 将vuex注册到每一个组件
export default new Vuex.Store({
    state,
    mutations,
    getters: {
      // 获取操作
      Stacks: state => state.Stacks,
    }
  })