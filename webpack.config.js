const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const webpackHtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    polyfill:'@babel/polyfill',
    main:[path.resolve(__dirname,'./src/index.js')]
  },
  output:{
    path:path.resolve(__dirname,'./dist'),
    filename:'js/[name].chunk.js'
  },
  resolve:{
    alias:{
      app:path.resolve(__dirname,'./src/')
    },
    extensions:['.js','.jsx']
  },
  devtool:'cheap-module-eval-source-map',
  module:{
    rules:[
      {
        test:/.(js|jsx)$/,
        exclude: '/node_modules/',
        use:[{
          loader:'babel-loader',
          loader:'babel-loader',
          options:{
            "presets":['@babel/react','@babel/env'],
            "plugins":[
              ["@babel/syntax-dynamic-import"],
              ["@babel/plugin-proposal-class-properties"],
            ]
          }
        }]
      },
      {
        test:/.(less|css)$/,
        exclude: '/node_modules/',
        // exclude: path.resolve(__dirname,'./node_modules/'),
        use:['style-loader','css-loader',{
          loader:'postcss-loader',
          options:{
            plugin:[require('autoprefixer')("last 10 versions")]
          }
        },'less-loader']
      }
    ]
  },
  plugins:[
    new webpackHtmlPlugin({
      template:path.resolve(__dirname,'./public/index.html'),
      inject:true,
      filename:'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    hot:true,
    open:true,
    historyApiFallback: true,
    contentBase:'./dist',
    progress: true,
    port:3080,
    proxy:[
      {
        context: ['/api'],
        target:'http://localhost:3000',
        pathRewrite: { '^/api': '' }, //重写url，干掉/api
        secure: false
      }
    ],
  }
}