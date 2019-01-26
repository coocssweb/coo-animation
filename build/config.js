module.exports = {
    production: {
        env: 'production',                                                      // 环境变量
        api: 'http://api.test.com',                                             // api地址
        publicPath: 'https://coocssweb.github.io/animation/',                   // 构建后静态资源 cdn地址
        imagePath: 'http://image.test.com',                                     // 构建后图片 cdn地址
        fileHash: false,                                                        // 文件hash
    },
    development: {
        env: 'development',
        api: 'http://api.test.com',
        publicPath: '',
        imagePath: ''
    }
};
