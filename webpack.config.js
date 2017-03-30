module.exports = {
    entry: "./renderer.js",
    target: 'electron-renderer',
    output: {
        path: __dirname,
        filename: "static/bundle.js"
    },
    resolve: {
        extensions: ['.js'],
        aliasFields: ["browser"]
    },
    module: {
        loaders: [
            {
                test: /\.marko/,
                loader: 'marko-loader',
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader',
              ],
            },
        ]
    },
}
