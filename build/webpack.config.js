const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './../', 'src/index.tsx')
  },
  output: {
    path: path.join(__dirname, './../', 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true,
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        use:[
          {
            loader: 'awesome-typescript-loader',
            options:{

            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   include: [/node_modules|antd\.css/],
      //   use: [
      //     "style-loader",
      //     "css-loader"
      //   ]
      // },
      // 暂时先这样 css不支持模块化
      {
        test: /\.css$/,
        // exclude: [/node_modules|antd\.css/],
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          "style-loader",
          "css-loader?modules",
          "less-loader"
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}