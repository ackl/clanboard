const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: require('path').join(__dirname, 'public'),
        publicPath: (process.env.DEV ? 'http://localhost:8080/public/' : '/'),
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            inject: 'body'
        })
    ],
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    sassLoader: {
        data: "$dev: " + process.env.DEV + ";"
    }
}
