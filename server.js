import express from 'express';

const server = express();

server.use('/static', express.static('./static'));

server.listen(5080);