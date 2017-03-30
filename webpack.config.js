module.exports = {
    entry: "./renderer.js",
    target: 'electron',
    output: {
        path: __dirname,
        filename: "static/bundle.js"
    },
    resolve: {
        extensions: ['.js', '.marko']
    },
    module: {
        loaders: [
            {
                test: /\.marko$/,
                loader: 'marko-loader',

            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader',
              ],
            },
            {
              test: /\.scss$/,
              use: [
                'style-loader',
                'css-loader?sourceMap',
                'sass-loader?sourceMap',
              ],
            }
        ]
    },
}
