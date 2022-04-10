const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry:{
        background: __dirname + '/src/background.ts',
        popup: __dirname + '/src/popup.ts',
    },    
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    plugins:[
        new CopyPlugin({
          patterns: [
            { from: path.resolve(__dirname, 'src/public/'), to: path.resolve(__dirname, 'build/') },
          ],
        }),
       ],
}