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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      }
    }
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