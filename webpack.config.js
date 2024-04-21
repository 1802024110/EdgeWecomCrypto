const path = require('path');

module.exports = {
    entry: './index.ts', // 你的主入口文件
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.min.js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist'), // 输出目录
        library: 'WecomCrypto', // 全局变量名
        libraryTarget: 'umd', // 适用于各种模块系统的目标
        globalObject: 'this' // 对于不同环境下的全局对象
    }
};