var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
	configureWebpack:config=>{
		if(progress.env.NODE_ENV === 'production'){
			return{
				plugins: [
					new CompressionPlugin({
						filename: '[path].gz[query]',
						algorithm: 'gzip',
						test: new RegExp(
							'\\.(' +
							config.build.productionGzipExtensions.join('|') +
							')$'
						),
						threshold: 10240,
						minRatio: 0.8
					})
				]
			}
		}
  },
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
