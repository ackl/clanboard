module.exports = {
    entry: './src/main.js',
    output: {
        path: require('path').join(__dirname, 'public'),
        publicPath: '/public/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    }
}
