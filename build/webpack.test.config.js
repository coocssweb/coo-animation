/**
 * 环境测试配置文件
 *
 */
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');
const mode = 'test';

module.exports = merge(webpackBase(mode), {
    devtool: false,
    mode
});
