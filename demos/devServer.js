const webpack = require('webpack')
const Server = require('webpack-dev-server')
const os = require('os')

function getIPv4() {
  const networkInterfaces = os.networkInterfaces()
  let IPv4 = ''
  for (let net in networkInterfaces) {
    networkInterfaces[net].some(item => {
      if (net === 'en0' && item.family === 'IPv4') {
        IPv4 = item.address
        return true
      }
    })
  }

  return IPv4
}

const ipv4 = getIPv4()

const host = `http://${ipv4}:8080`

const config = {
  context: __dirname,
  mode: 'development',
  entry: {
    toast: [
      './toast/app.js'
    ]
  },

  output: {
    filename: 'js/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}

const entry = config.entry

Object.keys(entry).forEach(key => {
  let entryPort = entry[key]
  entryPort.unshift(`webpack-dev-server/client?${host}`)
})

console.log(config.entry)

const compiler = webpack(config)

const server = new Server(compiler, {
  stats: {
    colors: true,
    modules: false
  },
  contentBase: __dirname
})

server.listen(8080, '', () => {
  console.log(`server ===> ${host}`)
})
