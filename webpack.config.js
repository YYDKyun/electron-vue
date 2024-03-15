const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts',],
        alias: {
            '@': resolve('src/renderer/src')
        },
        devServer: {
            port: 'auto',
            proxy: {
                '/calculator': 'http://localhost:8081',
            },
        },
    }
}