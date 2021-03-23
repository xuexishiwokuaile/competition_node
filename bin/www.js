#!/usr/bin/env node

***REMOVED****
 * Module dependencies.
***REMOVED***

import app from '../app.js';
import debugLib from "debug";
import { createServer ***REMOVED*** from 'http';

var debug = debugLib('competition:server');

***REMOVED****
 * Get port from environment and store in Express.
***REMOVED***

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

***REMOVED****
 * Create HTTP server.
***REMOVED***

var server = createServer(app);

***REMOVED****
 * Listen on provided port, on all network interfaces.
***REMOVED***

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

***REMOVED****
 * Normalize a port into a number, string, or false.
***REMOVED***

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  ***REMOVED***

  if (port >= 0) {
    // port number
    return port;
  ***REMOVED***

  return false;
***REMOVED***

***REMOVED****
 * Event listener for HTTP server "error" event.
***REMOVED***

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  ***REMOVED***

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  ***REMOVED***
***REMOVED***

***REMOVED****
 * Event listener for HTTP server "listening" event.
***REMOVED***

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
***REMOVED***
