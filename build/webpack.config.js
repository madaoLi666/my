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
            loader: 'babel-loader?preset[]=react,presets[]=es2015',
            options: {
              babelrc: true,
              cacheDirectory: true,
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader',
            options:{
              // presets: [
              //   '@babel/preset-react',
              // ]
            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   include: [/[node_modules|antd]\.css/],
      //   use: [
      //     "style-loader",
      //     "css-loader"
      //   ]
      // },
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, "../src")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}