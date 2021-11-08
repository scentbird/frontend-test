const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge').default
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const basePath = (file) => path.resolve(process.cwd(), file)
const api = 'https://api.scentbird.com'

const base = {
  entry: {
    app: basePath('src/index.tsx'),
  },
  target: 'web',
  output: {
    path: basePath('build'),
    filename: '[name].[hash:6].js',
    chunkFilename: '[id].[hash:6].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProduction ? '[hash:base64:6]' : '[local]_[hash:base64:4]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    modules: [basePath('src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'development',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Scentbird',
      template: basePath('src/index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
}

if (isProduction) {
  module.exports = merge(base, {
    mode: 'production',
    devtool: 'source-map',
  })
} 
else {
  module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/graphql': {
          target: api,
          changeOrigin: true,
          onProxyReq: (proxyReq) => {
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', api)
            }
          },
        },
      },
    },
  })
}
