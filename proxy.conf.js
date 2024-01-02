//Chamada de roteamento do Spring com o Angular
// Faz a diferenciação que é uma API
//Package.json está configurado o arquivo proxy.conf.js

const PROXY_CONFIG = [
  {
  context: ['/api'],
  target: 'http://localhost:8080/',
  secure: false,
  logLevel: 'debug'
  }
]
module.exports = PROXY_CONFIG;
