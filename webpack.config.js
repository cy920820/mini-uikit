const path = require('path')
const pkg = require('./package.json')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const banner = `
${pkg.name}
${pkg.description}\n
@version v${pkg.version}
@homepage ${pkg.homepage}
@repository ${pkg.repository.url}\n
(c)2017-${(new Date()).getFullYear()} ${pkg.author}
Released under the MIT License.
`

const config = {
  mode : 'production',
  entry: './components/index.js',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'lib.js',
    library: pkg.name,
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },

      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin()
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'lib.css'
    }),
    new webpack.BannerPlugin(banner)
  ]
}

webpack(config, (err, stats) => {
  if (err) throw err
  console.log(stats.toString({
    colors: true
  }))
})
