import Vue from 'vue'
import { Message } from 'element-ui'
import config from './config'
import axios from 'axios'
import { rejects } from 'assert'
import { resolve } from 'path'

const WorkSheet_URL = config.dev.url
const Normal_URL = config.dev.url

// site 请求地址
// params 请求参数
// method 请求方式
// timeout 超时限制
// if_Hide_Tip 是否限制错误提示
// usr 请求域名
export default async function (site, params, method = 'post', timeout = 1000 * 30, if_Hide_Tip = false, usr = '', headers) {
  let URL = Normal_URL
  if (usr) {
    URL = config.getURL()[usr]
  }
  if (!site) {
    Message.error('请求地址为空！')
    return '请求地址为空！'
  }
  if (method) { method = method.toLocaleLowerCase() } else method = 'post'
  let data = {}; let post = {
    'method': method,
    'url': URL + site,
    'timeout': timeout
  }

  if (headers) {
    post.headers = headers
  }

  if (JSON.stringify(params) === '{}') {
    params = null
  }

  if (params) { data = Object.assign(params, data) }

  post['data'] = data
  if (params && (method == 'get' || method == 'delete')) {
    post['url'] = post['url'] + Vue.prototype.$concatPost(data)
  }
  post['url'] = encodeURI(post['url'])
  var r = await axios.request(post)

  if (if_Hide_Tip) { // 是否弹出错误提示，组织架构导入用到了
    return r.data
  } else
  if (r.data.code == 0) { // -1 商城相关  200、errcode PHP相关
    return r.data
  } else {
    Message.error(r.data.msg || post['url'] + '请求出错')
    rejects('r.data.msg')
  }
}
