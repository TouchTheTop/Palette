

import $axios from 'axios'
import COS from 'cos-js-sdk-v5'

var cos = new COS({
    getAuthorization: function (options, callback) {
        console.log("QINGSJDFSLD")
        // 异步获取临时密钥
        $axios.get('http://localhost:3030/sign?bucket='+options.Bucket+'&region='+options.Region)
        .then((data)=> {
            callback({
                 TmpSecretId: data.credentials.tmpSecretId, 
                 TmpSecretKey: data.credentials.tmpSecretKey, 
                 XCosSecurityToken: data.credentials.sessionToken, 
                 ExpiredTime: data.expiredTime
            });
        });
    }
});

export default {
    cos
}