/**
 * 生产环境webpack配置文件
 *
 */
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');
const mode = 'production';

module.exports = merge(webpackBase(mode), {
    devtool: false,
    mode
});
