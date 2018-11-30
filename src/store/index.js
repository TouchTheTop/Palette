import Vue from 'Vue'
import Vuex from 'vuex'
import Modules from '../json/module'
import md5 from 'md5'

Vue.use(Vuex)
const state = {
    Stacks:null
}

const mutations = {
    addStack:(state,data)=>{
        state.Stacks = 1;
        // var r = Math.floor(Math.random() * 999999);
        // var t = new Date().getTime();
        // try {
        //     const opts = {
        //         id:md5(r+t),
        //         type:0,
        //         desc:"新增["+Modules[data.type].name+"]",
        //         time:t,
        //         delete:false,
        //         data:data
        //     }
        //     if(!state.Stack){
        //         state.Stack = [];
        //     }
        //     Vue.set(state.Stack, state.Stack.length, opts)
        // }catch(e){
        //     console.log("something is wrong!")
        // }
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
      Stacks: state => {
          return state.Stacks;
      },
    }
  })