const express = require('express'); // importing a CommonJS module
const logger = require('morgan');
const helmet = require('helmet');

const actionRouter = require('./data/routers/action-router.js')
const projectRouter = require('./data/routers/project-router.js')

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');
const securityMiddleware = helmet();

server.use(parser, logMiddleware, securityMiddleware);
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', async (req, res) => {
  res.send(`
    <h2>TEST</h2>`);
});

module.exports = server;