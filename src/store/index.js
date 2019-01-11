import Vue from 'Vue'
import Vuex from 'vuex'
import Modules from '@/json/module'
import md5 from 'js-md5'
import api_config from './config'

Vue.use(Vuex)
const state = {
    // Stacks:[],
    nowTab:0,
    Tabs:[{
        w:400,
        h:400,
        title:"新建",
        content:"",
        bgColor:"",
        Stacks:[]
    }]
}

const getRandom = function(){
    let r = Math.floor(Math.random() * 999999) + new Date().getTime();
    let t = r.toString();
    return md5(t);
}

const mutations = {
    addTabs:(state,data)=>{
        let t = getRandom();
        try {
            const opts = {
                id:t,
                w:data.w,
                h:data.h,
                title:data.title,
                content:data.content,
                bgColor:data.bgColor,
                Stacks:[]
            }
            if(!state.Tabs){
                state.Tabs = [];
            }
            state.Tabs.unshift(opts)
        }catch(e){
            console.log("Tabs is wrong!")
        }

    },
    addStack:(state,data)=>{
        // let r = Math.floor(Math.random() * 999999) + new Date().getTime();
        let t = getRandom();
        let no = state.Tabs[state.nowTab];
        try {
            const opts = {
                id:t,
                type:0,
                desc:"新增["+data.title+"]",
                time:t,
                delete:false,
                data:data,
                hide:false
            }
            if(!no.Stacks){
                no.Stacks = [];
            }
            no.Stacks.unshift(opts)
            // Vue.$set(state.Tabs[state.nowTab],'Stacks',no.Stacks);
        }catch(e){
            console.log("Stack is wrong!")
        }
    },
    //重置工作区
    hideStack:(state,hideArr)=>{
        let arr =  state.Tabs[state.nowTab].Stacks;
        for(var i =0;i<arr.length;i++){
            if(hideArr.indexOf(arr[i].id)>=0){
                arr[i].hide = true;
            }else{
                arr[i].hide = false;
            }
        }
        // Vue.$set(state.Tabs[state.nowTab],'Stacks',arr);
        state.Tabs[state.nowTab].Stacks = arr;
    },
    setNowTab:(state,data)=>{
        try{
        state.nowTab = parseInt(data);
        }catch(e){
            console.log("获取当前tab失败！")
        }
    },
    delStack:(state,data)=>{

    },
    delTab:(state)=>{
        state.Tabs.splice(state.nowTab,1);
        state.nowTab = state.nowTab - 1;
    },
    clearStack:(state,data)=>{
        state.Tabs[state.nowTab].Stacks = [];
    },
    clearTabs:(state,data)=>{
        state.Tabs = [];
    }
}

// 将vuex注册到每一个组件
export default new Vuex.Store({
    state,
    mutations,
    getters: {
      // 获取操作
      Stacks: state => {
        console.log('-----------')                              
        console.log(state)  
        console.log(state.Tabs[state.nowTab].Stacks)  
        return state.Tabs[state.nowTab].Stacks},
      Tabs:state => state.Tabs,
      nowTab:state => state.nowTab,
      apiConfig:state => api_config.dev
    }
  })