import COS from 'cos-js-sdk-v5'

var Bucket = 'test-1250000000';
var Region = 'ap-guangzhou';

// 初始化实例
var cos = new COS({
    getAuthorization: function (options, callback) {
        // 异步获取签名
        $.get('../server/sts.php', {
            bucket: options.Bucket,
            region: options.Region,
        }, function (data) {
            callback({
                 TmpSecretId: data.credentials.tmpSecretId, 
                 TmpSecretKey: data.credentials.tmpSecretKey, 
                 XCosSecurityToken: data.credentials.sessionToken, 
                 ExpiredTime: data.expiredTime,
            });
        });
    }
});