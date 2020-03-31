const webpack = require('webpack');
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
        test: /\.ts(x?)$/,
        use:[
          {
            loader: 'awesome-typescript-loader',
            options:{

            }
          }
        ]
      },{
        test: /\.less$/,
        exclude: [/node_modules/],
        include: [path.join(__dirname, './../', 'src')],
        // use: [
        //   require.resolve('style-loader'),
        //   {
        //     loader: require.resolve('css-loader'),
        //     options:{
        //       modules: true,
        //       // localIdentName:'[name]-[hash:8]'
        //     }
        //   },
        //   {
        //     loader: require.resolve('less-loader'),
        //     options: {
        //       modules: true,
        //       // loaclIdentName:'[name]-[hash:8]'
        //     }
        //   },
        // ],
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'less'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'build/tpl/index.html'
    })
  ]
}