module.exports = {
    entry: "./app/app.js",
    output: {
        path: __dirname,
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};