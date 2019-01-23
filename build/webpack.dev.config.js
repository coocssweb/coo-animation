/**
 * 开发环境webpack配置文件
 *
 */
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');
const {resolve} = require('./utils');
const mode = 'development';

module.exports = merge(webpackBase(mode), {
    devtool: 'source-map',
    mode,
    devServer: {
        contentBase: resolve('dist'),
        hot: true,
        port: 9099
    }
});
