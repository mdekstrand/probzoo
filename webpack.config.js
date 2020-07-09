const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "build/site");

module.exports = {
  mode: "production",
  entry: {
    index: "./js/index.ts"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    contentBase: dist,
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
  ]
};
