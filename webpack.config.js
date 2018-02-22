/**
 * Created by 666 on 2017/5/10.
 * 公共接口引用
 */
const path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 独立输出CSS
 * */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
/**
 * JS压缩
* */
const UglifyJSWebpack = require("uglifyjs-webpack-plugin");
var config = {
    context: path.resolve(__dirname,"dev"),
    entry: path.resolve(__dirname,"dev/app.jsx"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash:5].js',
        /**
         * 最后转换为 html 引入的模块的 url 的前半部分
         * */
        // publicPath: '/WebstormProjects/test1/dist/>',
        /**
         * 非入口模块 chunk 的文件名
         * */
        // chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                },
                exclude: /(node_modules)/
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['react', 'es2015']
                    }
                },
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'style-loader!css-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: {
                    loader: "json-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: "url-loader?limit=25000"
                }
            },
            {
                test: /\.woff(2)?(\?[a-z0-9]+)?$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                }
            }, {
                test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
                use: {
                    loader: "file-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx' ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'template.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载
        new UglifyJSWebpack({
            comments: false,
            beautify: true
        }), // 压缩js
        new ExtractTextPlugin("css/[name]-[hash:5].css"), // 输出独立css文件
        new webpack.DefinePlugin({  //禁用开发构建的小型副本
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]
};

/**
*   参数输出
* */
module.exports = config;