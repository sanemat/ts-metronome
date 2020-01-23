const { resolve } = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ["awesome-typescript-loader?module=es6"],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: !isDevelopment }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist")
  }
};

module.exports = config;
