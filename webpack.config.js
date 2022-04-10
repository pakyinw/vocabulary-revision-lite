const path = require('path');

module.exports = {
    entry: './src/background.ts',
    output: {
        filename: 'background.js',
        path: path.resolve(__dirname, 'build')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: '/\.tsx?\$/',
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    }
}