const path = require('path')

const srcDir = path.resolve(__dirname, 'src', 'client')
const distDir = path.resolve(__dirname, 'static')

const common = {
  entry: path.join(srcDir, 'index.js'),
  // module: {
  //   rules: [
  //     {
  //       test: /\.worker\.js$/,
  //       exclude: /node_modules/,
  //       loader: 'worker-loader',
  //       options: {
  //         esModule: false,
  //       },
  //     },
  //   ],
  // },
  output: {
    path: distDir,
    filename: 'index.js'
  }
}

const development = {
  mode: 'development',
  devtool: 'source-map'
}

const production = {
  mode: 'production',
}

module.exports = {
  ...common,
  ...(process.env.NODE_ENV == 'production' && production || development)
}
