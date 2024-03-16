const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  nodeModules: path.resolve(__dirname, '../node_modules'),
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': resolve('src/renderer')
    },
    devServer: {
      port: 'auto',
      proxy: {
        '/calculator': 'http://localhost:8081'
      }
    }
  }
}
