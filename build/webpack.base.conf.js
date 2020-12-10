var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
	plugins:[
		new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
	],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'muse-components': 'muse-ui/src',
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
      
    }
  },
  module: {
    rules: [
      {
        test: /muse-ui.src.*?js$/,
        loader: 'babel-loader'
      },
			{
				test: /\.art$/,
				loader: "art-template-loader",
				options: {
						// art-template options (if necessary)
						// @see https://github.com/aui/art-template
				}
			},
     /* {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
					resolve('src'), 
					resolve('test'),
					resolve('node_modules/_swiper@5.2.0@swiper/js/swiper.esm.bundle.js'),
					resolve('node_modules/_dom7@2.1.3@dom7/dist/dom7.modular.js')
					],
				
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
