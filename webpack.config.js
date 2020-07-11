const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "build/site");

module.exports = {
  mode: "production",
  entry: {
    index: "./js/index.js"
  },
  output: {
    path: dist,
    publicPath: '/',
    filename: "js/[name].js"
  },
  module: {
    rules: [
    ]
  },
  devServer: {
    contentBase: dist,
    staticOptions: {
      extensions: ['html']
    }
  },
  devtool: 'source-map',
  plugins: [
    new WasmPackPlugin({
      crateDirectory: __dirname,
      outName: 'probzoo'
    }),
  ]
};
