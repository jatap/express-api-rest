import http from 'http';
import debugLib from 'debug';
import app from './app';
import config from './config';

const debug = debugLib('XXX:server');

// Get port from environment and store in Express.
const { port } = config;
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      /* eslint-disable no-process-exit */
      process.exit(1);
      /* eslint-disable no-unreachable */
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      /* eslint-disable no-process-exit */
      process.exit(1);
      /* eslint-disable no-unreachable */
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
