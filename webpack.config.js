const path = require('path')

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

const common = {
  entry: path.join(srcDir, 'index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        loader: 'worker-loader',
        options: {
          filename: '[name].[contenthash].worker.js',
        },
      },
    ],
  },
  output: {
    path: distDir,
    filename: 'index.js',
    publicPath: '/dist/'
  },
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
