const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./frontend/src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, "frontend/src"),
        use: [{ loader: "ts-loader", options: { transpileOnly: true } }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "frontend",
          to: "",
        },
      ],
    }),
  ],
};
