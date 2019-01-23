module.exports = {
    production: {
        env: 'production',                                                      // 环境变量
        api: 'http://api.test.com',                                             // api地址
        publicPath: 'http://js.test.com',                                       // 构建后静态资源 cdn地址
        imagePath: 'http://image.test.com',                                     // 构建后图片 cdn地址
    },
    test: {
        env: 'test',
        api: 'http://testapi.test.com',
        publicPath: 'http://testjs.test.com',
        imagePath: 'http://testimage.test.com'
    },
    development: {
        env: 'development',
        api: 'http://api.test.com',
        publicPath: '',
        imagePath: ''
    }
};
