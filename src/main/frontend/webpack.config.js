var path = require('path');

const BUID_DIR = path.resolve(__dirname + "../../../../target/classes/static");

module.exports = {
    mode: 'production',
    entry: {
        familyBudget: path.resolve(__dirname, './app/family-budget-site/index.js')
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: path.join(__dirname, "."),
                exclude: path.resolve(__dirname, "node_modules"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                }

            }
        ]
    },
    output: {
        filename: 'family-budget/[name]_bundle.js',
        path: BUID_DIR
    }
};