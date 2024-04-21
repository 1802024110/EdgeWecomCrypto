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
        libraryTarget: 'module'
    },
    experiments: {
        outputModule: true, // 实验性功能：启用输出模块
    }
};