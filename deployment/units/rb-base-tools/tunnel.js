"use strict"; //const { spawn } = require('child_process')
const http = require('http');
const process = require('process');

const localtunnel = require('localtunnel');
const httpProxy = require('http-proxy');

//

const tunnels = require('../_configuration/rb-base-tools/tunnels.json');

//

function createDevHostProxy(headers, proxyPort, serverPort) {
  var proxy = httpProxy.createProxyServer({});

  // Add headers
  proxy.on('proxyReq', function (proxyReq, req, res, options) {
    for (let headerName in headers) proxyReq.setHeader(headerName, headers[headerName]);
  });

  var server = http.createServer(function (req, res) {
    // Forward to server port
    proxy.web(req, res, {
      target: 'http://127.0.0.1:' + serverPort });

  });

  // Listen at proxy port
  console.log(proxyPort + ' -> ' + serverPort + ' + ' + JSON.stringify(headers));
  server.listen(proxyPort);
}

/*
  function establishTunnel(domainName, proxyPort, applicationPort) {
    console.log(
      'Establishing ' +
        domainName +
        '.localtunnel.me - > :' +
        proxyPort +
        ' (bound to :' +
        applicationPort +
        ')',
    )
  
    const child = spawn('./node_modules/.bin/lt', [
      '--port',
      '' + proxyPort,
      '--subdomain',
      domainName,
    ])
  
    child.stdout.on('data', (data) => {
      console.log('' + data)
    })
  
    child.stderr.on('data', (data) => {
      console.error('' + data)
    })
  
    child.on('exit', (code) => {
      if (code !== 0) {
        console.error(
          'lighttunnel for port ' +
            proxyPort +
            ' exited with ' +
            code +
            ', restarting ...',
        )
        setTimeout(() => establishTunnel(domainName, proxyPort))
      }
    })
  }
  */

async function establishTunnel_async(subdomain, proxyPort, applicationPort) {
  console.log(
  'Establishing ' +
  subdomain +
  '.localtunnel.me - > :' +
  proxyPort +
  ' (bound to :' +
  applicationPort +
  ')');


  console.log({ port: proxyPort, subdomain });

  const tunnel = await localtunnel({ port: proxyPort, subdomain });
  tunnel.on('close', () => {
    console.log('Closing tunnel for ' + subdomain + ' on proxy port ' + proxyPort);
  });
  tunnel.on('request', info => {
    console.log(info);
  });
  tunnel.on('error', err => {
    console.error(err);
  });
}

async function startProxiesAndTunnels(tunnels) {
  const { applications } = tunnels;

  for (let application of applications) {
    const { applicationPort } = application.local;

    for (let instance of application.instance) {
      createDevHostProxy(instance.headers, instance.port, applicationPort);

      if (instance.subdomain) {
        await establishTunnel_async(instance.subdomain, instance.port, applicationPort);
      }
    }
  }
}

process.on('uncaughtException', function (err) {
  console.log('uncaughtException:');
  console.log(err);
})
//
// Start the proxies
//
;(async () => {
  await startProxiesAndTunnels(tunnels);
})();
//# sourceMappingURL=tunnel.js.map