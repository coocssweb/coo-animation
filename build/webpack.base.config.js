const webpack = require('webpack');
const glob = require('glob');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const {resolve} = require('./utils');
const _config = require('./config');
const _files = require('./files');

module.exports = function (mode) {
    const configMode = _config[mode];
    const entry = {};
    const plugins = [
        // 注入环境变量，在代码内可以引用
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': configMode.env,
            'process.env.API': configMode.api
        }),
        // css tree-shaking
        new PurifyCSSPlugin({
            paths: glob.sync(resolve('../*.html')),
        })
    ];
    for (let index = 0; index < _files.length; index++) {
        let file = _files[index];
        entry[file.name] = file.path;
        // html 模板配置
        plugins.push(
            new htmlWebpackPlugin({
                filename: file.filename,
                template: file.template,
                chunks: [file.name],
                hash: false,
                inject: 'body',
                xhtml: false,
                minify: {
                    removeComments: true,
                }
            })
        );
    }

    let webpackConfig = {
        cache: true,
        entry: entry,
        output: {
            path: resolve('../dist'),
            publicPath: configMode.publicPath,
            filename: mode === 'development' ? '[name].js' : '[name].[chunkhash].js',
            chunkFilename: mode === 'development' ?  '[name].js' : '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: resolve('../src'),
                    loader: 'babel-loader'
                },
                // 代码格式检查
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    include: resolve('../src'),
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                },
                {
                    test: /\.scss$/,
                    include: resolve('../scss'),
                    use: [
                        mode === 'development' ? 'style-loader' : miniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: `url-loader?limit=1&name=${configMode.publicPath}images/${configMode.env === 'development' ? '[name]' : '[name].[hash:8]'}.[ext]`
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: `file-loader?name=${configMode.publicPath}fonts/${configMode.env === 'development' ? '[name]' : '[name].[hash:8]'}.[ext]`
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },
        plugins: plugins,
        optimization: {

        },
        resolve: {
            // 依赖
            alias: {
                scss: resolve('../scss')
            },
            // 文件后缀自动补全
            extensions: ['.js', '.jsx'],
        },
        // 第三方依赖，可以写在这里，不打包
        externals: {

        }
    };


    if (mode === 'development') {
        // 开发环境
        // 开启热更新

        // 热更新
        webpackConfig.plugins.push(
            new webpack.NamedModulesPlugin())
        ;
        webpackConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    } else {
        // 生产环境、测试环境
        // 采用增加更新的形式，出于更好的利用CDN缓存，采用的hash格式说明如下：
        // css: 采用contenthash；内容更新才会更新hash，这样只有样式内容改变了，才会改变对应的hash
        // js：采用chunkhash；这样每次修改代码只会更新manifest(映射文件)，对应的更新文件输出的包

        // 清空构建目录
        webpackConfig.plugins.push(
            new cleanWebpackPlugin(['../dist'])
        );

        // 抽离css，命名采用contenthash
        webpackConfig.plugins.push(
            new miniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css'
            })
        );

        // 公共代码
        webpackConfig.optimization = {
            splitChunks: {
                chunks: 'initial',
                minSize: 0,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    common: {
                        test: /[\\/]src\/common[\\/]/,
                        chunks: 'all',
                        name: 'common',
                        minChunks: 1,
                        priority: 10
                    }
                }
            },
            runtimeChunk: {
                name: 'manifest',
            }
        };
    }

    return webpackConfig;
};
